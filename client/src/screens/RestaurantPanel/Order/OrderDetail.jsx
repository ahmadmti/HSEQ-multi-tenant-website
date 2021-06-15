import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover';
import DataTable from '../../../components/RestaurantPanel/Orders/OrderDetail';

export default function OrderDetail() {
    return (
        <div>
            <PageheadTitle title={'ORDERING INFORMATION'} />
            <CardCover>
                <DataTable />
            </CardCover>
        </div>
    )
}
