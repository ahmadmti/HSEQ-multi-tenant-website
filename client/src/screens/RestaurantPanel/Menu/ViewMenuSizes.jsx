import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import ViewMenuSizesTable from '../../../components/RestaurantPanel/Menu/ViewMenuSizesTable';
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover'

export default function ViewMenuSizes() {
    return (
        <div>
            <PageheadTitle title={'ITEM SIZE INFORMATION'} />
            <CardCover>
            <ViewMenuSizesTable />
            </CardCover>
        </div>
    )
}
