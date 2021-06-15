import React, { useRef, useEffect, useContext } from 'react'
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import AddCustomer from './AddCustomer';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AttachMoneySharpIcon from '@material-ui/icons/AttachMoneySharp'
import RoomServiceSharpIcon from '@material-ui/icons/RoomServiceSharp';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import InvoiceTable from './InvoiceTable';
import SaveIcon from '@material-ui/icons/Save';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import Modal from '../SharedComponent/Modal';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import { useForm, Controller } from "react-hook-form";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { customers, getCustomerByNumber, getActivePaymentMethods, getActiveTable, saveInvoiceData } from '../../../api/api';
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import { useDispatch, useSelector } from "react-redux";
import { addDiscount, removeTableNo, addCustomer, addTableNumber, removeCustomer, setTaxType, clearCart, addShippingCost } from '../../../actions/cartActions';
import PrintInvoice from './PrintInvoice';
import CompanyContext from '../../../context/CompanyContext';
import { toggle } from '../../../actions/pacerActions';
import { useTranslation } from 'react-i18next';
import io from "socket.io-client";
import Typography from '@material-ui/core/Typography';
import * as $ from 'jquery';
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import PhoneCallbackIcon from '@material-ui/icons/PhoneCallback';

import Popper from "@material-ui/core/Popper";

const styles = (theme) => ({
    popper: {
        maxWidth: "fit-content",
    }
});

const PopperMy = function (props) {
    return <Popper {...props} style={styles.popper} placement="bottom-start" />;
};


const InvoiceGeneratorBlock = styled.div`
    width:100%;
`;

const InvoiceGeneratorCustomerBlock = styled.div`
    width:100%;
`;

const ButtonsBlock = styled.div`
    display:flex;
    justify-content:space-between;
    padding:15px 0;
`;
const InvoiceTableBox = styled.div`
`;
const DicountBtn = styled.div`
    display:flex;
    justify-content:center;
`;
const useStyles = makeStyles((theme) => ({
    addCustomer: {
        display: 'flex',
        alignItems: 'center',

    },
    modalBtn: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px 5px'
    },
    btnPhone: {
        margin: '4px'
    }
    ,
    btnSize: {
        fontSize: '12px'
    },
    DiscountBtn: {
        margin: '5px'
    }

}));

const FormGroup = styled.div`
    min-width:400px;
    display:flex;
   justify-content:center;
   flex-direction:column;
`;

const SelectGroup = styled.div`
  
    display:flex;
   justify-content:center;
   
`;
let customersData = [];

