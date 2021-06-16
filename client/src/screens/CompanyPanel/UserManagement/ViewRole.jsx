import React from 'react'
import PageheadTitle from '../../../components/CompanyPanel/SharedComponent/PageHeadTitle';
import CardCover from '../../../components/CompanyPanel/SharedComponent/CardCover';
import TableList from '../../../components/CompanyPanel/UserManagement/ViewRole'
export default function ViewRole() {
    return (
        <div>
            <PageheadTitle title={'USER ROLES'} />
            <CardCover>
                <TableList></TableList>
            </CardCover>
        </div>
    )
}
