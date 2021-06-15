import React, { useEffect, useContext, useRef } from "react";

import { makeStyles } from '@material-ui/core/styles';
import { getFinancialReport, } from '../../../api/api';
import Divider from "@material-ui/core/Divider";
import FinancialReportPrint from "./FinancialReportPrint";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { useReactToPrint } from 'react-to-print';
import CompanyContext from '../../../context/CompanyContext';
import { DateStringFormater } from '../../../helper/helper';
import {
  Button,
  Grid,

} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';
import { useTranslation } from 'react-i18next';
import { camelize } from '../../../helper/helper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
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
  tableHeader: {
    padding: "10px",
  },
  GrossValue: {
    padding: "10px",
  }, DateRanger: {
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
  }
}));

export default function DataTable() {
  const classes = useStyles();
  const [credit_orders, setCreditOrders] = React.useState([]);
  const [cash_orders, setData] = React.useState([]);
  const [grossTotal, setGrossTotal] = React.useState({});
  const [credit_orders_sum, setCreditOrdersSum] = React.useState({});
  const [orderReturn, setOrderReturn] = React.useState({});
  const [orders_groupby_vat, setOrdersGroupbyVat] = React.useState([]);
  const [orders_groupby_vat_sum, setOrdersGroupbyVatSum] = React.useState({});
  const [print_date, setPrintDate] = React.useState("");
  const [randomInvoice, setRandomInvoiceNumber] = React.useState("");
  const [start_date, setDate] = React.useState("");
  const [end_date, setEndDate] = React.useState("");
  const [vatSum, set_total] = React.useState(0);
  const [credit_vat, setcredit_vat_sum] = React.useState(0);
  const [editModal, setEditModal] = React.useState(false);
  const [cashActual, setActualCashPrice] = React.useState(0);
  const [creditActual, setActualCreditPrice] = React.useState(0);
  const [passProp, setProp] = React.useState([]);
  const { t } = useTranslation();
  const dispatch = useDispatch();


  const [value, onChange] = React.useState([new Date(), new Date()]);
  const getData = (start_date, end_date) => {
    getFinancialReport({ start_date, end_date })
      .then(res => {
        setProp(res.data)
        const min = 1;
        const max = 1000;
        const rand = min + Math.random() * (max - min);
        setRandomInvoiceNumber(rand.toFixed(0));
        setPrintDate(res.data.print_date)
        setOrdersGroupbyVatSum(res.data.orders_groupby_vat_sum)
        setOrdersGroupbyVat(res.data.orders_groupby_vat);
        setCreditOrders(res.data.credit_orders);
        setData(res.data.cash_orders);
        setGrossTotal(res.data.cash_orders_sum);
        setOrderReturn(res.data.cash_orders_return);
        setCreditOrdersSum(res.data.credit_orders_sum)
        calc_total(res.data.cash_orders, res.data.credit_orders)

      })
      .catch(err => {
        console.log(err);
      })
  }


  const calc_total = (array1, array2) => {
    let vat_sum = 0
    array1.forEach(item => {
      vat_sum = parseFloat(vat_sum) + parseFloat(item.total_amount - item.total_amount / (item.vat_percentage + 100) * 100)
    });
    set_total(vat_sum)

    let credit_vat_sum = 0
    array2.forEach(item => {
      credit_vat_sum = parseFloat(credit_vat_sum) + parseFloat(item.total_price - item.total_price / (item.vat_percentage + 100) * 100)
    });
    setcredit_vat_sum(credit_vat_sum)



    let total_vat_sum = 0
    array1.forEach(item => {
      total_vat_sum = parseFloat(total_vat_sum) + parseFloat(item.total_amount - (item.total_amount - item.total_amount / (item.vat_percentage + 100) * 100))
    });

    setActualCashPrice(total_vat_sum)

    let tota_credit_vat_sum = 0
    array2.forEach(item => {
      tota_credit_vat_sum = parseFloat(tota_credit_vat_sum) + parseFloat(item.total_price - (item.total_price - item.total_price / (item.vat_percentage + 100) * 100))
    });

    setActualCreditPrice(tota_credit_vat_sum)

  }


  const dateChange = (data) => {
    onChange(data);
    if (data && data.length > 0) {
      // 2021 - 05 - 07T19: 00: 00.000Z
      let start_date = DateStringFormater(data[0]);
      let end_date = new Date(data[1]).toISOString().slice(0, 10);
      getData(start_date, end_date);
      setDate(new Date(data[0]).toLocaleDateString())
      setEndDate(new Date(data[1]).toLocaleDateString())

    } else {
      getData();
    }

  }
  const componentRef = useRef();
  const company = useContext(CompanyContext);
  const Print = useReactToPrint({
    content: () => componentRef.current,
  });
  // const Print = (data) => {
  //   setEditModal(true)
  // }
  return (
    <div >
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

      <div className={classes.tableHeader}>
        <div>
          <Button onClick={Print} variant="contained" color="primary" style={{ float: 'right' }}>
            {t("Print")}
          </Button>
        </div>
        <h5> {t("Report_number")}: {randomInvoice}</h5>
        <h6> {start_date} {t("to")} {end_date}</h6>

      </div>
      <div>

        <table className="table table-striped table-bordered"  >
          <thead>
            <tr>
              <th colSpan="12">{t("CASH_REVENUE")}</th>

            </tr>
          </thead>
          <tbody>
            {
              cash_orders.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>  {t(`${camelize(item.order_type.toLowerCase())}`)}</td>
                    <td>{item.vat_percentage}% </td>
                    <td>

                      {
                        parseFloat(item.total_amount - item.total_amount / (item.vat_percentage + 100) * 100).toFixed(3)
                      }

                    </td>
                    <td>aus </td>
                    <td>
                      {
                        parseFloat(item.total_amount - (item.total_amount - item.total_amount / (item.vat_percentage + 100) * 100)).toFixed(3)
                      }
                    </td>
                    <td>{item.count} {t('bills')}</td>
                    <td>=</td>
                    <td>{item.total_amount}</td>
                  </tr>
                )
              })
            }

          </tbody>
          <tbody>
            <tr>
              <td className="text-right" colSpan="6">{t("Gross")}</td>
              <td width="40px">=</td>
              <td>{grossTotal.total_price}</td>
            </tr>
            <tr>
              <td colSpan="5"><h6>{t("Cancellations")}</h6></td>
              <td>	{orderReturn.count} {t("invoice")}</td>
              <td width="40px">=</td>
              <td>	{orderReturn.sum}</td>
            </tr>

          </tbody>
          <thead>
            <tr>
              <th colSpan="6">{t("CREDIT_PAYMENTS")}</th>

            </tr>
          </thead>
          <tbody>
            {
              credit_orders.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{t(`${camelize(item.order_type.toLowerCase())}`)}</td>
                    <td>{item.vat_percentage}% </td>
                    <td>
                      {
                        parseFloat(item.total_price - item.total_price / (item.vat_percentage + 100) * 100).toFixed(3)
                      }
                    </td>
                    <td>aus</td>
                    <td>
                      {
                        parseFloat(item.total_price - (item.total_price - item.total_price / (item.vat_percentage + 100) * 100)).toFixed(3)
                      }
                    </td>
                    <td>{item.count} {t('bills')}</td>
                    <td>=</td>
                    <td>{item.total_price}</td>
                  </tr>
                )
              })
            }

          </tbody>
          <tbody>
            <tr>
              <td className="text-right" colSpan="6">{t("Gross")}</td>
              <td width="40px">=</td>
              <td>{credit_orders_sum.total_price}</td>
            </tr>
            <tr>
              <td className="text-left" colSpan="6">{t("Total_net")}</td>
              <td width="40px">=</td>
              <td>{(cashActual + creditActual).toFixed(3)}</td>
            </tr>
            <tr>
              <td className="text-left" colSpan="6">{t("Total_VAT")}</td>
              <td width="40px">=</td>
              <td>{(vatSum + credit_vat).toFixed(3)} </td>

            </tr>
            <tr>
              <td className="text-left" colSpan="6">{t("Total_gross")}</td>
              <td width="40px">=</td>
              <td>{((cashActual + creditActual) + (vatSum + credit_vat)).toFixed(3)}</td>
            </tr>


          </tbody>
          <thead>
            <tr>
              <th colSpan="8">{t("Z-report")}</th>

            </tr>
          </thead>
          <thead>
            <tr>
              <th colSpan="3">{t("Document_date")}</th>
              <th colSpan="3">{t("Booking_revenue")}</th>
              <th colSpan="3">{t("Booking_amount")}</th>
            </tr>
          </thead>
          <tbody>
            {
              orders_groupby_vat.map((item, index) => {
                return (
                  <tr key={index}>
                    {
                      item.order_date !=null ? 
                    <td className="text-left" colSpan="3">{new Date(item.order_date).toLocaleDateString()}</td>
                      
                      :<td  colSpan="3"></td> 
                    }
                    <td className="text-left" colSpan="3">{t('sale')} {item.vat_percentage} %</td>
                    <td className="text-left" colSpan="3">{item.total_amount}</td>

                  </tr>
                )
              })
            }
            <tr>
              <td className="text-left" colSpan="6">{t("A_total_of")}</td>

              <td className="text-left" colSpan="2">{orders_groupby_vat_sum.total_amount}</td>
            </tr>
            <tr>

            </tr>
            <tr>
              <td className="text-center" colSpan="8">{t('printDate')} {print_date}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ display: "none" }}>
        <div style={{ padding: 30 }} ref={componentRef} >
          <div className={classes.print} >

            <div style={{
              display: "flex",
              justifyContent: "space-between",
            }}>
              <div>
                <h5>  {t("Report_number")}: {randomInvoice}</h5>
                <h6>{t("financialReports")}</h6>
              </div>
              <div>
                <h1>{company.name}</h1>
              </div>
              <div >
                {
                  start_date && end_date ?
                    <span> {start_date} {t("to")} {end_date}</span>
                    : null
                }

              </div>
            </div>


          </div>
          <table className="table table-striped table-bordered"  >
            <thead>
              <tr>
                <th colSpan="12">{t("CASH_REVENUE")}</th>

              </tr>
            </thead>
            <tbody>
              {
                cash_orders.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{t(`${camelize(item.order_type.toLowerCase())}`)}</td>
                      <td>{item.vat_percentage}% </td>
                      <td>

                        {
                          parseFloat(item.total_amount - item.total_amount / (item.vat_percentage + 100) * 100).toFixed(3)
                        }

                      </td>
                      <td>aus </td>
                      <td>
                        {
                          parseFloat(item.total_amount - (item.total_amount - item.total_amount / (item.vat_percentage + 100) * 100)).toFixed(3)
                        }
                      </td>
                      <td>{item.count} {t('bills')}</td>
                      <td>=</td>
                      <td>{item.total_amount}</td>
                    </tr>
                  )
                })
              }

            </tbody>
            <tbody>
              <tr>
                <td className="text-right" colSpan="6">{t("Gross")}</td>
                <td width="40px">=</td>
                <td>{grossTotal.total_price}</td>
              </tr>
              <tr>
                <td colSpan="5"><h6>{t("Cancellations")}</h6></td>
                <td>	{orderReturn.count} {t("invoice")}</td>
                <td width="40px">=</td>
                <td>	{orderReturn.sum}</td>
              </tr>

            </tbody>
            <thead>
              <tr>
                <th colSpan="6">{t("CREDIT_PAYMENTS")}</th>

              </tr>
            </thead>
            <tbody>
              {
                credit_orders.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{t(`${camelize(item.order_type.toLowerCase())}`)}</td>
                      <td>{item.vat_percentage}% </td>
                      <td>
                        {
                          parseFloat(item.total_price - item.total_price / (item.vat_percentage + 100) * 100).toFixed(3)
                        }
                      </td>
                      <td>aus</td>
                      <td>
                        {
                          parseFloat(item.total_price - (item.total_price - item.total_price / (item.vat_percentage + 100) * 100)).toFixed(3)
                        }
                      </td>
                      <td>{item.count} {t('bills')}</td>
                      <td>=</td>
                      <td>{item.total_price}</td>
                    </tr>
                  )
                })
              }

            </tbody>
            <tbody>
              <tr>
                <td className="text-right" colSpan="6">{t("Gross")}</td>
                <td width="40px">=</td>
                <td>{credit_orders_sum.total_price}</td>
              </tr>
              <tr>
                <td className="text-left" colSpan="6">{t("Total_net")}</td>
                <td width="40px">=</td>
                <td>{(cashActual + creditActual).toFixed(3)}</td>
              </tr>
              <tr>
                <td className="text-left" colSpan="6">{t("Total_VAT")}</td>
                <td width="40px">=</td>
                <td>{(vatSum + credit_vat).toFixed(3)} </td>

              </tr>
              <tr>
                <td className="text-left" colSpan="6">{t("Total_gross")}</td>
                <td width="40px">=</td>
                <td>{((cashActual + creditActual) + (vatSum + credit_vat)).toFixed(3)}</td>
              </tr>


            </tbody>
            <thead>
              <tr>
                <th colSpan="8">{t("Z-report")}</th>


              </tr>
            </thead>
            <thead>
              <tr>
                <th colSpan="3">{t("Document_date")}</th>
                <th colSpan="3">{t("Booking_revenue")}</th>
                <th colSpan="3">{t("Booking_amount")}</th>
              </tr>
            </thead>
            <tbody>
              {
                orders_groupby_vat.map((item, index) => {
                  return (
                    <tr key={index}>

                    {
                      item.order_date ? 
                    <td className="text-left" colSpan="3">{new Date(item.order_date).toLocaleDateString()}</td>
                      
                      :<td  colSpan="3"></td> 
                    }
                      <td className="text-left" colSpan="3">{t('sale')} {item.vat_percentage} %</td>
                      <td className="text-left" colSpan="3">{item.total_amount}</td>

                    </tr>
                  )
                })
              }
              <tr>
                <td className="text-left" colSpan="6">{t("A_total_of")}</td>
                <td className="text-left" colSpan="2">{orders_groupby_vat_sum.total_amount}</td>
              </tr>
              <tr>

              </tr>
              <tr>
                <td className="text-center" colSpan="8">{t('printDate')} {print_date}</td>
              </tr>



            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}