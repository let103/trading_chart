import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';
import './LineChart.css';

export default class LineChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      top: 0,
      left: 0,
      showTooltip: false,
      date: null,
      valueNew: null,
      valueOld: null,
    };
  }

  setPositionAndData = (payload) => {
    this.setState({
      top: payload.top,
      left: payload.left,
      date: payload.date,
      valueNew: payload.valueNew,
      valueOld: payload.valueOld,
      showTooltip: true,
    });
  };

  changeDateTimeToSecond = (dateTime) => {
    // 2015-08-25T15:35:58.000Z
    return new Date(dateTime).getTime();
  }

  render() {
    const { portfolios90Days } = this.props;
    const data = {
      labels : portfolios90Days.created_at.map( (dateTime) => {
        return this.changeDateTimeToSecond(dateTime);
      }),
      datasets: [{ 
        fill: false,
        lineTension: 0.1,  
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'white',
        data: portfolios90Days.current_invest 
      }]
    };


    const options = {
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || '';

            if (label) {
                label += ': ';
            }
            label = '$' + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
            return label;
        }

        }
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              callback: function(value) {
                return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              }
            },
          }
        ],
        xAxes: [
          {
            type: 'time',
            time: {
                unit: "hour",
                stepSize: 168,
                displayFormats: {
                    hour: 'DD-MM-YYYY'
                }
            }
          }
        ]
      },
      layout: {
        padding: 5
      },
    };
    
    const left = this.state.left + 1;
    const top = this.state.top - 1;

    return (
        <div className="chart">
          <Line data={data} options={options} ref="chart" />
          { this.state.showTooltip
              ? <div
                  style={{
                  position: 'fixed',
                  border: '1px solid rgba(0,0,0,0.2)',
                  color: 'white',
                  backgroundColor: 'rebeccapurple',
                  top,
                  left,
                  }}
                >
                  <div>{this.state.date}</div>
                  <div>New: {this.state.valueOld}</div>
                  <div>Old: {this.state.valueNew}</div>
                </div>
              : null
            }
        </div>
    );
  }
};
