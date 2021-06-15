import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Container, Button } from '@material-ui/core';
import Modal from '../SharedComponent/Modal';
import PrintInvoice from '../Invoice/PrintInvoice';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';
import { useTranslation } from 'react-i18next';


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});



export default function OrderReportView(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [modalInvoice, setModalInvoice] = React.useState(false);
    const [invoiceData, setInvoiceData] = React.useState({});
    const [customerDetail, setCustomerDetail] = React.useState({});

    const date = (date) => {
        if (date) {
            return new Date(date).toLocaleDateString();
        }
        return date;

    }

    const printInvoice = () => {
        setModalInvoice(!modalInvoice);
        // if (modalInvoice) {
        let content = [];
        for (let detail of props.order.order_detail) {
            let record = {
                qty: detail.qty,
                name: detail.product_name,
                total_price: (detail.qty * detail.price)
            }
            content.push(record);
        }
        let data = {
            subTotal: props.order.total_price,
            discount: props.order.discount,
            delivery_charges: props.order.delivery_charges,
            TotalTax: props.order.tax,
            total_price: (parseInt(props.order.total_price) - parseInt(props.order.discount) + (props.order.delivery_charges)),
            order_type: props.order.order_type,

        }
        data.content = content;
        data.tax_array = props.orderVat;

        setCustomerDetail({ invoice_no: props.order.id, name: props.order.customer_name })
        setInvoiceData({ ...data })
        // }
    }
    return (
        <div>
            <Modal open={modalInvoice} title={t('Reciept')} close={printInvoice}>
                <PrintInvoice data={invoiceData} customerDetail={customerDetail} />
            </Modal>
            <Container>
                <Grid container spacing={3} >
                    <Grid item md={12} sm={12} xs={12} >
                        <Button onClick={printInvoice} variant="contained" color="primary">
                            {t("Print")}
                        </Button>

                        <table style={{ marginTop: 15 }} className="table table-striped table-bordered" >

                            <thead>
                                <tr>
                                    <th colSpan="6">
                                        <h4>{t("order")} </h4>
                                    </th>
                                </tr>
                                <tr>
                                    <th>{t("order_id")}</th>
                                    <td>{props.order.id}</td>
                                    <th>{t("Order_Date")}</th>
                                    <td>{date(props.order.order_date)}</td>
                                    <th>{t("Total_Price")}</th>
                                    <td>{((props.order.total_price + props.order.delivery_charges) - props.order.discount)}</td>
                                </tr>
                                <tr>
                                    <th>{t("Discount")}</th>
                                    <td>{props.order.discount}</td>
                                    <th>{t("Customer")}</th>
                                    <td>{(props.order.customer_name) ? props.order.customer_name : t('Walking_Customer')}</td>
                                    <th>{t('Status')}</th>
                                    <td>
                                        {t(props.order.order_status)}
                                    </td>
                                </tr>
                                <tr>
                                    <th>{t("Delivery_Charges")}</th>
                                    <td>{props.order.delivery_charges}</td>
                                </tr>
                            </thead>
                        </table>
                    </Grid>
                </Grid>
                <Grid container spacing={3} >
                    <Grid item md={12} sm={12} xs={12} >
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered" >

                                <thead>
                                    <tr >
                                        <th colSpan="6">
                                            <h4>{t("ORDER_DETAIL")}</h4>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>{t('Sr.#')}</th>
                                        <th>{t("Product")}</th>
                                        <th>{t("total_quantity")}</th>
                                        <th>{t("unit_price")}</th>
                                        <th>{t("vat")}</th>
                                        <th>{t("total_price")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (props.order && Object.keys(props.order).length > 0) ?
                                            props.order.order_detail.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.product_name}</td>
                                                        <td>{item.qty}</td>
                                                        <td>{item.price}</td>
                                                        <td>{item.vat}%</td>
                                                        <td>{item.price * item.qty}</td>
                                                    </tr>)
                                            })
                                            :
                                            null
                                    }

                                </tbody>
                            </table>
                        </div>
                    </Grid>
                </Grid>

            </Container>
        </div >
    );
}