export default function InvoiceGenerator(props) {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const componentRef = useRef();
    let cart = useSelector(state => state.cart.cart);
    const classes = useStyles();
    const [discountType, setDiscountType] = React.useState('cash');
    const toastOptions = useContext(ToastContext);
    const [modal, setModal] = React.useState(false);
    const [modalShip, setModalShip] = React.useState(false);
    const [modalPay, setModalPay] = React.useState(false);
    const [paymentMethodList, setpaymentMethodList] = React.useState([]);
    const company = useContext(CompanyContext);
    // const [ringCallModal, setRingCallModal] = React.useState(false);
    const [customerList, setCustomerList] = React.useState([]);
    const [tableList, setTableList] = React.useState([]);
    const [tableField, setTableField] = React.useState((cart.tax_type == 'din_in' ? true : false));
    const [printInvoiceData, setprintInvoiceData] = React.useState({});
    const [customerDetail, setCustomerDetail] = React.useState({});
    const [defaultCustomer, setDefaultCustomer] = React.useState(() => ((cart && cart.customerDetail) ? { ...cart.customerDetail } : null));
    const [shippingCostValue, setShippingCostValue] = React.useState(cart ? cart.shippingCost : 0);
    const [discountValue, setDiscountValue] = React.useState(cart ? cart.discount : 0);
    const [invoiceData, setInvoiceData] = React.useState({
        customerId: ((cart && cart.customerDetail) ? cart.customerDetail.id : ''),
        order_type: company.invoice_type || 'TAKE_AWAY',
        table_no: (cart.table_no || ''),
        payment_method: ''
    });
    const [caller, setCaller] = React.useState({});
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [phoneNumbers, setPhoneNumber] = React.useState(JSON.parse(localStorage.getItem('phone_calls')) || []);
    const [numberToForm, setNumberToForm] = React.useState(null);
    const [customerModal, setCustomerModal] = React.useState(false);
    const [modalInvoice, setModalInvoice] = React.useState(false);

    const modalShipToggle = () => {
        setModalShip(!modalShip);

    };


    const paymentMethods = () => {

        getActivePaymentMethods()
            .then(res => {
                setpaymentMethodList([...res.data.method])

            })
            .catch(err => console.log(err));
    }

    const modalPayToggle = () => {
        setModalPay(!modalPay);

    };

    const modalToggle = () => {
        setModal(!modal);
    };


    const saveInvoice = (payment = '') => {
        dispatch(toggle())
        let data = invoiceData;
        data.discount = discountValue;
        data.delivery_charges = shippingCostValue;
        data.total_price = cart.total;
        data.subTotal = cart.subTotal;
        data.content = cart.content;
        data.TotalTax = cart.total_tax;
        data.tax_array = cart.tax_array;
        data.taxType = cart.tax_type;

        setprintInvoiceData({ ...data });
        saveInvoiceData(data)
            .then(res => {
                dispatch(toggle())

                toast.success(res.data.message, toastOptions);
                cancelInvoice();
            })
            .catch(err => {
                dispatch(toggle());
                console.log(err)
            });

    }

    const tables = () => {
        getActiveTable()
            .then(res => {
                setTableList([...res.data.tables])
            })
            .catch(err => {
                console.log(err)
            })
    }
    const getCustomers = () => {
        customers()
            .then(res => {


                setCustomerList(() => [...res.data.customers])
                customersData = res.data.customers;
            })
            .catch(err => {
                toast.error(err.response.data.error, toastOptions);
            })

    }

    const removeNumber = (number) => {
        let numbers = JSON.parse(localStorage.getItem('phone_calls'));



        const index = numbers.findIndex(customer => customer.number == number);
        if (index > -1) {
            numbers.splice(index, 1);
            setPhoneNumber([...numbers]);
            localStorage.setItem('phone_calls', JSON.stringify(numbers));
        }

    }
    useEffect(() => {

        if (!localStorage.getItem('cart')) {
            if (company.invoice_type == "DINNING") {
                setTableField(true);
                dispatch(setTaxType('din_in'));
            }
        }



        getCustomers();
        tables();
        paymentMethods();

        const socket = io.connect('http://localhost:4995', { 'force new connection': true });

        socket.on('call', function (data) {
            console.log('Received Call', data);
            // setRingCallModal(true);
            data.customer_name = findCustomerByNumber(data.caller);
            setCaller(data);
            addNumberToQueue(data);
        });

        socket.on('connect_error', function (err) {

        });

        socket.on('ringing', function (data) {
            console.log('some-one-calling', data);
            // setRingCallModal(true);
            data.customer_name = findCustomerByNumber(data.caller);
            addNumberToQueue(data);

            setCaller(data);
        })
        return () => {
            socket.off('call')
        }
    }, []);
    const handleChange = (event) => {
        setDiscountType(event.target.value);
    };

    const findCustomerByNumber = (number) => {
        let customer = customersData.filter(item => item.phone_number == number);
        return (customer[0] && customer[0].name) || 'unknown';
    }
    const shippingCost = () => {
        if (shippingCostValue != '') {

            setShippingCostValue(shippingCostValue);
            dispatch(addShippingCost(shippingCostValue));
            modalShipToggle();
        }
    }
    const cancelInvoice = () => {
        setDiscountValue(0);
        setShippingCostValue(0);
        dispatch(clearCart())
        setDefaultCustomer(null);
    }
    const discountAdded = () => {
        if (discountValue != '') {
            if (discountType == 'cash') {

                dispatch(addDiscount(discountValue));

            } else {
                let pertacenge = (cart.total * discountValue / 100);
                dispatch(addDiscount(Math.round(pertacenge)));
            }
            modalToggle();
        }
    }

    const dineIn = () => {
        setTableField(true);
        dispatch(setTaxType('din_in'));
        setShippingCostValue(0);
        dispatch(addShippingCost(0));
    }
    const delivery = () => {
        setTableField(false);
        dispatch(setTaxType('take_away'));
        dispatch(removeTableNo())
    }

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const modalInvoiceToggle = () => {
        dispatch(toggle())
        let data = invoiceData;
        data.discount = discountValue;
        data.delivery_charges = shippingCostValue;
        data.total_price = cart.total;
        data.subTotal = cart.subTotal;
        data.TotalTax = cart.total_tax;
        data.taxType = cart.tax_type;
        data.content = cart.content;
        data.tax_array = cart.tax_array;

        setprintInvoiceData({ ...data });
        saveInvoiceData(data)
            .then(res => {
                dispatch(toggle())
                if (modalPay) {
                    modalPayToggle();

                }

                setCustomerDetail({ ...res.data.customer, invoice_no: res.data.invoice_no });
                setModalInvoice(!modalInvoice);
            })
            .catch(err => { dispatch(toggle()); console.log(err) });
    }

    const handleClose = () => {
        setAnchorEl(null);
    };
    const addNumberToQueue = (caller) => {
        let numbers = JSON.parse(localStorage.getItem('phone_calls'));
        if (numbers && numbers.length > 0) {
            let new_Calls = [{ name: caller.customer_name, number: caller.caller }, ...numbers];

            var uniquePhoneNumber = [];
            new_Calls.forEach(element => {
                if ((uniquePhoneNumber.filter(item => item.number == element.number)).length <= 0) {
                    uniquePhoneNumber.push(element);
                }
            });

            setPhoneNumber([...uniquePhoneNumber]);
            localStorage.setItem('phone_calls', JSON.stringify(uniquePhoneNumber));

        } else {
            let new_Calls = [{ name: caller.customer_name, number: caller.caller }];
            setPhoneNumber([...new_Calls]);
            localStorage.setItem('phone_calls', JSON.stringify(new_Calls));
        }
        // setRingCallModal(false);
    }
    const generateInvoice = (number) => {

        // setRingCallModal(false);

        dispatch(toggle())
        // getCustomerByNumber(number)
        //     .then(res => {
        let customer = customersData.filter(item => item.phone_number == number);
        dispatch(toggle())
        if (customer.length > 0) {
            setDefaultCustomer(() => customer[0]);
            dispatch(addCustomer(customer[0]))
            setInvoiceData({ ...invoiceData, customerId: customer[0].id })
            removeNumber(number);
        } else {
            setNumberToForm(number);
            setCustomerModal(true);
            removeNumber(number);
        }


        // })
        // .catch(error => { dispatch(toggle()); console.log(error) })
    }
    return (
        <InvoiceGeneratorBlock ref={componentRef}>

            <Modal open={modalInvoice} title={t('Reciept')} close={() => { setModalInvoice(false); cancelInvoice(); }}>
                <PrintInvoice data={printInvoiceData} customerDetail={customerDetail} />
            </Modal>
            {/* <Modal width={'lg'} title={'⛔ Ringing '} open={ringCallModal} close={() => setRingCallModal(false)}>
                <div>
                    <Typography variant="subtitle1" component="h2">
                        {`${caller.customer_name}-${caller.caller} is Calling You`}
                    </Typography>
                    <div className={classes.modalBtn}>
                        {

                            (!JSON.parse(localStorage.getItem('cart'))) ?
                                <Button className={classes.btnPhone} onClick={() => generateInvoice(caller.caller)} variant="contained" color="primary" size="small" >
                                    {t('addCart')}
                                </Button>
                                : null
                        }
                        <Button onClick={() => addNumberToQueue(caller)} className={classes.btnPhone} variant="contained" color="primary" size="small" >
                            {t('addToQueue')}
                        </Button>
                        <Button className={classes.btnPhone} variant="contained" color="primary" size="small" onClick={() => setRingCallModal(false)}>
                            {t('close')}
                        </Button>
                    </div>
                </div>
            </Modal> */}
            <InvoiceGeneratorCustomerBlock>
                <Grid container>

                    <Grid item md={10} sm={8} xs={12}>
                        {/* comobo box */}

                        <SelectGroup >
                            <FormControl style={{ width: "100%" }} margin="dense" variant="outlined">

                                <Autocomplete
                                    id="combo-box-demo"
                                    options={customerList}
                                    getOptionLabel={(customer) => `k${customer.id}-${customer.name},${customer.house_no},${customer.street_name},${customer.zip_code},${customer.city_name}`}
                                    autoHighlight={true}
                                    PopperComponent={PopperMy}
                                    style={{ width: '100%' }}
                                    autoComplete
                                    value={defaultCustomer || (cart && cart.customerDetail) ? cart.customerDetail : null}
                                    size={'small'}

                                    onChange={(event, newValue) => {
                                        setDefaultCustomer(newValue);
                                        setInvoiceData({ ...invoiceData, customerId: (newValue && newValue.id) ? newValue.id : null })
                                        if (newValue) {
                                            dispatch(addCustomer(newValue));

                                        }

                                    }}
                                    onInputChange={(event, newInputValue, reason) => {
                                        if (reason === 'clear')
                                            dispatch(removeCustomer())
                                        setInvoiceData({ ...invoiceData, customerId: ((cart && cart.customerDetail) ? cart.customerDetail.id : '') })
                                    }}
                                    renderInput={(params) => <TextField {...params} label={t('customers')} variant="outlined" />}
                                />

                                {/* comobo box */}
                            </FormControl>


                            {(tableField || cart.table_no) ?
                                <FormControl style={{ width: "50%", margin: "8px 5px 4px " }} margin="dense" variant="outlined">
                                    <InputLabel id="table_no">{t('Table_no')}</InputLabel>
                                    <Select
                                        labelId="table_no"
                                        id="table_no"
                                        label={t('Table_no')}
                                        value={cart.table_no}
                                        onChange={e => { setInvoiceData({ ...invoiceData, table_no: e.target.value }); dispatch(addTableNumber(e.target.value)) }}
                                    >
                                        {
                                            tableList.map((table, index) => {
                                                return (
                                                    <MenuItem key={index} value={table.id}>{table.table_no}</MenuItem>
                                                );
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                : null}
                        </SelectGroup>
                    </Grid>
                    <Grid item md={2} sm={4} xs={12} className={classes.addCustomer}>
                        <AddCustomer open={customerModal} number={numberToForm} customerList={customerList} updateCustomers={(defaultcustomer) => { setNumberToForm(null); setCustomerModal(false); getCustomers(); setInvoiceData({ ...invoiceData, customerId: (defaultcustomer) ? defaultcustomer.id : null }); dispatch(addCustomer(defaultcustomer)); setDefaultCustomer(() => defaultcustomer); }} />
                    </Grid>
                </Grid>
                {/* Buttons  */}

                <ButtonsBlock>
                    {/* <ButtonGroup> */}
                    {/* <Button size="small" className={classes.btnSize} variant="contained" color="primary" startIcon={<ReceiptIcon />}>
                            New Invoice
                    </Button> */}
                    <Button variant="contained" onClick={modalShipToggle} className={classes.btnSize} startIcon={<AttachMoneySharpIcon />} size="small" color="primary">
                        {t('deliver_flat_rate')}

                    </Button>
                    <Button variant="contained" onClick={() => { setInvoiceData({ ...invoiceData, order_type: 'DINNING' }); dineIn() }} className={classes.btnSize} startIcon={<RoomServiceSharpIcon />} color="primary" size="small">
                        {t('Dine_in')}
                    </Button>
                    <Button variant="contained" onClick={() => { setInvoiceData({ ...invoiceData, order_type: 'TAKE_AWAY' }); delivery() }} className={classes.btnSize} startIcon={<MotorcycleIcon />} color="primary" size="small">
                        {t('TakeAway')}
                    </Button>


                    <Button
                        variant="contained"
                        color="primary" size="small"
                        onClick={openMenu}
                    >

                        <PhoneCallbackIcon />
                    </Button>


                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {
                            phoneNumbers.length > 0 ?
                                phoneNumbers.map((data, index) => <MenuItem key={index} onClick={() => generateInvoice(data.number)}>{data.name + '-' + data.number}</MenuItem>)
                                : null
                        }
                    </Menu>

                    {/* </ButtonGroup> */}
                </ButtonsBlock>

                {/* Buttons */}



                {/* Table Card */}

                <InvoiceTableBox>
                    <InvoiceTable />
                </InvoiceTableBox>

                {/* Table Card */}

                <ButtonsBlock>

                    <Button disabled={(cart.content.length <= 0)} size="small" onClick={saveInvoice} className={classes.btnSize} variant="contained" color="primary" startIcon={<SaveIcon />}>
                        {t('Save')}
                    </Button>
                    <Button disabled={(cart.content.length <= 0)} variant="contained" onClick={modalInvoiceToggle} className={classes.btnSize} size="small" color="primary">
                        {t('Print')}
                    </Button>
                    <Button disabled={(cart.content.length <= 0)} variant="contained" onClick={modalPayToggle} className={classes.btnSize} color="primary" size="small">
                        {t('Pay_Print')}
                    </Button>
                    <Button onClick={modalToggle} disabled={(cart.content.length <= 0)} variant="contained" className={classes.btnSize} startIcon={<CardGiftcardIcon />} color="primary" size="small">
                        {t('Discount')}
                    </Button>
                    <Button variant="contained" className={classes.btnSize} color="primary" size="small" onClick={cancelInvoice}>
                        {t('Cancel')}
                    </Button>
                </ButtonsBlock>

                {/* PAy& Print  */}

                <Modal open={modalPay} title={t('Payments')} close={modalPayToggle}>
                    <Container >
                        <Grid container spacing={3} >

                            <Grid item md={12} sm={12} xs={12} >
                                <TextField disabled label={t("Payment_Amount")} margin="dense" value={cart.total} type="number" placeholder={"Amount"} style={{ width: '100%' }} variant="outlined" />
                                <FormGroup>
                                    <FormControl style={{ width: "100%" }} margin="dense" variant="outlined">
                                        <InputLabel id="select-label">{t("payment_method")}</InputLabel>
                                        <Select
                                            labelId="select-label"
                                            id="payment"

                                            value={invoiceData.payment_method}
                                            onChange={(e) => setInvoiceData({ ...invoiceData, payment_method: e.target.value })}
                                        >
                                            {
                                                paymentMethodList.map((item, index) => {
                                                    return (
                                                        <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                                                    );
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                    <DicountBtn>
                                        <Button className={classes.DiscountBtn} onClick={() => modalInvoiceToggle()} variant="contained" color="primary">{t("Save")}</Button>
                                        <Button className={classes.DiscountBtn} onClick={modalPayToggle} variant="contained">{t("close")}</Button>
                                    </DicountBtn>
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Container>
                </Modal>
                {/* Pay&Print */}
                {/* Modal Ship */}
                <Modal open={modalShip} title={t("add_shipping_cost")} close={modalShipToggle}>
                    <Container>
                        <Grid container spacing={3} >

                            <Grid item md={12} sm={12} xs={12} >
                                <FormGroup>
                                    <TextField margin="dense" type="number" value={shippingCostValue} onChange={(e) => setShippingCostValue(e.target.value)} placeholder={"Enter Shipping Amount"} style={{ width: '100%' }} variant="outlined" />
                                    <DicountBtn>
                                        <Button className={classes.DiscountBtn} onClick={shippingCost} variant="contained" color="primary">{t("Save")}</Button>
                                        <Button className={classes.DiscountBtn} onClick={modalShipToggle} variant="contained">{t("close")}</Button>
                                    </DicountBtn>
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Container>
                </Modal>
                {/* Modal Ship */}


                {/* Modal Block */}
                <Modal open={modal} title={t("Add_Discount")} close={modalToggle}>
                    <Container>
                        <Grid container spacing={3} >

                            <Grid item md={12} sm={12} xs={12} >
                                <FormGroup>
                                    <TextField margin="dense" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} placeholder={t("define")} style={{ width: '100%' }} variant="outlined" />
                                    <FormControl component="fieldset">
                                        <RadioGroup row aria-label="discount" name="discount" value={discountType} onChange={handleChange}>
                                            <FormControlLabel value="cash" control={<Radio />} label={t("CASH_REGISTER")} />
                                            <FormControlLabel value="percentage" control={<Radio />} label={t("PERCENTAGE")} />
                                        </RadioGroup>
                                    </FormControl>
                                    <DicountBtn>
                                        <Button className={classes.DiscountBtn} onClick={discountAdded} variant="contained" color="primary">Save</Button>
                                        <Button className={classes.DiscountBtn} onClick={modalToggle} variant="contained">Close</Button>
                                    </DicountBtn>
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Container>
                </Modal>
                {/* Modal Block */}

            </InvoiceGeneratorCustomerBlock>
        </InvoiceGeneratorBlock>
    )
}
