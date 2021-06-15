import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import Index from '../../../components/RestaurantPanel/PikoPakoOrder/index';
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover';
export default function PikoPakoOrderDetail() {
    return (
        <React.Fragment>
            <CardCover>
                <Index />
            </CardCover>
        </React.Fragment>
    );
}
