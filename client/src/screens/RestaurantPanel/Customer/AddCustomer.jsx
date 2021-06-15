import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import AddCustomerForm from '../../../components/RestaurantPanel/Customer/AddCustomerForm';

export default function AddCustomer() {
    return (
        <div>
            <PageheadTitle title={"Create Customer"} />
            <AddCustomerForm />
        </div>
    )
}
