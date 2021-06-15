import React, { Component } from "react";
import ReactApexChart  from "react-apexcharts";
export default    class SoldArticleChart extends React.Component {
  componentWillReceiveProps (props) {

    if(Object.keys(this.props.data).length > 0){//<---- see here
     
      // console.log(props.data,"esixt") // if ( this.props.data.salesRecordAmmount != null) {
        this.setState({
          series:this.props.data.soldItemsCountArr
          
        });
   
     
      this.setState({
        options: {
          ...this.state.options,
            labels: this.props.data.soldItems
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

        series: [],
    
        options: {
          chart: {
            width: 380,
            type: 'pie',
          },
           labels: [],
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
<ReactApexChart  options={this.state.options} series={this.state.series} type="pie" width={380} />
</div>


      );
    }
  }
