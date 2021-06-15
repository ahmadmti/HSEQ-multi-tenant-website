import React, { useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import Logo from '../../assets/images/ResturantProLogo.png';
import styled from 'styled-components'
import LoginForm from '../../components/Auth/LoginForm';
import CompanyContext from '../../context/CompanyContext';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const LOGO = styled.img`
display:block;
height:auto;
max-width:150px;
`;
export default function Login() {
    const classes = useStyles();
    const company = useContext(CompanyContext);
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <LOGO src={`/public/images/company/${company.logo}`} />
                <LoginForm />
            </div>
        </Container>
    );
}