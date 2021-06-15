import React, { Component } from "react";
import Chart from "react-apexcharts";

export default class AssignmentComponentChart extends React.Component {
  componentWillReceiveProps (props) {
    // console.log(this.props,"props")
    if(Object.keys(this.props.data).length > 0)
    {
      this.setState({
        series: [{
          name: 'Delivery orders',
          data:this.props.data.take_away
        }, {
          name: 'In-house orders',
          data: this.props.data.dining
        }, {
          name: 'Total orders',
          data: this.props.data.totalOrders,
        },
      ]
      });
 
      this.setState({
        options: {
          ...this.state.options,
          xaxis: {
            ...this.state.options.xaxis,
            categories: this.props.data.salesRecordDate
          }
        }
      })
    }
    else
    {
      this.setState({
        options: {
          ...this.state.options,
          xaxis: {
            ...this.state.options.xaxis,
            categories: [5,6,7,8,9]
          }
        }
      })
    }
  }
    constructor(props) {
      super(props);

      this.state = {
      
        series: [],
        options: {
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: [],
          },
          yaxis: {
            title: {
              // text: '$ (thousands)'
            }
          },
          fill: {
            opacity: 1
          },
          // tooltip: {
          //   y: {
          //     formatter: function (val) {
          //       return "$ " + val + " thousands"
          //     }
          //   }
          // }
        },
      
      
      };
    }

  

    render() {
      return (
        

  <div id="chart">
<Chart options={this.state.options} series={this.state.series} type="bar" height={350} />
</div>


      );
    }
  }