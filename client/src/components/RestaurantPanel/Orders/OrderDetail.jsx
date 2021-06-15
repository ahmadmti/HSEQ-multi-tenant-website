import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import { useParams } from 'react-router-dom';
import { getOrderDetail, orderVat } from '../../../api/api';
import OrderView from '../Report/OrderReportView';

const useStyles = makeStyles((theme) => ({
  headCover: {
    paddingBottom: "20px",
  },

}));

export default function OrderDetail(props) {
  let { order_id } = useParams();
  const classes = useStyles();
  const [order, setOrder] = React.useState({});
  const [orderVatData, setOrderVat] = React.useState([]);

  useEffect(() => {
    orderDetail(order_id);
    getOrderVat(order_id)
  }, [])

  const getOrderVat = (id) => {
    orderVat(id).then(res => {
      setOrderVat([...res.data.orderVat])
    })
      .catch(err => {
        console.log(err);
      })
  }
  const orderDetail = (order_id) => {
    getOrderDetail(order_id)
      .then(res => {
        setOrder({ ...res.data.order })
      })
      .catch(err => {

      })
  }

  return (

    <div>
      <OrderView order={order} orderVat={orderVatData} />
    </div>
  );
}