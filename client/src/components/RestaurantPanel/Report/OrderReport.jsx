import React, { useEffect } from "react";
import $ from "jquery";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import DatePickers from "./DateFilter";
import Divider from "@material-ui/core/Divider";
import { getOrderReport, customers, getAllUsers, getOrderDetail } from '../../../api/api'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import VisibilityIcon from '@material-ui/icons/Visibility';
import OrderDetailModal from './OrderDetailModal';
import OrderReportView from './OrderReportView';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';
import { useTranslation } from 'react-i18next';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm, Controller } from "react-hook-form";
import { DateStringFormater } from '../../../helper/helper';

import {

  Grid,
  Button,
  TextField,

} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  headCover: {
    paddingBottom: "20px",
  },
  filters: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  p: {
    flexGrow: 1,
  },
  pading: {
    marginBottom: "20px",
  }, DateRanger: {
    margin: "7px 0",

    textAlign: "right"
  },
  DateRangerField: {
    height: "43px",
    border: "1px solid #eee",
    borderRadius: "4px"
  },
  height: {
    height: "380px",
    overflow: "scroll"
  }
}));
export default function TableList() {
  const classes = useStyles();
  useEffect(() => {
    getCustomers();
    users();
    onSubmit()
  }, [])
  const { register, reset, formState: { isValid }, setValue, control, handleSubmit, errors } = useForm({
    mode: "all",
    reValidateMode: "all",
    shouldUnregister: true
  });
  const [customerList, setCustomerList] = React.useState([]);
  const [user, setUser] = React.useState([]);
  const users = () => {
    dispatch(toggle())
    getAllUsers()
      .then(res => {
        dispatch(toggle())
        setUser([...res.data.users]);
        console.log(res);
      })
      .catch(err => {
        dispatch(toggle())
        console.log(err);

      })
  }
  const getCustomers = () => {
    dispatch(toggle())
    customers()
      .then(res => {
        dispatch(toggle())
        console.log(res)
        setCustomerList([...res.data.customers])
      })
      .catch(err => {
        dispatch(toggle())
        console.log(err)
      })
  }
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState({});
  const [value, onChange] = React.useState([new Date(), new Date()]);
  const [editRow, setEditRow] = React.useState({});
  const orderDetail = (order_id) => {
    dispatch(toggle())
    getOrderDetail(order_id)
      .then(res => {
        dispatch(toggle())
        setOrder({ ...res.data.order })
        // setEditRow({ ...item });
        setEditModal(true)

      })
      .catch(err => {
        dispatch(toggle())
        console.log(err);
      })
  }

  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  console.log(startDate, endDate)
  const [editModal, setEditModal] = React.useState(false);
  const view = (item) => {
    setEditRow({ ...item });
    setEditModal(true)
  }


  const dateChange = (data) => {
    onChange(data);
    if (data && data.length > 0) {
      var start_date = DateStringFormater(data[0]);
      var end_date = new Date(data[1]).toISOString().slice(0, 10);
      setStartDate(start_date)
      setEndDate(end_date)


    } else {

    }

  }
  const [orderData, setOrderData] = React.useState([]);
  const onSubmit = (data) => {
    // console.log(data)
    // {startDate,endDate},
    if (startDate && endDate) {
      data.start_date = startDate
      data.end_date = endDate
    }


    dispatch(toggle())
    getOrderReport(data)
      .then(res => {
        dispatch(toggle())
        setOrderData([...res.data.data]);

      })
      .catch(err => {
        dispatch(toggle())
        console.log(err);

      })
  }
  const search = (start_date, end_date) => {

  }

  return (
    <div className={classes.height}>
      <div className={classes.headCover}>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Grid container spacing={3}>
            <Grid item md={4} sm={3} xs={12}>
              <div className={classes.DateRanger}>
                <DateRangePicker onChange={dateChange} value={value} className={classes.DateRangerField} />
              </div>
            </Grid>

            <Grid item md={3} sm={3} xs={12}>
              <FormControl style={{ width: "100%" }} margin="dense" variant="outlined">
                <InputLabel id="select-label">{t('user')} </InputLabel>
                <Controller
                  name="user_id"
                  as={<Select
                    defaultValue=""
                    labelId="demo-simple-select-outlined-label"
                    id="user_id"

                  // label={t('selectSize.label')}
                  >
                    {
                      user.map((users, index) => {
                        return (
                          <MenuItem key={index} value={users.id}>{users.fname}</MenuItem>
                        );
                      })
                    }
                  </Select>}
                  control={control}
                  defaultValue=""

                />

              </FormControl>
            </Grid>
            <Grid item md={3} sm={3} xs={12}>
              <FormControl style={{ width: "100%" }} margin="dense" variant="outlined">
                <InputLabel id="select-label">{t('customer')} </InputLabel>

                <Controller
                  name="customer_id"
                  as={<Select
                    defaultValue=""
                    labelId="demo-simple-select-outlined-label"
                    id="customer_id"

                  // label={t('selectSize.label')}
                  >
                    {
                      customerList.map((customer, index) => {
                        return (
                          <MenuItem key={index} value={customer.id}>{customer.name}</MenuItem>
                        );
                      })
                    }
                  </Select>}
                  control={control}
                  defaultValue=""

                />
              </FormControl>
            </Grid>
            <Grid item md={2} sm={3} xs={12} style={{ display: "flex", alignItems: "center" }}>
              <Button onClick={search()} variant="contained" color="primary" type="submit">
                {t("find")}
              </Button>
            </Grid>

          </Grid>
        </form>
      </div>
      <Divider className={classes.pading} />
      <div className="table-responsive">
        <table id="category_table" className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>{t('Sr.#')}</th>
              <th>{t("Customer")}</th>
              <th>{t("Total_Price")}</th>
              <th>{t("VAT_Amount")}</th>
              <th>{t("Discount")}</th>

              <th>{t("Order_Date")}</th>
              <th>{t("Delivery_Charges")}</th>
              <th>{t("CANCELLATION_REASON")}</th>
              <th>{t("Action")}</th>
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

                      <td>{((item.total_price + item.delivery_charges) - item.discount)}</td>
                      <td>{item.vat_amount}</td>
                      <td>{item.discount}</td>
                      <td>{new Date(item.order_date).toLocaleDateString()}</td>
                      <td>{item.delivery_charges}</td>
                      <td>{item.reason}</td>


                      <td>
                        <ButtonGroup size="small" variant="contained">
                          <Button color="primary" onClick={() => orderDetail(item.id)}> <VisibilityIcon /> </Button>

                        </ButtonGroup>
                      </td>
                    </tr>
                  );
                })

                :
                <tr>
                  <td colSpan="9" className="text-center">{t("sEmptyTable")}</td>
                </tr>
            }

          </tbody>
          <OrderDetailModal title={t("Print")} open={editModal} close={() => setEditModal(false)}>
            <OrderReportView order={order} />
          </OrderDetailModal>
        </table>
      </div>
    </div>
  );
}
