import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Logo from '../../assets/images/ResturantProLogo.png';
import styled from 'styled-components'
import RegisterFrom from '../../components/Auth/RegisterForm';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));
const LOGO = styled.img`
display:block;
height:auto;
max-width:150px;
`;


export default function Register() {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <LOGO src={Logo} />
                <RegisterFrom />
            </div>

        </Container>
    );
}