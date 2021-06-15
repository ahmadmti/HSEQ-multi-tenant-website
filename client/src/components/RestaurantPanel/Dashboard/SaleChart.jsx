import React, {useEffect} from "react";
import Chart from "react-apexcharts";

	export default class SaleChart extends React.Component {
        
    componentWillReceiveProps (props) {
      console.log(props,"props data");
      if(Object.keys(this.props.data).length > 0){//<---- see here
        // if ( this.props.data.salesRecordAmmount != null) {
          this.setState({
            series: [{
              name: "Amount Recieved",
              data:  this.props.data.salesRecordAmmount
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
      else{
        this.setState({
          series: [{
            name: "Amount Recieved",
            data:  [1,3,5,6]
          },
        ]
        });
        this.setState({
          options: {
            ...this.state.options,
            xaxis: {
              ...this.state.options.xaxis,
              categories: [1,3,5]
            }
          }
        })

      }
   }
    
    constructor(props) {
       
          super(props);
          // console.log(this.props,"props data");
          this.state = {

            series: [],
          
            options: {
              annotations: {
                points: [{
                  x: 'Bananas',
                  seriesIndex: 0,
                  label: {
                    borderColor: '#775DD0',
                    offsetY: 0,
                    style: {
                      color: '#fff',
                      background: '#775DD0',
                    },
                    text: 'Bananas are good',
                  }
                }]
              },
              chart: {
                height: 350,
                type: 'bar',
              },
              plotOptions: {
                bar: {
                  borderRadius: 10,
                  columnWidth: '50%',
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                width: 2
              },
              
              grid: {
                row: {
                  colors: ['#fff', '#f2f2f2']
                }
              },
              xaxis: {
                labels: {
                  rotate: -45
                },
				      // type: 'd atetime',
                categories: [],
                tickPlacement: 'on'
              },
              yaxis: {
                title: {
                  text:'',
                },
              },
              fill: {
                type: 'gradient',
                gradient: {
                  shade: 'light',
                  type: "horizontal",
                  shadeIntensity: 0.25,
                  gradientToColors: undefined,
                  inverseColors: true,
                  opacityFrom: 0.85,
                  opacityTo: 0.85,
                  stops: [50, 0, 100]
                },
              }
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

