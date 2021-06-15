import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import ViewBonusPointTable from '../../../components/RestaurantPanel/Bonus/ViewBonusPointTable';
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover';


export default function ViewBonusPoint() {
    return (
        <div>
            <PageheadTitle title={"All SLABS"} />
            <CardCover>
                <ViewBonusPointTable />
            </CardCover>
        </div>
    )
}
