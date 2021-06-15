import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import DataTable from '../../../components/RestaurantPanel/Report/FinancialReport';
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover'
export default function FinancialReport() {
    return (
        <React.Fragment>
            <PageheadTitle title={"Financial Report"} />
            <CardCover>
               <DataTable />
            </CardCover>
        </React.Fragment>
    );
}
