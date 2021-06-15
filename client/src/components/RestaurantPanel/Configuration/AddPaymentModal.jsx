import React, { useEffect, useContext } from 'react'
import { Box, Select, MenuItem, InputLabel, FormControl, Grid, Button, TextField, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import { useForm, Controller } from "react-hook-form";
import FormHelperText from '@material-ui/core/FormHelperText';
import { createPaymentMethod, updatePaymentMethod } from '../../../api/api';
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import { useTranslation } from 'react-i18next';
import { toggle } from '../../../actions/pacerActions';
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
    formControl: {

        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));





export default function AddPaymentModal(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [isAddEdit, setIsAddEdit] = React.useState(false);
    const { control, reset, formState: { isValid }, setValue, handleSubmit, errors } = useForm({
        mode: "all",
        reValidateMode: "all",
        shouldUnregister: true
    });
    const toastOptions = useContext(ToastContext);


    const onSubmit = (data) => {

        if (!isAddEdit)
            create(data);
        else {
            data.id = props.data.id;
            update(data);
        }

    };
    const create = (data) => {
        dispatch(toggle());
        createPaymentMethod(data)
            .then(res => {
                dispatch(toggle());
                console.log(res);
                reset({
                    'method_name': '',
                    'status': false

                });
                props.onFormSubmit();
                toast.success(res.data.message, toastOptions);
            })
            .catch(err => {
                dispatch(toggle());
                console.log(err);
                toast.error(err.response.data.error, toastOptions);
            })
    }
    const update = (data) => {
        dispatch(toggle());
        updatePaymentMethod(data).then((res) => {
             dispatch(toggle());
            toast.success(res.data.message, toastOptions);
            reset({});
            props.onFormSubmit();
        })
            .catch(err => {
                dispatch(toggle());
                toast.error(err.response.data.error, toastOptions);
            })
    }

    const addEditMode = (data) => {

        if (Object.keys(data).length > 0) {
            setValue('method_name', data.name, { shouldValidate: true })
            setValue('status', data.status, { shouldValidate: true });
            setIsAddEdit(true);
        }
    }
    useEffect(() => {

        if (Object.keys(props.data).length > 0)
            addEditMode(props.data)
    }, []);
    return (
        <React.Fragment>
            <Box component="div" m={0}>
                <Card className="form_wrapper">
                    <Container >
                        <CardContent>
                            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
                                <Grid container spacing={3} >

                                    <Grid item md={6} sm={6} xs={12} >
                                        <Controller
                                            name="method_name"
                                            as={<TextField id="method_name" type="text" style={{ width: '100%' }} variant="outlined"
                                                margin="dense" error={errors.method_name ? true : false}
                                                helperText={errors.method_name ? <span>{t('Payment_Method')} {t('required')}</span> : null}
                                                label={t('Payment_Method')}/>}
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'required'
                                            }}
                                        />
                                    </Grid>



                                    <Grid item md={6} sm={6} xs={12} >
                                        <FormControl error={errors.status ? true : false} style={{ width: "100%" }} margin="dense" variant="outlined" className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-label">{t('Status')}</InputLabel>
                                            <Controller
                                                defaultValue={(props.data && props.data.status) ? props.data.status : ""}

                                                name="status"
                                                as={<Select
                                                    labelId="demo-simple-select-label"
                                                    id="status"


                                                >
                                                    <MenuItem value={1}>{t('Active')}</MenuItem>
                                                    <MenuItem value={0}>{t('In-Active')} </MenuItem>

                                                </Select>} control={control}

                                                rules={{
                                                    required: 'required'
                                                }}
                                            />
                                            <FormHelperText error>{errors.status ? <span>{t('Status')}  {t('required')}</span> : null}</FormHelperText>
                                        </FormControl>
                                    </Grid>



                                    <Grid item md={12} sm={12} xs={12}>
                                        <Button variant="contained" disabled={!isValid} color="primary" type="submit">
                                        {t('submit.label')}
                                    </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Container>
                </Card>
            </Box>
        </React.Fragment >
    )
}
