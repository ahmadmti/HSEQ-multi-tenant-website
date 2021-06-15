import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import AddIngredientsCategoryForm from '../../../components/RestaurantPanel/Menu/AddIngredientsCategoryForm';
export default function AddIngredientCategory() {
    return (
        <div>
            <PageheadTitle title={'CREATE INGREDIENTS CATEGORIES'} />
            <AddIngredientsCategoryForm />
        </div>
    )
}
