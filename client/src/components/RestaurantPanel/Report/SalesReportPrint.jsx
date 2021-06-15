import React, { useEffect, useContext, useRef } from "react";
import $ from "jquery";
import { useReactToPrint } from 'react-to-print';
import { makeStyles } from "@material-ui/core/styles";
import CompanyContext from '../../../context/CompanyContext';
import { Grid, Button } from "@material-ui/core";
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
    height: "100vh",
    padding: "20px",
  },
  head: {
    padding: "10px",
    // float: "right",
    fontWeight: "bold"
  },
  headAdrees: {
    textAlign: "center"
  }
}));

const PrintTableList = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const componentRef = useRef();
  const company = useContext(CompanyContext);
  const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10))
  const [time, seTime] = React.useState(() => {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    return (h + ":" + m + ":" + s);
  })

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    handlePrint();
  }, [])
  return (
    <div className={classes.height} ref={componentRef}>
      <Grid container spacing={3}>
        {/* <Grid item md={12} sm={12} xs={12}> */}
        <Grid item md={4} sm={4} xs={4}>

        </Grid>
        <Grid item md={4} sm={4} xs={4}>

        </Grid>
        <Grid item md={4} sm={4} xs={4}>
          <div className={classes.head}  >
            <span>{t('date')}</span>
            {
              props.startDate && props.endDate ?
                <p><span>{props.startDate}</span> To <span>{props.endDate}</span></p>
                :
                <p><span>{date}</span></p>

            }
          </div>
        </Grid>

      </Grid>
      {/* </Grid> */}



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
            props.orderData.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.customer_name ? item.customer_name : t('Walking_Customer')}</td>

                  <td>{item.total_price}</td>
                  <td>{item.vat_amount}</td>
                  <td>{item.discount}</td>
                  <td>{item.delivery_charges}</td>
                  <td>{new Date(item.order_date).toLocaleDateString()}</td>



                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div >
  );
}
export default PrintTableList;