import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import AddItemForm from '../../../components/RestaurantPanel/Menu/AddItemForm';

export default function AddMenuItem() {
    return (
        <React.Fragment>
            <PageheadTitle title={"Create Item"} />
            <AddItemForm />
        </React.Fragment>
    )
}
