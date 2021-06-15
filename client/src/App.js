import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import router from './router';
import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
import ToastContext from './context/ToastContext';
import { getCompanyDetail } from './api/api';
import CompanyContext from './context/CompanyContext';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { enUS, deDE } from '@material-ui/core/locale';

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 111,
        color: '#fff',
    },
}));




const toastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};



function App() {
    let lang = (localStorage.getItem('default_lang') || 'de');
    const theme = createMuiTheme({
    }, (lang == 'de' ? deDE : enUS));

    let pacer = useSelector(state => state.pacer);
    const [company, setCompany] = React.useState({});
    const classes = useStyles();
    const companyDetail = () => {
        getCompanyDetail()
            .then(res => {

                setCompany({ ...res.data.company })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        companyDetail();
    }, [])
    return (
        <ThemeProvider theme={theme}>
            <ToastContext.Provider value={toastOptions}>
                <CompanyContext.Provider value={company}>
                    <div className="App" >
                        <ToastContainer />
                        <Backdrop className={classes.backdrop} open={pacer.open}>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", fontWeight: "bold" }}>
                                <CircularProgress />
                                <p>{pacer.msg}</p>
                            </div>
                        </Backdrop>
                        <BrowserRouter>
                            <Switch>
                                <Route path="/" component={router} />
                            </Switch>
                        </BrowserRouter>
                    </div>
                </CompanyContext.Provider>
            </ToastContext.Provider>
        </ThemeProvider>
    );
}


export default App;