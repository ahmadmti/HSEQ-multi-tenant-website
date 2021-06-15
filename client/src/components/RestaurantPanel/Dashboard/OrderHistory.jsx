
import React, { Component } from "react";
import ReactApexChart  from "react-apexcharts";
export default    class OrderHistory extends React.Component {
  componentWillReceiveProps (props) {

    if(Object.keys(this.props.data).length > 0){//<---- see here
     
        this.setState({
          series:this.props.data.order_history
        });
      this.setState({
        options: {
          ...this.state.options,
            labels: this.props.data.order_history_label
        }
      })

    }
    else{
      this.setState({
        series: [1,2,3]
      });
      this.setState({
        options: {
          ...this.state.options,
      
            labels: [1,3,5]
        
        }
      })

    }
 }
 constructor(props) {
    super(props);

    this.state = {
    
      series: [44, 55, 13, 43, 22],
      options: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    
    
    };
  }



  render() {
    return (
      

<div id="chart">
<ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={380} />
</div>


    );
  }
}