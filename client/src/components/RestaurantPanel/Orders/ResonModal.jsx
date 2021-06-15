import React, { useContext } from 'react'
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import { useForm, Controller } from "react-hook-form";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { orderRefund } from '../../../api/api';
import { toggle } from '../../../actions/pacerActions';
import { useDispatch } from "react-redux";

export default function ResonModal(props) {
    const { formState: { isValid }, control, handleSubmit, errors } = useForm({
        mode: "all",
        reValidateMode: "all",
        shouldUnregister: true
    });
    const dispatch = useDispatch();

    const { t } = useTranslation();
    const toastOptions = useContext(ToastContext);

    const onSubmit = (data) => {
        dispatch(toggle());
        data.orderID = props.orderID;
        orderRefund(data).then(res => {
            toast.success(res.data.message, toastOptions);
            props.onFormSubmit(data);
            dispatch(toggle());
        })
            .catch(err => { console.log(err); dispatch(toggle()); toast.success(err.response.data.error, toastOptions) })
    }

    return (
        <div>
            <Grid container spacing={3} >
                <Grid item md={12} sm={12} xs={12} >
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <Controller
                            name="reason"
                            as={<TextField
                                error={errors.reason ? true : false}
                                id="reason" style={{ width: '100%' }} margin="dense" variant="outlined"
                                label={t('reason')} helperText={errors.reason ? <span>{t('Reason')} {t('required')}</span> : null} />}
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'Required',
                            }}
                        />
                        <Button type="submit" disabled={!isValid} variant="contained" color="primary">
                            {t('submit.label')}
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </div>
    )
}
