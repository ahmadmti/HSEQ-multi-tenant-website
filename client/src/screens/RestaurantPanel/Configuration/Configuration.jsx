import React from 'react'
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover';
import Divider from '@material-ui/core/Divider';
import RestaurantDetail from '../../../components/RestaurantPanel/Configuration/RestaurantDetail';
import Payment from '../../../components/RestaurantPanel/Configuration/Payment';



export default function Configuration() {
    return (
        <div>
            <CardCover>
                <RestaurantDetail />
                {/* <Divider variant="middle" /> */}
                <Payment />
            </CardCover>
        </div>
    )
}
