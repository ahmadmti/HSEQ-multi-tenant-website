import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover';
import TableList from '../../../components/RestaurantPanel/UserManagement/ViewRole'
export default function ViewRole() {
    return (
        <div>
            <PageheadTitle title={'USER ROLES'} />
            <CardCover>
             <TableList></TableList>
            </CardCover>
        </div>
    )
}
