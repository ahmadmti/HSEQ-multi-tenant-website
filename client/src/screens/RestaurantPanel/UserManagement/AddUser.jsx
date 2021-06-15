import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import Form from '../../../components/RestaurantPanel/UserManagement/AddUser';
export default function AddUser() {
    return (
        <div>
            <PageheadTitle title={'CREATE USERS'} />
        
                <Form></Form>
        
        </div>
    )
}
