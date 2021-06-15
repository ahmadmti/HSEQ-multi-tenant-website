import React from 'react'
import PageheadTitle from '../../../components/RestaurantPanel/SharedComponent/PageHeadTitle';
import TableList from '../../../components/RestaurantPanel/Setting/TableList';
import { useTranslation } from 'react-i18next';
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover'

export default function ViewTables() {
    const { t } = useTranslation();

    return (
        <div>
            <PageheadTitle title={t("tables_information")} />
            <CardCover>
            <TableList />
            </CardCover>
        </div>
    )
}
