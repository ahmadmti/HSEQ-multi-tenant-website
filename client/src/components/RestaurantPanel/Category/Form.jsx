import React, { useContext, useEffect } from 'react'
import { Box, FormControlLabel, Checkbox, Grid, Button, TextField, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useForm, Controller } from "react-hook-form";
import { addCategory, updateCategory } from '../../../api/api.js'
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import { toggle } from '../../../actions/pacerActions';
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';

export default function Form(props) {

    const { register, reset, formState: { isValid }, setValue, control, handleSubmit, errors } = useForm({
        mode: "all",
        reValidateMode: "all",
        shouldUnregister: true
    });
    const dispatch = useDispatch();
    const { t } = useTranslation();


    const toastOptions = useContext(ToastContext);
    const [status, setStatus] = React.useState(false);
    const [isAddEdit, setIsAddEdit] = React.useState(false);

    const onSubmit = (data) => {
        data.status = status;
        if (!isAddEdit)
            create(data);
        else {
            data.id = props.data.id;
            update(data);
        }


    };

    const create = (data) => {
        dispatch(toggle());
        addCategory(data).then((res) => {
            toast.success(res.data.message, toastOptions);
            reset({ 'category_name': '', 'vat_take_away': '', 'vat': '', 'vat_label': '' });
            dispatch(toggle());
            setStatus(false);
        })
            .catch(err => {
                dispatch(toggle());
                toast.error(err.response.data.error, toastOptions);
            })
    }

    const update = (data) => {

        dispatch(toggle());
        updateCategory(data).then((res) => {
            dispatch(toggle());
            toast.success(res.data.message, toastOptions);
            reset({ 'category_name': '', 'vat_take_away': '', 'vat': '', 'vat_label': '' });
            setStatus(false);
            props.onFormSubmit();
        })
            .catch(err => {
                dispatch(toggle());
                toast.error(err.response.data.error, toastOptions);
            })
    }

    const addEditMode = (data) => {
        if (data) {
            setValue('category_name', props.data.category_name, { shouldValidate: true })
            setValue('vat', props.data.vat, { shouldValidate: true })
            setValue('vat_label', props.data.vat_label, { shouldValidate: true })
            setValue('vat_take_away', props.data.vat_take_away, { shouldValidate: true })
            setStatus(props.data.status ? true : false);
            setIsAddEdit(true);
        }
    }
    useEffect(() => {
        if (props.data)
            addEditMode(props.data)
    }, [])
    return (
        <React.Fragment>
            <Box component="div" m={0}>
                <Card >
                    <Container >
                        <CardContent>

                            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                                <Grid container spacing={3} >

                                    <Grid item md={6} sm={6} xs={12} >
                                        <Controller
                                            name="category_name"
                                            as={<TextField
                                                error={errors.category_name ? true : false}
                                                id="category_name" style={{ width: '100%' }} margin="dense" variant="outlined"
                                                label={t('categoryName.label')} helperText={errors.category_name ? <span>{t('categoryName.label')} {t('required')}</span> : null} />}
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'Required',
                                            }}
                                        />
                                    </Grid>

                                    <Grid item md={6} sm={6} xs={12} >
                                        <Controller
                                            name="vat_take_away"
                                            as={<TextField type="number" id="vat_take_away" style={{ width: '100%' }} error={errors.vat_take_away ? true : false}
                                                helperText={errors.vat_take_away ? <span>{t('VATOutsideHouse.label')} {t("required")} & {t("must_number")}</span> : null}
                                                margin="dense" variant="outlined" label={t('VATOutsideHouse.label')} />}
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'Required',

                                            }}
                                        />
                                    </Grid>

                                    <Grid item md={6} sm={6} xs={12} >
                                        <Controller
                                            name="vat"
                                            as={<TextField type="number" error={errors.vat ? true : false} style={{ width: '100%' }} margin="dense" variant="outlined"
                                                helperText={errors.vat ? <span>{t('VATInHouse.label')}  {t("required")} & {t("must_number")}</span> : null}
                                                id="vat" label={t('VATInHouse.label')} />}
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'Required',

                                            }}
                                        />

                                        <FormControlLabel
                                            id="status"
                                            control={
                                                <Checkbox
                                                    checked={status}
                                                    color="primary"
                                                    onChange={(e) => setStatus(e.target.checked)}
                                                />
                                            }
                                            label={t('status.label')}
                                        />
                                    </Grid>

                                    <Grid item md={6} sm={6} xs={12} >
                                        <Controller
                                            name="vat_label"
                                            as={<TextField error={errors.vat_label ? true : false} style={{ width: '100%' }} ref={register({ required: true })} id="vat_label" margin="dense"
                                                variant="outlined" label={t('VATTitle.label')} helperText={errors.vat_label ? <span>{t('VATTitle.label')}  {t("required")}</span> : null} />}
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'Required',

                                            }}
                                        />
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>

                                        <Button type="submit" disabled={!isValid} variant="contained" color="primary">
                                            {t('submit.label')}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Container>
                </Card>
            </Box>
        </React.Fragment>
    )
}
