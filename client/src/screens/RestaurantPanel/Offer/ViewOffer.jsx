import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover';
import TableList from '../../../components/RestaurantPanel/Offer/TableList'
export default function ViewOffer() {
    return (
        <div>
            <PageheadTitle title={'ALL OFFERS'} />
            <CardCover>
             <TableList></TableList>
            </CardCover>
        </div>
    )
}
