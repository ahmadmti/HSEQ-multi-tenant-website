import React from 'react'
import PageheadTitle from '../../../components/CompanyPanel/SharedComponent/PageHeadTitle';
import CardCover from '../../../components/CompanyPanel/SharedComponent/CardCover';
import TableList from '../../../components/CompanyPanel/UserManagement/ViewUser'


export default function ViewUser() {
    return (
        <div>
            <PageheadTitle title={'VIEW USERS'} />
            <CardCover>
                <TableList></TableList>
            </CardCover>
        </div>
    )
}
