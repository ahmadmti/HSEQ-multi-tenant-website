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
import { getPendingOrders, getPendingOrdersStatus } from '../../../api/api';
import { Button } from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { addToCart as addToCartAction, clearCart, addDiscount, addShippingCost } from '../../../actions/cartActions';
import { useDispatch, useSelector } from "react-redux";
import CompanyContext from '../../../context/CompanyContext';
import { toggle, ordersArray } from '../../../actions/pacerActions';
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import Modal from '../SharedComponent/Modal';
import { useHistory } from 'react-router-dom'
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
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const company = React.useContext(CompanyContext);
    const [cartModal, setCartModal] = React.useState(false);
    const dispatch = useDispatch();
    let history = useHistory()
    let orders = useSelector(state => state.pacer.orders);
    const toastOptions = React.useContext(ToastContext);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const { t } = useTranslation();


    React.useEffect(() => {
        pendingOrder();
    }, []);

    const pendingOrder = () => {
        dispatch(toggle());
        getPendingOrders()
            .then(res => {
                dispatch(toggle());
                console.log(res)
                dispatch(ordersArray(res.data.orders));
            })
            .catch(err => {
                dispatch(toggle());
                console.log(err);
            });
    }

    const dateFormat = (date) => {
        return new Date(date).toUTCString();
    }

    const clearCartItem = () => {
        dispatch(clearCart());
        toast.success('Cart Clean', toastOptions);
        setCartModal(false);
    }

    const addToCart = (order) => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
            dispatch(toggle());
            getPendingOrdersStatus(order.id)
                .then(res => {
                    for (let item of order.items) {
                        let content = {};
                        if (item.vat_din_in && (item.size_id && item.size_name)) {
                            content = {
                                id: item.product_label_id,
                                name: item.name,
                                unit_price: item.sale_price,
                                total_price: (item.sale_price * item.qty),
                                size_id: item.size_id,
                                qty: item.qty,
                                din_in: item.vat_din_in,
                                take_away: item.take_away_vat,
                                vat_label: item.vat_label,
                                sku: item.sku,
                                size: item.size_name,
                                options: []
                            }
                        } else {
                            content = {
                                id: item.product_label_id,
                                name: item.name,
                                unit_price: item.sale_price,
                                total_price: (item.sale_price * item.qty),
                                size_id: ' ',
                                qty: item.qty,
                                din_in: company.vat_din_in || 'D',
                                take_away: company.vat_take_away || 9,
                                vat_label: company.vat_label || 19,
                                sku: '',
                                size: ' ',
                                options: []
                            }
                        }
                        dispatch(addToCartAction(content));
                    }
                    dispatch(addDiscount(order.discount_amount));
                    dispatch(addShippingCost(order.delivery_charges));

                    dispatch(toggle());
                    history.push('create-invoice')
                })
                .catch(err => {
                    dispatch(toggle());
                    console.log(err);
                });
        } else {
            setCartModal(true);
        }
    }

    return (
        <div className={classes.root}>
            <Modal title={' ⛔ Warning'} open={cartModal} close={() => setCartModal(false)}>
                <div>
                    <Typography variant="subtitle2" component="h2">
                        {t('cartAlready')}
                    </Typography>
                    <div className={classes.modalBtn}>
                        <Button variant="contained" color="primary" size="small" onClick={clearCartItem}>
                            {t('cleanCart')}
                        </Button>

                        <Button variant="contained" color="primary" size="small" onClick={() => setCartModal(false)}>
                        {t('close')}
                    </Button>
                    </div>
                </div>
            </Modal>
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
                                        <div className={'text-right'} style={{ margin: '5px 0' }}>
                                            <Button variant="contained" onClick={() => addToCart(order)} color="primary" size="small">
                                                <ReceiptIcon />
                                            </Button>
                                        </div>

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
