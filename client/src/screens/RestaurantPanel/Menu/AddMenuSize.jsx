import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import AddMenuSizeForm from '../../../components/RestaurantPanel/Menu/AddMenuSizeForm';
export default function AddMenuSize() {
    return (
        <div>
            <PageheadTitle title={'Create Size'} />
            <AddMenuSizeForm />
        </div>
    )
}
