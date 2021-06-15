import React, { useEffect, useContext } from 'react'
import { Box, Select, MenuItem, InputLabel, FormControl, Grid, Button, TextField, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import { useForm, Controller } from "react-hook-form";
import FormHelperText from '@material-ui/core/FormHelperText';
import { createTable, updateTable } from '../../../api/api';
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





export default function AddTableForm(props) {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const classes = useStyles();
    const [status, setStatus] = React.useState('');
    const [isAddEdit, setIsAddEdit] = React.useState(false);
    const { control, reset, formState: { isValid }, setValue, handleSubmit, errors } = useForm({
        mode: "all",
        reValidateMode: "all",
        shouldUnregister: true
    });
    const toastOptions = useContext(ToastContext);

    const handleChange = (event) => {
        setStatus(event.target.value);
    };
    const onSubmit = (data) => {

        if (!isAddEdit)
            create(data);
        else {
            data.id = props.data.id;
            update(data);
        }

    };
    const create = (data) => {
        dispatch(toggle())
        createTable(data)
            .then(res => {
                dispatch(toggle())
                reset({
                    'table_no': '',
                    'seats_available': '',
                    'remarks': '',
                    'status': false
                })
                toast.success(res.data.message, toastOptions);
            })
            .catch(err => {
                dispatch(toggle())
                console.log(err);
                toast.error(err.response.data.error, toastOptions);
            })
    }
    const update = (data) => {
        dispatch(toggle())
        updateTable(data).then((res) => {
            dispatch(toggle())
            toast.success(res.data.message, toastOptions);
            reset({});
            setStatus(false);
            props.onFormSubmit();
        })
            .catch(err => {
                dispatch(toggle())
                toast.error(err.response.data.error, toastOptions);
            })
    }

    const addEditMode = (data) => {

        if (data) {
            setValue('table_no', data.table_no, { shouldValidate: true })
            setValue('seats_available', data.seats_available, { shouldValidate: true })
            setValue('remarks', data.remarks, { shouldValidate: true })
            setValue('status', data.status, { shouldValidate: true });
            setIsAddEdit(true);
        }
    }
    useEffect(() => {

        if (props.data)
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
                                            name="table_no"
                                            as={<TextField id="table_no" type="number" style={{ width: '100%' }} variant="outlined"
                                                margin="dense" error={errors.table_no ? true : false}
                                                helperText={errors.table_no ? <span>{t('Table_no')}  {t('required')}</span> : null}
                                                label={t('Table_no')} />}
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'required'
                                            }}
                                        />
                                    </Grid>

                                    <Grid item md={6} sm={6} xs={12} >
                                        <Controller
                                            name="seats_available"
                                            as={<TextField type="number" style={{ width: '100%' }} margin="dense"
                                                variant="outlined" error={errors.seats_available ? true : false}
                                                helperText={errors.seats_available ? <span>{t('Seats_Available')} {t('required')}</span> : null} 
                                                label={t('Seats_Available')} id="seats_available" />}
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'required'
                                            }}
                                        />
                                    </Grid>

                                    <Grid item md={6} sm={6} xs={12} >
                                        <FormControl error={errors.status ? true : false} style={{ width: "100%" }} margin="dense" variant="outlined" className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-label">{t('status.label')}</InputLabel>
                                            <Controller
                                                defaultValue={(props.data && props.data.status) ? props.data.status : ""}

                                                name="status"
                                                as={<Select
                                                    labelId="demo-simple-select-label"
                                                    id="status"


                                                >
                                                    <MenuItem value={1}>{t('Active')}</MenuItem>
                                                    <MenuItem value={0}>{t('In-Active')}</MenuItem>

                                                </Select>} control={control}

                                                rules={{
                                                    required: 'required'
                                                }}
                                            />
                                            <FormHelperText error>{errors.status ? <span>{t('status.label')} {t('required')}</span> : null}</FormHelperText>
                                        </FormControl>
                                    </Grid>

                                    <Grid item md={6} sm={6} xs={12} >
                                        <Controller
                                            name="remarks"
                                            as={<TextField variant="outlined" style={{ width: '100%' }} margin="dense"
                                                label={t('Remarks')} id="remarks" />} control={control}
                                            defaultValue=""

                                        />
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
