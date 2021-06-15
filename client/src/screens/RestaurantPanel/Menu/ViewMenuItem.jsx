import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import ViewItemTable from '../../../components/RestaurantPanel/Menu/ViewItemTable';
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover'

export default function ViewMenuItem() {

    return (
        <React.Fragment>
            <PageheadTitle title={'Items Information'} />
            <CardCover>
            <ViewItemTable />
            </CardCover>
        </React.Fragment>
    )
}
