import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import AddIngredientsForm from '../../../components/RestaurantPanel/Menu/AddIngredientsForm';

export default function AddMenuIngredients() {
    return (
        <React.Fragment>
            <PageheadTitle title={'CREATE INGREDIENTS'} />
            <AddIngredientsForm />
        </React.Fragment>
    )
}
