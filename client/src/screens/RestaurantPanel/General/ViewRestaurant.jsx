import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import TableList from '../../../components/RestaurantPanel/General/TableList';
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover'

export default function ViewGeneral() {
    return (
        <React.Fragment>
            <PageheadTitle title={"RESTAURANT INFORMATION"} />
            <CardCover>
            <TableList />
            </CardCover>
        </React.Fragment>
    );
}
