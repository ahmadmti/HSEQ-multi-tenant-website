import React, { useContext, useEffect } from 'react'
import { Box, MenuItem, InputLabel, Select as SelectMat, FormControl, Grid, Button, TextField, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Select from 'react-select';
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import FormHelperText from '@material-ui/core/FormHelperText';
import { getActiveTable, createReservation,updateReservation } from '../../../api/api';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    fieldSet: {
        display: "flex",
        alignItems: "center",

    },
    textField: {
        width: '100%',
    },

}));


export default function TableReservationForm(props) {
    const classes = useStyles();

    const { t } = useTranslation();

    const [tablesError, setTablesError] = React.useState(true);
    const [tables, setTables] = React.useState([]);
    const [isAddEdit, setIsAddEdit] = React.useState(false);

    const { register, reset, setValue, control, handleSubmit, errors } = useForm();
    const toastOptions = useContext(ToastContext);
    const dispatch = useDispatch();
    function formatDate(_date) {

        if (_date) {
            return new Date(_date).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
            // return new Date(_date).toISOString().slice(0, 10);
          
        }
    }
    const onSubmit = (data) => {
 
        if (!isAddEdit)
            create(data);
        else {
            data.id = props.data.r_id;
            update(data);
        }

    };
    const create = (data) => {
        dispatch(toggle());
        createReservation(data)
            .then(res => {
                dispatch(toggle());
                toast.success(res.data.message, toastOptions);
                reset({});
            })
            .catch(err => {
                dispatch(toggle());
                toast.error(err.response.data.error.join("\n "), toastOptions);
            })
    };
    const update = (data) => {
        dispatch(toggle());
       
        updateReservation(data).then((res) => {
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
        if (data) {
            setValue('reservation_date', formatDate(props.data.reservation_date))
            setValue('customer_name', props.data.customer_name)
            setValue('start_time', props.data.start_time)
            setValue('end_time', props.data.end_time)
            setValue('total_persons', props.data.total_persons)
            setValue('tables', props.data.table)
            setValue('remarks', props.data.remarks)
            setValue('status', props.data.status)


            
            setIsAddEdit(true);
        }
    }
    useEffect(() => {
        getTables();
        if (props.data)
        console.log(props.data)
        addEditMode(props.data)
    }, []);

    const getTables = () => {
        getActiveTable()
            .then(res => {
                setTables([...res.data.tables])
            })
            .catch(err => {
                toast.error(err.response.data.error, toastOptions);
            })
    }
    const customStyles = {
        option: (provided, state) => ({
            ...provided,

            zIndex: 111,
            background: 'white'
        }),
        control: (base, state) => ({
            ...base,
            // state.isFocused can display different borderColor if you need it
            borderColor: state.isFocused ?
                '#ddd' : tablesError ?
                    '#ddd' : 'red',
            // overwrittes hover style
            '&:hover': {
                borderColor: state.isFocused ?
                    '#ddd' : tablesError ?
                        '#ddd' : 'red'
            }

        })
    }
    return (
        <React.Fragment>
            <Box component="div" m={0}>
                <Card className="form_wrapper">
                    <Container >
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={3} >
                                    <Grid item md={6} sm={6} xs={12} >
                                        <Controller
                                            name="reservation_date"
                                            as={<TextField
                                                id="reservation_date"
                                                label={t('reservationDate')}
                                                type="date" error={errors.reservation_date ? true : false}
                                                margin="dense" variant="outlined"
                                                className={classes.textField} helperText={errors.reservation_date ? <span>{t('reservationDate')} {t(' required')}</span> : null}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />}
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'Required',
                                            }}
                                        />
                                    </Grid>

                                    <Grid item md={6} sm={6} xs={12} >
                                        <Controller
                                            name="customer_name"
                                            as={<TextField style={{ width: '100%' }} margin="dense" error={errors.customer_name ? true : false}
                                                variant="outlined" label={t('Customer') + ' Name'} id="customer_name" helperText={errors.customer_name ? <span>{t('Customer')} {t('required')}</span> : null} />}
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'Required',
                                            }}
                                        />
                                    </Grid>

                                    <Grid item md={6} sm={6} xs={12} >
                                        <Controller
                                            name="start_time"
                                            as={<TextField
                                                id="start_time"
                                                label={t('startTime')} error={errors.start_time ? true : false}
                                                type="time" helperText={errors.start_time ? <span>{t('startTime')} {t('required')}</span> : null}
                                                margin="dense" variant="outlined"

                                                className={classes.textField}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />} control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'Required',
                                            }}
                                        />
                                    </Grid>

                                    <Grid item md={6} sm={6} xs={12} >
                                        <Controller
                                            name="end_time"
                                            as={<TextField
                                                id="end_time" error={errors.end_time ? true : false}
                                                label={t('endTime')} helperText={errors.end_time ? <span>{t('endTime')} {t('required')}</span> : null}
                                                type="time"
                                                margin="dense" variant="outlined"
                                                className={classes.textField}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />} control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'Required',
                                            }}
                                        />
                                    </Grid>


                                    <Grid item md={6} sm={6} xs={12} >
                                        <Controller
                                            name="total_persons"
                                            as={<TextField type="number" style={{ width: '100%' }} id="total_persons" margin="dense" error={errors.total_persons ? true : false}
                                                variant="outlined" label={t('totalPersons')} helperText={errors.total_persons ? <span>{t('totalPersons')} {t('required')} </span> : null} />} control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'Required',
                                            }}
                                        />
                                    </Grid>

                                    <Grid item md={6} sm={6} xs={12} className={classes.fieldSet} >
                                    <div style={{ zIndex: 1000 ,width:"100%"}}>
                                        <Controller
                                            name="tables"
                                            as={<Select
                                                placeholder={<div>{t('selectTable')} </div>}
                                                isMulti
                                                styles={customStyles}
                                                label="test"
                                                id="tables"

                                                options={tables}
                                                getOptionLabel={(option) => option.table_no}
                                                getOptionValue={(option) => option.id}
                                                className="basic-multi-select"
                                                classNamePrefix="select-react"
                                            />} control={control}
                                            defaultValue="" rules={{
                                                required: 'Required',
                                            }}
                                        />
                                        <span>{errors.tables ? <span>{t('table')}  {t('required')} </span> : null}</span>
                                   </div>
                                    </Grid>

                                    <Grid item md={6} sm={6} xs={12} >
                                        <Controller
                                            name="remarks"
                                            as={<TextField id="remarks" style={{ width: '100%' }} margin="dense"
                                                variant="outlined" label={t('remarks')}  />} control={control}
                                            defaultValue="" rules={{
                                             
                                            }}
                                        />
                                    </Grid>

                                    <Grid item md={6} sm={6} xs={12}>
                                        <FormControl error={errors.status ? true : false} style={{ width: "100%" }} margin="dense" variant="outlined" className={classes.formControl}>
                                            <InputLabel style={{ zIndex: 11 }} id="demo-simple-select-label">{t('status.label')}</InputLabel>
                                            <Controller
                                                name="status"
                                                as={<SelectMat


                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    <MenuItem value={1}>{t('Active')}</MenuItem>
                                                    <MenuItem value={0}>{t('In-Active')}</MenuItem>

                                                </SelectMat>} control={control}
                                                defaultValue="" rules={{
                                                    required: 'Required',
                                                }}
                                            />
                                            <FormHelperText error>{errors.status ? <span>{t('status.label')} {t('required')}</span> : null}</FormHelperText>
                                        </FormControl>
                                    </Grid>

                                    <Grid item md={12} sm={12} xs={12}>
                                        <Button variant="contained" color="primary" type="submit">
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
