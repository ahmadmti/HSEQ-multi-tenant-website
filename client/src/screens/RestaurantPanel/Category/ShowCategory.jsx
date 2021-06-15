import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import TableList from '../../../components/RestaurantPanel/Category/TableList';
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover'


export default function AddCategory() {
    return (
        <React.Fragment>
            <PageheadTitle title={"categories information"} />
            <CardCover>
            <TableList />
            </CardCover>
        </React.Fragment>
    );
}
