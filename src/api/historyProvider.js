var rp = require('request-promise').defaults({json: true})

const api_root = 'https://min-api.cryptocompare.com'
const history = {}

export default {
	history: history,

    getBars: function(symbolInfo, resolution, from, to, first, limit) {
		var split_symbol = symbolInfo.name.split(/[:/]/)
			const url = resolution === 'D' ? '/data/histoday' : resolution >= 60 ? '/data/histohour' : '/data/histominute'
			const qs = {
					e: split_symbol[0],
					fsym: split_symbol[1],
					tsym: split_symbol[2],
					toTs:  to ? to : '',
					limit: limit ? limit : 2000, 
				}

        return rp({
                url: `${api_root}${url}`,
                qs,
            })
            .then(data => {
				if (data.Response && data.Response === 'Error') {
					return [];
				}
				if (data.Data.length) {
					var bars = data.Data.map(el => {
						return {
							time: el.time * 1000, 
							low: el.low,
							high: el.high,
							open: el.open,
							close: el.close,
							volume: el.volumefrom 
						}
					})
						if (first) {
							var lastBar = bars[bars.length - 1]
							history[symbolInfo.name] = {lastBar: lastBar}
						}
					return bars
				} else {
					return []
				}
			})
	}
}
