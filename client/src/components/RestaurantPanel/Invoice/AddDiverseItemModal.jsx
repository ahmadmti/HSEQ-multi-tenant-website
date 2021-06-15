import React, { useContext, useEffect } from 'react'
import { Box, FormControlLabel, Checkbox, Grid, Button, TextField, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from "react-hook-form";
import { addDiverseitem } from '../../../api/api.js'
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import CompanyContext from '../../../context/CompanyContext';
import { addToCart } from '../../../actions/cartActions';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';


export default function AddDiverseModal(props) {

    const { register, reset, formState: { isValid }, setValue, control, handleSubmit, errors } = useForm({
        mode: "all",
        reValidateMode: "all",
        shouldUnregister: true
    });
    const dispatch = useDispatch();

    const toastOptions = useContext(ToastContext);
    const company = useContext(CompanyContext);

    const { t } = useTranslation();

    const onSubmit = (data) => {
        dispatch(toggle())
        addDiverseitem(data)
            .then(res => {

                dispatch(toggle())

                let content = {
                    id: res.data.data,
                    name: data.name,
                    unit_price: data.price,
                    total_price: (data.price * data.qty),
                    size_id: ' ',
                    qty: data.qty,
                    din_in: data.vat_din_in,
                    take_away: data.vat_take_away,
                    vat_label: data.vat_label,
                    sku: ' ',
                    size: ' ',
                    options: []
                }
                props.close();
                dispatch(addToCart(content));


            })
            .catch(err => {
                console.log(err);
            })
    };

    useEffect(() => {
        setValue('vat_label', company.vat_label || '', { shouldValidate: true })
        setValue('vat_take_away', company.vat_take_away || 0, { shouldValidate: true })
        setValue('vat_din_in', company.vat_din_in || 0, { shouldValidate: true })
        setValue('name', 'Diverse', { shouldValidate: true })

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
                                            name="name"
                                            as={<TextField
                                                error={errors.name ? true : false}
                                                id="name" style={{ width: '100%' }} margin="dense" variant="outlined"
                                                // label={t('categoryName.label')}
                                                label={t('itemName.label')}
                                                helperText={errors.name ? <span>{t('itemName.label')} {t('required')}</span> : null} />}
                                            control={control}
                                            defaultValue={t('diverse.label')}
                                            rules={{
                                                required: 'Required',
                                            }}
                                        />
                                    </Grid>

                                    <Grid item md={6} sm={6} xs={12} >
                                        <Controller
                                            name="price"
                                            as={<TextField
                                                error={errors.price ? true : false}
                                                id="price" style={{ width: '100%' }} type="number" margin="dense" variant="outlined"
                                                label={t('Price')}
                                                // label={t('categoryName.label')}
                                                helperText={errors.price ? <span> {t('Price')}  {t('required')}</span> : null} />}
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'Required',
                                            }}
                                        />
                                    </Grid>

                                    <Grid item md={6} sm={6} xs={12} >
                                        <Controller
                                            name="qty"
                                            as={<TextField
                                                error={errors.qty ? true : false}
                                                id="qty" style={{ width: '100%' }} type="number" margin="dense" variant="outlined"
                                                label={t('QTY')}
                                                // label={t('categoryName.label')}
                                                helperText={errors.qty ? <span>{t('QTY')} {t('required')}</span> : null} />}
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'Required',
                                            }}
                                        />
                                    </Grid>
                                    <Grid item md={6} sm={6} xs={12} >
                                        <Controller
                                            name="vat_label"
                                            as={<TextField error={errors.vat_label ? true : false} style={{ width: '100%' }} ref={register({ required: true })} id="vat_label" margin="dense"
                                                variant="outlined" label={t('VATTitle.label')} helperText={errors.vat_label ? <span>{t('VATTitle.label')} {t('required')}</span> : null} />}
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
                                                helperText={errors.vat_take_away ? <span>{t('VATOutsideHouse.label')} {t('required')} &  {t('must_number')}</span> : null}
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
                                            name="vat_din_in"
                                            as={<TextField type="number" error={errors.vat_din_in ? true : false} style={{ width: '100%' }} margin="dense" variant="outlined"
                                                helperText={errors.vat_din_in ? <span>{t('VATInHouse.label')}  {t('required')} &  {t('must_number')}</span> : null}
                                                id="vat_din_in" label={t('VATInHouse.label')} />}
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
