import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ImageIcon from '@material-ui/icons/Image';
import Divider from '@material-ui/core/Divider';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { getCompleteOrders } from '../../../api/api';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';
import { useTranslation } from 'react-i18next';



const useStyles = makeStyles((theme) => ({
    modalBtn: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px 0'
    },
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    panelRoot: {
        margin: '10px'
    },
    orderProfile: {
        display: 'flex',
        alignItems: 'center'
    },
    customerProfile: {
        padding: '5px'
    },
    textSecndary: {
        color: '#b0aeae'
    },
    orderId: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    orderAmount: {
        color: '#f50057',
        fontWeight: 'bold'
    },
    menuItemsBox: {
        width: '100%'
    },
    menuItemsContent: {
        background: '#eee',
        padding: '10px',
        width: '100%'
    },
    cartDetail: {
        margin: '10px',
        padding: '5px',
        border: '1px dotted #eee'
    },
    cartDetailRow: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '5px'
    }
}));

export default function NewOrders() {
    const { t } = useTranslation();

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [orders, setOrders] = React.useState([]);

    const dispatch = useDispatch();

    const dateFormat = (date) => {
        return new Date(date).toUTCString();
    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    React.useEffect(() => {
        getOrder();
    }, []);

    const getOrder = () => {
        dispatch(toggle());
        getCompleteOrders()
            .then(res => {
                dispatch(toggle());
                console.log(res)
                setOrders([...res.data.orders])
            })
            .catch(err => {
                dispatch(toggle());
                console.log(err);
            });
    }






    return (
        <div className={classes.root}>

            <div className={classes.panelRoot}>
                {
                    orders.map((order, index) => {
                        return (
                            <Accordion key={index} expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>


                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                                    <Grid container className={classes.root} spacing={2}>
                                        <Grid item xs={4}>
                                            <div className={classes.orderProfile}>
                                                <Avatar>
                                                    <RoomServiceIcon />
                                                </Avatar>
                                                <div className={classes.customerProfile}>
                                                    <Typography variant="subtitle1" component="h2">
                                                        {order.user_name}
                                                    </Typography>
                                                    <Typography variant="subtitle2" className={classes.textSecndary} component="h4" >
                                                        {order.user_contact_number}
                                                    </Typography>
                                                    <Typography variant="subtitle2" component="h4" className={classes.textSecndary}>
                                                        {order.address}
                                                    </Typography>
                                                </div>
                                            </div>

                                        </Grid>
                                        <Grid item xs={4}>
                                            <div className={classes.orderId}>
                                                <Typography variant="subtitle1" className={classes.textSecndary} component="h2">
                                                    {t('order_id')}
                                                </Typography>
                                                <Typography variant="subtitle2" component="h2">
                                                    PikoPako#{order.pikoPako_order_id}
                                                </Typography>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <div className={classes.orderId}>
                                                <Chip label={order.order_status} color="secondary" />
                                                <Typography variant="subtitle2" className={classes.textSecndary} component="h2">
                                                    {t('total_Payment')}
                                                </Typography>
                                                <Typography variant="subtitle1" className={classes.orderAmount} component="h1">
                                                    {order.paid_amount}
                                                </Typography>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <div className={classes.menuItemsBox}>

                                        <div className={classes.menuItemsContent}>
                                            <List className={classes.root}>
                                                {
                                                    order.items.map((item, index) => {
                                                        return (
                                                            <ListItem key={index}>
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                        <ImageIcon />
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText primary={`${item.name} X ${item.qty} = ${item.qty * item.sale_price}`} />
                                                            </ListItem>
                                                        )
                                                    })
                                                }

                                            </List>
                                        </div>
                                        <div className={classes.cartDetailBox}>
                                            <div className={classes.cartDetail}>
                                                <div className={classes.cartDetailRow}>
                                                    <Typography variant="subtitle1" className={classes.textSecndary} component="h2">
                                                        {t('total_Payment')}
                                                    </Typography>
                                                    <Typography variant="subtitle1" className={classes.textSecndary} component="h2">
                                                        {order.paid_amount + order.discount_amount - order.delivery_charges}
                                                    </Typography>
                                                </div>
                                                <div className={classes.cartDetailRow}>
                                                    <Typography variant="subtitle1" className={classes.textSecndary} component="h2">
                                                        {t('Discount')} (-)
                                                    </Typography>
                                                    <Typography variant="subtitle1" className={classes.textSecndary} component="h2">
                                                        {order.discount_amount}
                                                    </Typography>
                                                </div>
                                                <div className={classes.cartDetailRow}>
                                                    <Typography variant="subtitle1" className={classes.textSecndary} component="h2">
                                                        {t('Delivery_Charges')}
                                                    </Typography>
                                                    <Typography variant="subtitle1" className={classes.textSecndary} component="h2">
                                                        {order.delivery_charges}
                                                    </Typography>
                                                </div>
                                                <Divider variant="middle" />
                                                <div className={classes.cartDetailRow}>
                                                    <Typography variant="subtitle1" className={classes.textSecndary} component="h2">
                                                        {t('total_Payable')}
                                                    </Typography>
                                                    <Typography variant="subtitle1" className={classes.textSecndary} component="h2">
                                                        {order.paid_amount}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>


                                        <div className={classes.orderDetailBox}>
                                            <Grid container>
                                                <Grid item md={6}>
                                                    <Typography variant="h5" component="h5">
                                                        {t('delivery_Address')}
                                                    </Typography>
                                                    <Typography variant="subtitle1" component="h1">
                                                        <LocationOnIcon /> {order.address}
                                                    </Typography>
                                                </Grid>
                                                <Grid item md={6}>
                                                    <Typography variant="h5" component="h5">
                                                        {t('customer_Information')}
                                                    </Typography>
                                                    <Typography variant="subtitle2" component="h1">
                                                        <PhoneIcon /> {order.user_contact_number}
                                                    </Typography>
                                                    <Typography variant="subtitle2" component="h1">
                                                        <MailOutlineIcon /> {order.user_email}
                                                    </Typography>
                                                </Grid>

                                                <Grid item md={6}>
                                                    <Typography variant="h5" component="h5">
                                                        {t('order_Date_Time')}
                                                    </Typography>
                                                    <Typography variant="subtitle1" component="h1">
                                                        <CalendarTodayIcon /> {dateFormat(order.add_date)}
                                                    </Typography>
                                                </Grid>
                                                <Grid item md={6}>
                                                    <Typography variant="h5" component="h5">
                                                        {t('delivery_Time')}
                                                    </Typography>
                                                    <Typography variant="subtitle2" component="h1">
                                                        {order.customer_delivery_time}
                                                    </Typography>

                                                </Grid>


                                            </Grid>
                                        </div>
                                    </div>
                                </AccordionDetails>

                            </Accordion>
                        )
                    })
                }

            </div>
        </div>
    );
}
