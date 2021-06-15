import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import ViewIngredientCategoryTable from '../../../components/RestaurantPanel/Menu/ViewIngredientCategoryTable';
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover'

export default function ViewIngredientCategory() {
    return (
        <div>
            <PageheadTitle title={"INGREDIENTS CATEGORY INFORMATION"} />
            <CardCover>
            <ViewIngredientCategoryTable />
            </CardCover>
        </div>
    )
}
