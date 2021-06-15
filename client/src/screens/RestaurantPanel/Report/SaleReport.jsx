import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import TableList from '../../../components/RestaurantPanel/Report/SaleReport'
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover';

export default function SaleReport() {
    return (
        <React.Fragment>
            <PageheadTitle title={"Sales Report"} />
            <CardCover>
            <TableList />
            </CardCover>
        </React.Fragment>
    );
}
