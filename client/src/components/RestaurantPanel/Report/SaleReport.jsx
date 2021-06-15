import React, { useEffect, useRef } from "react";
import $ from "jquery";
import { DateStringFormater } from '../../../helper/helper';

import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { getOrderReport, } from '../../../api/api';
import { useReactToPrint } from 'react-to-print';
import { Grid, Button } from "@material-ui/core";
import PrintTableList from "./SalesReportPrint";
import OrderDetailModal from './OrderDetailModal';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles((theme) => ({
  headCover: {
    paddingBottom: "20px",
  },
  p: {
    flexGrow: 1,
  },
  pading: {
    marginBottom: "20px",
  },
  DateRanger: {
    margin: "10px 0",
    textAlign: "right"
  },
  DateRangerField: {
    border: "1px solid #eee",
    borderRadius: "4px",
    height: "43px",
  },
  height: {
    minheight: "380px",
  }
}));
export default function TableList() {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [editModal, setEditModal] = React.useState(false);
  const [orderData, setOrderData] = React.useState([]);
  const [value, onChange] = React.useState([new Date(), new Date()]);
  useEffect(() => {
    getData()


  }, [])
  const getData = (start_date, end_date) => {
    dispatch(toggle())
    getOrderReport({ start_date, end_date })
      .then(res => {
        dispatch(toggle())
        setOrderData([...res.data.data]);

      })

      .catch(err => {
        console.log(err);
      })
  }
  // console.log(startDate, "start",endDate,"end");

  const dateChange = (data) => {
    onChange(data);
    if (data && data.length > 0) {
      let start_date = DateStringFormater(data[0]);
      let end_date = new Date(data[1]).toISOString().slice(0, 10);
      setStartDate(start_date);
      setEndDate(end_date);
      getData(start_date, end_date);
    } else {
      getData();
    }

  }


  const Print = (data) => {
    setEditModal(true)
  }

  return (
    <div className={classes.height}>
      <div className={classes.headCover}>
        <Grid container spacing={3}>
          <Grid item md={12} sm={12} xs={12}>
            <div className={classes.DateRanger}>
              <DateRangePicker onChange={dateChange} value={value} className={classes.DateRangerField} />
            </div>
          </Grid>
        </Grid>
      </div>

      <Divider className={classes.pading} />
      <div>
        <Button onClick={Print} variant="contained" color="primary">
          {t("Print")}
        </Button>
      </div>
      <div className="table-responsive">
        <table id="category_table" className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>{t('Sr.#')}</th>
              <th>{t("Customer")}</th>
              <th>{t("Total_Price")}</th>
              <th>{t("VAT_Amount")}</th>
              <th>{t("Discount")}</th>
              <th>{t("Delivery_Charges")}</th>
              <th>{t("Order_Date")}</th>

            </tr>
          </thead>
          <tbody>
            {
              orderData.length > 0 ?
                orderData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.customer_name ? item.customer_name : t('Walking_Customer')}</td>
                      <td>{((item.total_price - item.discount) + item.delivery_charges)}</td>
                      <td>{item.vat_amount}</td>
                      <td>{item.discount}</td>
                      <td>{item.delivery_charges}</td>
                      <td>{new Date(item.order_date).toLocaleDateString()}</td>



                    </tr>
                  );
                })
                :
                <tr>
                  <td colSpan="9" className="text-center">{t("sEmptyTable")}</td>
                </tr>
            }
          </tbody>
        </table>
      </div>
      <OrderDetailModal title={t("Print")} open={editModal} close={() => setEditModal(false)}>
        <PrintTableList orderData={orderData} startDate={startDate} endDate={endDate} />
      </OrderDetailModal>
    </div>
  );
}
