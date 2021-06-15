import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import CustomerTable from '../../../components/RestaurantPanel/Customer/CustomerTable';
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover'

export default function ViewCustomer() {
    return (
        <div >
            <PageheadTitle title={"CUSTOMER INFORMATION"} />
            <CardCover >
              <CustomerTable />
            </CardCover>
        </div>
    )
}
