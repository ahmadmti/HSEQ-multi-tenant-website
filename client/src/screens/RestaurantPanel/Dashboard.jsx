import React from 'react'
import { Box } from '@material-ui/core';
import './style.css';
import MiniDrawer from '../../components/RestaurantPanel/SharedComponent/SideBar.jsx';

export default function Main() {


    return (
        <div className="wrapper">
            <div className="wrapper__box">
                <Box component="div" className="box__content">
                    <MiniDrawer>
                        <h1>DashBorad</h1>
                    </MiniDrawer>
                </Box>
            </div>

        </div>
    )
}
