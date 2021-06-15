import React,{useEffect}  from 'react'
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover'
import { Box, MenuItem, Select, Input, InputLabel, FormControl, Divider, FormControlLabel, Checkbox, Grid, Button, TextField, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CalculateSales from './CalculateSales';
// import { getAssignments } from '../../../api/api';

// const useStyles = makeStyles((theme) => ({

    // cover:{
    //     textAlign:'center',
    // }
// }));

export default function AssignmentComponent(props) {
    // const classes = useStyles();
   
//  console.log(props,"prop")
    return (
        <div>
            <CardCover>
                <Grid container spacing={3} >
                    <Grid item md={12} sm={12} xs={12} >

                        <CalculateSales title="Orders today" ammount={props.data.today_orders} />
                        <CalculateSales title="In-house orders" ammount={props.data.dining} />
                        <CalculateSales title="outside the home" ammount={props.data.take_away} />

                    </Grid>
                    {/* <Grid item md={8} sm={6} xs={12} > */}

                        
                    {/* </Grid> */}
                </Grid>
            </CardCover>
        </div>
    )
}
