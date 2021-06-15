import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover';
import Form from '../../../components/RestaurantPanel/Offer/Form';
export default function AddOffer() {
    return (
        <div>
            <PageheadTitle title={'OFFER'} />
            <CardCover>
                <Form></Form>
            </CardCover>
        </div>
    )
}
