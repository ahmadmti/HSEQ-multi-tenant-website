import React, { useContext } from 'react'
import { Box } from '@material-ui/core';
import MiniDrawer from '../../components/CompanyPanel/SharedComponent/SideBar.jsx';
import CompanyRoutes from '../../router/CompanyPanel';
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/css/jquery.dataTables.min.css";

import "datatables.net/js/jquery.dataTables";
import './style.css';
import CompanyContext from '../../context/CompanyContext';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

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

    return (
        <div className="wrapper" style={{ display: "block" }}>
            <div className="wrapper__box">
                <Box component="div" className="box__content">
                    <MiniDrawer>
                        <CompanyRoutes />
                    </MiniDrawer>
                </Box>
            </div>

        </div>
    )
}
