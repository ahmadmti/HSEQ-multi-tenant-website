import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    LoadingBar: {
        width: '100%',
        position: 'absolute',
        zIndex: 111111,
        display: 'block',
        left: 0,
        top: 0
    }
}));
export default function ProgressBar() {
    const classes = useStyles();
    return (

        <LinearProgress color="secondary" className={classes.LoadingBar} />

    );
}