import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AppBar from '@material-ui/core/AppBar';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import NewOrders from './NewOrders';
import OldOrder from './OldOrder';
import CompanyContext from '../../../context/CompanyContext';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-prevent-tabpanel-${index}`}
            aria-labelledby={`scrollable-prevent-tab-${index}`}
            {...other}
        >
            {value === index && (children)}
        </div>
    );
}


function Index(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const company = React.useContext(CompanyContext);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const { t } = useTranslation();


    return (
        <div>
            {!company.is_piko_pako ? (<div className="alert alert-warning">
            {t('notConnected')}
           <br />
                {t('moreDetails')}
             
            </div>) : null}

            <Paper className={classes.root}>
                <AppBar position="static" color="secondary">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="inherit"
                        centered

                    >
                        <Tab icon={<AddShoppingCartIcon />} disabled={!company.is_piko_pako} label={t('pendingOrders')} />
                        <Tab icon={<PlaylistAddCheckIcon />} label={t('completeOrders')} disabled={!company.is_piko_pako} />
                    </Tabs>
                </AppBar>

                <TabPanel value={value} index={0}>
                    <NewOrders />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <OldOrder />
                </TabPanel>
            </Paper>
        </div>
    );
}

export default Index;