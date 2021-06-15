import React from 'react'
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import InvoiceGenerator from './InvoiceGenerator';
import ChosseItem from './ChosseItem';
import BarcodeReader from 'react-barcode-reader'
import { getBarcodeItem } from '../../../api/api'
import { useDispatch } from "react-redux";
import { addToCart as addToCartAction } from '../../../actions/cartActions';
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';
import { clearCart, refreshCart } from '../../../actions/cartActions';
import { useTranslation } from 'react-i18next';

const InvoiceWrapper = styled.div`
    width:100%;
`;
const TabContainerBox = styled.div`
display:flex;
align-Items:center;
`

const NewInvoice = styled.span`
cursor:pointer;
`
const useStyles = makeStyles((theme) => ({
    addCustomer: {
        display: 'flex',
        alignItems: 'center',

    },
    chipBox: {
        margin: '5px'
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

export default function Index() {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toastOptions = React.useContext(ToastContext);
    const classes = useStyles();
    const [cart_array, setCartArray] = React.useState((JSON.parse(localStorage.getItem('cart_array')) || []));


    const handleDelete = (index) => {
        let cart_array = JSON.parse(localStorage.getItem('cart_array'));

        if (cart_array && cart_array.length > 0) {

            cart_array.splice(index, 1);
            setCartArray([...cart_array]);
            localStorage.setItem('cart_array', JSON.stringify(cart_array))
        }
    };

    const handleScan = (data) => {
        getBarcodeItem(data)
            .then(res => {

                let content = {
                    id: res.data.item.product_label_id,
                    name: res.data.item.name,
                    unit_price: res.data.item.sale_price,
                    total_price: res.data.item.sale_price,
                    size_id: res.data.item.size_id,
                    qty: 1,
                    din_in: res.data.item.vat_din_in,
                    take_away: res.data.item.take_away_vat,
                    vat_label: res.data.item.vat_label,
                    sku: res.data.item.sku,
                    size: res.data.item.size_name,
                    options: []
                }
                dispatch(addToCartAction(content));
            })
            .catch(err => {
                toast.error(err.response.data.msg, toastOptions);

                // console.error(err)
            })
    }

    const handleError = (err) => {
        console.error(err)
    }
    const usedPendingInvoice = (item, index) => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart) {
            let cart_array = JSON.parse(localStorage.getItem('cart_array'));

            if (cart_array && cart_array.length > 0) {
                // let newCart = cart_array[index];
                cart_array.splice(index, 1);
                setCartArray([...cart_array, cart]);
                cart_array.push(cart);
                localStorage.setItem('cart_array', JSON.stringify(cart_array))
                localStorage.setItem('cart', JSON.stringify(item));

                dispatch(refreshCart(item))
            } else {
                alert('else Call')
            }


        } else {
            let cart_array = JSON.parse(localStorage.getItem('cart_array'));

            if (cart_array && cart_array.length > 0) {
                cart_array.splice(index, 1);
                setCartArray([...cart_array]);
                localStorage.setItem('cart_array', JSON.stringify(cart_array))
                localStorage.setItem('cart', JSON.stringify(item));


                dispatch(refreshCart(item))
            }

        }
    }
    const createNewInvoice = () => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart && (cart.content.length > 0 || (cart.customerDetail || cart.table_no))) {
            let cart_array = JSON.parse(localStorage.getItem('cart_array'));
            if (cart_array && cart_array.length > 0) {
                let pendingCart = [...cart_array, cart];
                setCartArray([...pendingCart]);
                localStorage.setItem('cart_array', JSON.stringify(pendingCart))
                dispatch(clearCart())
            } else {
                let pendingCart = [cart]
                setCartArray([...pendingCart]);
                localStorage.setItem('cart_array', JSON.stringify(pendingCart))
                dispatch(clearCart())
            }


        }
    }

    return (
        <InvoiceWrapper>
            <Box component="div" m={0}>
                <Container >
                    <BarcodeReader
                        onError={handleError}
                        onScan={handleScan}
                    />
                    <Grid container >

                        {/* Inovice Content */}

                        <Grid item md={12}>
                            <TabContainerBox>
                                <NewInvoice ><Chip
                                    icon={<AddIcon />}
                                    label={t("newInvoice")}
                                    className={classes.chipBox}
                                    color="secondary"
                                    size="small"
                                    onClick={createNewInvoice}
                                /></NewInvoice>

                                <div>
                                    {
                                        cart_array.map((item, index) => (
                                            <Chip
                                                key={index}
                                                icon={<ReceiptIcon />}
                                                className={classes.chipBox}
                                                label={`${(item.customerDetail ? item.customerDetail.name : t('invoice'))}-${index + 1}`}
                                                onDelete={() => handleDelete(index)}
                                                color="secondary"
                                                variant="outlined"
                                                onClick={() => usedPendingInvoice(item, index)}
                                                size="small"
                                            />))
                                    }

                                </div>

                            </TabContainerBox>

                        </Grid>

                        <Grid item md={6}>
                            <InvoiceGenerator />
                        </Grid>

                        {/* end Invoice Content  */}

                        {/* Invoice Item */}
                        <Grid item md={6}>
                            <ChosseItem />
                        </Grid>
                        {/* Invoice Item */}

                    </Grid>
                </Container>
            </Box>
        </InvoiceWrapper>
    )
}
