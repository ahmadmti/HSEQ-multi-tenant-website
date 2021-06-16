import React from 'react'
import PageheadTitle from '../../../components/CompanyPanel/SharedComponent/PageHeadTitle';
import Form from '../../../components/CompanyPanel/UserManagement/AddUser';
export default function AddUser() {
    return (
        <div>
            <PageheadTitle title={'CREATE USERS'} />

            <Form></Form>

        </div>
    )
}
