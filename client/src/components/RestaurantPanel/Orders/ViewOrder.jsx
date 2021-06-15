import React, { useEffect, useContext } from 'react'
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import TableList from './TableList';
import { makeStyles } from '@material-ui/core/styles';
import { getOrders } from '../../../api/api';
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import { toggle } from '../../../actions/pacerActions';
import { useDispatch } from "react-redux";
import { DateStringFormater } from '../../../helper/helper';

const useStyles = makeStyles((theme) => ({
    DateRanger: {
        margin: "10px 0",
        textAlign: "right"
    },
    DateRangerField: {
        border: "1px solid #eee",
        borderRadius: "4px"
    }
}));

export default function ViewOrder() {

    const [value, onChange] = React.useState([new Date(), new Date()]);
    const [orderList, setOrderList] = React.useState([]);
    const toastOptions = useContext(ToastContext);
    const classes = useStyles();

    const dispatch = useDispatch();

    useEffect(() => {
        orders();
    }, []);

    const orders = (start_date = null, end_date = null) => {
        dispatch(toggle());
        getOrders({ start_date, end_date })
            .then(res => {
                dispatch(toggle());
                setOrderList([...res.data.orders]);
            })
            .catch(err => {
                dispatch(toggle());
                toast.error(err.response.data.error, toastOptions)
            });
    }
    const loadOrders = (data) => {

        let order = orderList.find(item => item.id == data.orderID);
        order.reason = data.reason;

    }
    const dateChange = (data) => {
        onChange(data);
        if (data && data.length > 0) {
            let start_date = DateStringFormater(data[0]);
            let end_date = new Date(data[1]).toISOString().slice(0, 10);
            orders(start_date, end_date);
        } else {
            orders();
        }
    }
    return (
        <div>
            <div className={classes.DateRanger}>
                <DateRangePicker onChange={dateChange} value={value} className={classes.DateRangerField} />
            </div>
            <TableList orders={orderList} recordUpdate={(data) => loadOrders(data)} />
        </div >
    )
}
