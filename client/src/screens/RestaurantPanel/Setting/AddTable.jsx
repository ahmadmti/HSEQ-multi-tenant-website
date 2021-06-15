import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import AddTableForm from '../../../components/RestaurantPanel/Setting/AddTableForm';

export default function AddTable() {
    return (
        <div>
            <PageheadTitle title={"CREATE TABLE"} />
            <AddTableForm />
        </div>
    )
}
