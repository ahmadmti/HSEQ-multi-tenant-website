import React from 'react'
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover';
import Invoice from '../../../components/RestaurantPanel/Invoice/Index';

export default function CreateInvoice(props) {

    return (
        <div>
            <CardCover>
                <Invoice />
            </CardCover>
        </div>
    )
}
