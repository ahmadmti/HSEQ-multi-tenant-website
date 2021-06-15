import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import TableReservationForm from '../../../components/RestaurantPanel/Setting/TableReservationForm';

export default function NewTableReservation() {
    return (
        <div>
            <PageheadTitle title={"CREATE TABLES RESERVATION"} />
            <TableReservationForm />
        </div>
    )
}
