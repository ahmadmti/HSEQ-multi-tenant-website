import React, { useEffect } from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover'
import DatePickers from '../../../components/RestaurantPanel/Dashboard/DateFilter'
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SaleComponent from '../../../components/RestaurantPanel/Dashboard/SaleComponent';
import AssignmentComponent from '../../../components/RestaurantPanel/Dashboard/AssignmentComponent';
import SoldArticleChart from '../../../components/RestaurantPanel/Dashboard/SoldArticles';
import OrderHistory from '../../../components/RestaurantPanel/Dashboard/OrderHistory';
import ReservationComponent from '../../../components/RestaurantPanel/Dashboard/ReservationComponent';
import ResturantInformation from '../../../components/RestaurantPanel/Dashboard/ResturantInformation'
import { getAssignments, getTotalSales } from '../../../api/api';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import SaleChart from '../../../components/RestaurantPanel/Dashboard/SaleChart';
import AssignmentComponentChart from '../../../components/RestaurantPanel/Dashboard/AssignmentComponentChart'
import ComponentTitle from '../../../components/RestaurantPanel/Dashboard/ComponentTitle';
// const useStyles = makeStyles((theme) => ({
//     DateRanger: {
//         margin: "10px 0",
//         textAlign: "right"
//     },
//     DateRangerField: {
//         border: "1px solid #eee",
//         borderRadius: "4px"
//     }
// }));

export default function ResturantDashboard() {
    const [data, setData] = React.useState({});

    const [totalSale, setTotalSale] = React.useState({});
    const [value, onChange] = React.useState([new Date(), new Date()]);
    useEffect(() => {
        getAssignments().then((res) => {

            setData(res.data)
        }).catch((err) => {

        })

    }, [])
    const dateChange = (data) => {
        onChange(data);
        // console.log(data);
        if (data && data.length > 0) {
            let start_date = new Date(data[0]).toISOString().slice(0, 10);
            let end_date = new Date(data[1]).toISOString().slice(0, 10);

            getTotalSales({ start_date, end_date }).then((res) => {
                // console.log(res.data,"sales")

                setTotalSale(res.data)
            });
        } else {
            // orders();
        }
    }
    return (
        <div>
            <PageheadTitle title={'statistics'} />
            <CardCover>
                <Grid container spacing={3} >
                    <Grid item md={6} sm={6} xs={12} >
                    </Grid>

                    <Grid item md={6} sm={6} xs={12} >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}>
                            <DateRangePicker onChange={dateChange} value={value} />
                        </div>
                    </Grid>

                    <Grid item md={7} sm={6} xs={12} >
                        <ComponentTitle title={"Sales"} />
                        <div style={{ display: 'flex' }}>
                            <Grid item md={4} sm={6} xs={12} >
                                <SaleComponent data={data} totalSale={totalSale} />
                            </Grid>
                            <Grid item md={8} sm={6} xs={12} >
                                <SaleChart data={totalSale} />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item md={5} sm={6} xs={12} >
                        <ComponentTitle title={"SOLD ARTICLES"} />
                        <SoldArticleChart data={totalSale} />
                    </Grid>


                    <Grid item md={7} sm={6} xs={12} >
                        <ComponentTitle title={"Assignments"} />
                        <div style={{ display: 'flex' }}>
                            <Grid item md={4} sm={6} xs={12} >
                                <AssignmentComponent data={data} />
                            </Grid>
                            <Grid item md={8} sm={6} xs={12} >
                                <AssignmentComponentChart data={totalSale} />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item md={5} sm={6} xs={12} >
                        <ComponentTitle title={"ORDER HISTORY"} />
                        <OrderHistory data={totalSale} />
                    </Grid>





                    {/* <Grid item md={7} sm={6} xs={12} >
                        <ReservationComponent />
                    </Grid> */}

                    <Grid item md={5} sm={6} xs={12} >
                        <ResturantInformation data={data} />
                    </Grid>




                </Grid>
            </CardCover>
        </div >
    )
}