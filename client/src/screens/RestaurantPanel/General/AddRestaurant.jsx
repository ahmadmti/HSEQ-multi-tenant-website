import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import Form from '../../../components/RestaurantPanel/General/Form';
export default function AddRestaurant() {
    return (
        <div>
            <PageheadTitle title={'Create Restaurant'} />
            <Form />
        </div>
    )
}