import React from 'react'
import ComponentTitle from './ComponentTitle';
import CardCover from '../SharedComponent/CardCover'
import DatePickers from './DateFilter'
import { Box, MenuItem, Select, Input, InputLabel, FormControl, Divider, FormControlLabel, Checkbox, Grid, Button, TextField, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CalculateSales from './CalculateSales';

const useStyles = makeStyles((theme) => ({
 
    // cover:{
    //     textAlign:'center',
    // }
}));

export default function ResturantInformation(props) {
    const classes = useStyles();
    return (
        <div>
            <ComponentTitle title={"RESTAURANT INFORMATION"} />
            <CardCover>
                <Grid container spacing={3} >
                    
                    <Grid item md={12} sm={12} xs={12} >
                    <CalculateSales title="Total categories" ammount={props.data.categories}/>
                        <CalculateSales title="Article total" ammount={props.data.items}/>
                        <CalculateSales title="Total ingredients" ammount={props.data.ingredients}/>

                    </Grid>
                </Grid>
            </CardCover>
        </div>
    )
}
