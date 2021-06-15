import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import ReservationTableList from '../../../components/RestaurantPanel/Setting/ReservationTableList'
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover'

export default function ViewReservations() {
    return (
        <div>
            <PageheadTitle title={"TABLES RESERVATION INFORMATION"} />
            <CardCover>
            <ReservationTableList />
            </CardCover>
        </div>
    )
}
