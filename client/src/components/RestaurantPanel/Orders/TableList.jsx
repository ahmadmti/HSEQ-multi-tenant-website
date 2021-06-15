import React, { useEffect } from 'react'
import $ from 'jquery';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory } from "react-router-dom";
import Modal from '../SharedComponent/Modal';
import { makeStyles } from "@material-ui/core/styles";
import ReasonModal from './ResonModal';
import { useTranslation } from 'react-i18next';
import { CSVLink, CSVDownload } from "react-csv";
const useStyles = makeStyles((theme) => ({

    height: {
        minHeight: "400px",
    }
}));
export default function TableList(props) {
    const { t } = useTranslation();
    const headers = [
        { label: t('Sr.#'), key: 'id' },
        { label: t('Invoice#'), key: 'id' },
        { label: t('Customer'), key: 'customer_name' },
        { label: t('address'), key: 'customer_address' },
        { label: t('Discount'), key: 'discount' },
        { label: t('vat'), key: 'vat_amount' },
        { label: t('Delivery_Charges'), key: 'delivery_charges' },
        { label: t('Order_Date'), key: 'order_date' },
        { label: t('Total_Price'), key: 'total_price' },
        { label: t('Reason'), key: 'reason' },
    ];
    const data = [];

    props.orders.map((order, index) => {

        data.push({
            id: order.id,
            customer_name: order.customer_id ? order.customer_name : 'Walking Customer',
            customer_address: order.customer_address,
            discount: order.discount,
            vat_amount: order.vat_amount,
            delivery_charges: order.delivery_charges,
            order_date: formatDate(order.order_date),
            total_price: order.total_price,
            reason: order.reason,

        });

    })




    const classes = useStyles();
    const history = useHistory();
    const [modal, setModal] = React.useState(false);
    const [orderId, setOrderId] = React.useState('');

    function formatDate(_date) {

        if (_date) {
            return new Date(_date).toLocaleDateString();
            // return new Date(_date).toISOString().slice(0, 10);
        }
    }
    const orderView = (order_id) => {
        history.push(`order/${order_id}`);
    }
    const refund = (order_id) => {
        setOrderId(order_id);
        setModal(true);
    }

    const recordUpdate = (data) => {
        // table.empty();
        // $('#order_table').dataTable().fnDestroy();
        // categoriesfetch()
        setModal(false);
        props.recordUpdate(data);
    }


    useEffect(() => {


    }, [props.orders])


    return (
        <div className={classes.height}>
            <div>
                <CSVLink filename="Order.csv" data={data} headers={headers}>
                    <Button variant="contained" color="primary" style={{ marginBottom: 10 }}>
                        {t('exportCSV')}
                    </Button>

                </CSVLink>
            </div>
            <div className="table-responsive">
                <table id="order_table" className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>{t('Sr.#')}</th>
                            <th>{t('Invoice#')}</th>
                            <th>{t('Customer')}</th>
                            <th>{t('address')}</th>
                            <th>{t('Discount')}</th>
                            <th>{t('vat')}</th>
                            <th>{t('Delivery_Charges')} </th>
                            <th>{t('Order_Date')} </th>
                            <th>{t('Total_Price')} </th>
                            <th>{t('Reason')}</th>
                            <th>{t('Action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (props.orders.length > 0) ?
                                props.orders.map((order, index) => {
                                    return (
                                        <tr key={index}>

                                            <td>{index + 1}</td>
                                            <td>{order.id}</td>
                                            <td>{order.customer_id ? order.customer_name : t('Walking_Customer')}</td>
                                            <td>{order.customer_address}</td>
                                            <td>{order.discount}</td>
                                            <td>{order.vat_amount}</td>
                                            <td>{order.delivery_charges}</td>
                                            <td>{formatDate(order.order_date)}</td>
                                            <td>{((order.total_price) + (order.delivery_charges) - order.discount)}</td>
                                            <td>{order.reason}</td>
                                            <td>
                                                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                                    <Button onClick={() => orderView(order.id)}>{t('view')}</Button>
                                                    <Button onClick={() => refund(order.id)}>{t('refund')}</Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan="11" className="text-center">{t("sEmptyTable")}</td>
                                </tr>

                        }



                    </tbody>

                </table>
            </div>
            <Modal title={t('Refund_Reason')} open={modal} close={() => setModal(false)} >
                <ReasonModal orderID={orderId} onFormSubmit={(data) => recordUpdate(data)} />
            </Modal>
        </div>
    )
}
