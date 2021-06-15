import React, { useContext } from 'react'
import { Box } from '@material-ui/core';
import MiniDrawer from '../../components/RestaurantPanel/SharedComponent/SideBar.jsx';
import RestaurantRoutes from '../../router/RestaurantPanel';
import * as $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/css/jquery.dataTables.min.css";

import "datatables.net/js/jquery.dataTables";
import './style.css';
import io from "socket.io-client";
import CompanyContext from '../../context/CompanyContext';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { order } from '../../actions/pacerActions';
import { changeLang } from '../../api/api'

export default function Main() {

    const company = useContext(CompanyContext);
    const dispatch = useDispatch();

    let toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    React.useEffect(() => {

        const socket = io('http://pizzareborn.geeklone.com:8000');
        socket.emit('join', company.domain);

        socket.on('order-receive', (orderdata) => {
            console.log(orderdata, 'New Order');
            toast.warn('🦄 New Order Received From Piko Pako ', toastOptions);
            dispatch(order(orderdata))
        });


        changeLang(localStorage.getItem('default_lang') || 'de')
            .then(res => console.log(res))
            .catch(error => console.log(error))




        return () => {
            socket.emit('disconnect_user');
        }
    }, [])

    return (
        <div className="wrapper" style={{ display: "block" }}>
            <div className="wrapper__box">
                <Box component="div" className="box__content">
                    <MiniDrawer>
                        <RestaurantRoutes />
                    </MiniDrawer>
                </Box>
            </div>

        </div>
    )
}
