import * as React from 'react';
import Datafeed from '../../api/';
import { widget } from '~/../../public/charting_library/charting_library.min';

function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export default class ChartCoin extends React.PureComponent {

	static defaultProps = {
		symbol: 'BTC',
		interval: '2',
		containerId: 'tv_chart_container',
		libraryPath: 'http://52.221.217.53:8081/charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com',
		userId: 'public_user_id',
		fullscreen: false,
		autosize: true,
		studiesOverrides: {}
	};

	constructor(props){
		super(props);
		this.state = {
			widgetOptions : {
				debug: false,
				symbol: `${this.props.symbol}`,
				datafeed: Datafeed,
				interval: this.props.interval,
				container_id: this.props.containerId,
				library_path: this.props.libraryPath,
				locale: getLanguageFromURL() || 'en',
				disabled_features: [],
				enabled_features: ['add_to_watchlist', 'header_layouttoggle', 'control_bar', 'show_logo_on_all_charts'],
				charts_storage_url: this.props.chartsStorageUrl,
				charts_storage_api_version: this.props.chartsStorageApiVersion,
				client_id: this.props.clientId,
				user_id: this.props.userId,
				fullscreen: this.props.fullscreen,
				autosize: this.props.autosize
			}
		}
	}

	componentWillReceiveProps(nextProps){
		const { symbol } = this.props;
		if( nextProps.symbol !== symbol){
			const { widgetOptions } = this.state;
			widgetOptions.symbol = `${nextProps.symbol}`;
			const tvWidget = new widget(widgetOptions);
			this.tvWidget = tvWidget;

			tvWidget.onChartReady();
		}
	}

	componentDidMount() {
		const { widgetOptions } = this.state;
		
		const tvWidget = new widget(widgetOptions);
		this.tvWidget = tvWidget;

		tvWidget.onChartReady();
	}

	render() {
		return (
			<div
				style={{ width: '100%', height: '100%'}}
				id={ this.props.containerId }
				className={ 'TVChartContainer' }
			/>
		);
	}
}
