import React, { useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import Logo from '../../assets/images/ResturantProLogo.png';
import styled from 'styled-components'
import ChangePassword from '../../components/Auth/ChangePassword';

const useStyles = makeStyles((theme) => ({
  
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function ChangePasword() {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline />
            <div className={classes.paper}>
                <ChangePassword />
            </div>
        </Container>
    );
}
