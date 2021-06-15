import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover';
import ViewOrder from '../../../components/RestaurantPanel/Orders/ViewOrder';

export default function ViewOrders() {
    return (
        <div>
            <PageheadTitle title={'All Orders'} />
            <CardCover>
                <ViewOrder />
            </CardCover>
        </div>
    )
}
