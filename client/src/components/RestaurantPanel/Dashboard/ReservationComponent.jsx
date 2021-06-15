import React from 'react'
import ComponentTitle from './ComponentTitle';
import CardCover from '../SharedComponent/CardCover'
import DatePickers from './DateFilter'
import { Box, MenuItem, Select, Input, InputLabel, FormControl, Divider, FormControlLabel, Checkbox, Grid, Button, TextField, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CalculateSales from './CalculateSales';
import AssignmentComponentChart from './AssignmentComponentChart'
import Table from './ReservationTable';
const useStyles = makeStyles((theme) => ({
 
    // cover:{
    //     textAlign:'center',
    // }
}));

export default function ReservationComponent() {
    const classes = useStyles();
    return (
        <div>
            <ComponentTitle title={"RESERVATION"} />
            <CardCover>
                <Grid container spacing={3} >
                    
                    <Grid item md={12} sm={12} xs={12} >

                        <Table />
                    </Grid>
                </Grid>
            </CardCover>
        </div>
    )
}
