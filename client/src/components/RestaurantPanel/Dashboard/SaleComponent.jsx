import React from 'react'

import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover'
import DatePickers from '../../../components/RestaurantPanel/Dashboard/DateFilter'
import { Box, MenuItem, Select, Input, InputLabel, FormControl, Divider, FormControlLabel, Checkbox, Grid, Button, TextField, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CalculateSales from './CalculateSales';
import SaleChart from './SaleChart'
const useStyles = makeStyles((theme) => ({

    // cover:{
    //     textAlign:'center',
    // }
}));

export default function SaleComponent(props) {
    const classes = useStyles();
    // console.log(props,"jhg")
    return (
        <div>
           
            <CardCover>
            
                  

                        <CalculateSales title="Total Sale" ammount={props.totalSale.total_sales?props.totalSale.total_sales :0} />
                        <CalculateSales title="Today Sales" ammount={props.data.total_price+props.data.delivery_charges} />
                      

               
                    {/* <Grid item md={8} sm={6} xs={12} >

                    
                    </Grid> */}
             
            </CardCover>
        </div>
    )
}
