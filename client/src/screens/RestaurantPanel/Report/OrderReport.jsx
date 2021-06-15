import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import TableList from '../../../components/RestaurantPanel/Report/OrderReport';
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover';
export default function OrderReport() {
    return (
        <React.Fragment>
            <PageheadTitle title={"Orders Report"} />
            <CardCover>
                <TableList />
            </CardCover>
        </React.Fragment>
    );
}
