import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import Form from '../../../components/RestaurantPanel/Category/Form';


export default function AddCategory() {
    return (
        <React.Fragment>
            <PageheadTitle title={"Create Category"} />
            <Form />
        </React.Fragment>
    );
}
