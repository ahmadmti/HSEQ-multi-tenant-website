import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover';
import TableList from '../../../components/RestaurantPanel/UserManagement/ViewUser'
export default function ViewUser() {
    return (
        <div>
            <PageheadTitle title={'VIEW USERS'} />
            <CardCover>
             <TableList></TableList>
            </CardCover>
        </div>
    )
}
