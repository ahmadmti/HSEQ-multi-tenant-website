import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import ViewIngredientsTable from '../../../components/RestaurantPanel/Menu/ViewIngredientsTable';
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover'


export default function ViewMenuIngredients() {
    return (
        <div>
            <PageheadTitle title={'INGREDIENTS INFORMATION'} />
            <CardCover>
            <ViewIngredientsTable />
            </CardCover>
        </div>
    )
}
