import React from 'react'
import CardCover from '../../../components/RestaurantPanel/SharedComponent/CardCover';
import LangSetting from '../../../components/RestaurantPanel/AppSetting/LangSetting';
import Divider from '@material-ui/core/Divider';

export default function Setting() {
    return (
        <div>
            <CardCover>
                <LangSetting />
                <Divider variant="middle" />
            </CardCover>

        </div>
    )
}
