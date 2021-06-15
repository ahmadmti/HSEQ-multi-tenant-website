import React, { useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, MenuItem, InputLabel, Select, FormControl, Grid, Button, TextField, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { getZipCodes, updateCustomer, createCustomer, getCities, getStates, getStreetAddress } from '../../../api/api';
import { toast } from 'react-toastify';
import { useForm, Controller } from "react-hook-form";
import FormHelperText from '@material-ui/core/FormHelperText';
import ToastContext from '../../../context/ToastContext';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Popper from "@material-ui/core/Popper";

const styles = (theme) => ({
    popper: {
        maxWidth: "fit-content",
    }
});

const PopperMy = function (props) {
    return <Popper {...props} style={styles.popper} placement="bottom-start" />;
};


const useStyles = makeStyles((theme) => ({
    formControl: {

        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

}));

export default function Form(props) {
    const { t } = useTranslation();
    const { register, setError, clearErrors, reset, formState: { isValid }, setValue, control, handleSubmit, errors } = useForm({
        mode: "all",
        reValidateMode: "all",
        shouldUnregister: true
    });
    const toastOptions = useContext(ToastContext);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [state, setState] = React.useState('');
    const [city, setCity] = React.useState('');
    const [zipCode, setzipCode] = React.useState('');

    const [isAddEdit, setIsAddEdit] = React.useState(false);
    const [citiesOptions, setCitiesOptions] = React.useState([]);
    const [statesOptions, setStatesOptions] = React.useState([]);
    const [zipCodeOptions, setzipCodeOptions] = React.useState([]);
    const [streetOptions, setStreetOptions] = React.useState([]);
    const [customerId, setCustomerId] = React.useState('');
    const [value, setNameValue] = React.useState('')

    const handleStreetAddres = (id) => {
        setValue('street_address_id', id, { shouldValidate: true })

    }
    const handleState = (event) => {
        setState(event.target.value);

        setValue('state_id', event.target.value, { shouldValidate: true })
        clearErrors('state_id');
        cities(event.target.value);
    };
    const handleCity = (id) => {
        setCity(id);
        setValue('city_id', id, { shouldValidate: true });
        setValue('zip_Code', '', { shouldValidate: true });
        setValue('street_address_id', '', { shouldValidate: true });

        clearErrors('city_id');
        zipCodes(id);
    };
    const handleZipCode = (zipCode) => {
        setzipCode(zipCode);
        setValue('zip_Code', zipCode, { shouldValidate: true })
        clearErrors('zip_code');
        StreetAddress(zipCode)
    };

    const cities = (stateId) => {
        dispatch(toggle());
        getCities(stateId)
            .then((res) => {
                // console.log(res);
                dispatch(toggle());
                setCitiesOptions([...res.data.cities])
            })
            .catch(err => console.log(err))
    }

    const onSubmit = (data) => {
        console.log(data)
        if (!isAddEdit)
            create(data)
        else {
            data.id = props.data ? props.data.id : customerId;

            update(data);
        }

    };

    const zipCodes = (cityId) => {
        dispatch(toggle());
        getZipCodes(cityId)
            .then((res) => {

                dispatch(toggle());
                setzipCodeOptions([...res.data.zipCodes])
                if (res.data.zipCodes.length > 0) {
                    setzipCode(res.data.zipCodes[0].zip_code)
                    // StreetAddress(res.data.zipCodes[0].zip_code)
                    // setValue('zip_Code', res.data.zipCodes[0].zip_code, { shouldValidate: true })
                }
            })
            .catch(err => {
                dispatch(toggle())
                console.log(err)
            })
    }

    const states = () => {
        dispatch(toggle());
        getStates()
            .then((res) => {
                dispatch(toggle());
                setStatesOptions([...res.data.states])
            })
            .catch(err => {
                dispatch(toggle())
                console.log(err)
            })
    }
    const StreetAddress = (zipCode) => {
        dispatch(toggle());
        getStreetAddress(zipCode)
            .then(res => {
                dispatch(toggle());
                setStreetOptions([...res.data.streetAddress])
            })
            .catch(err => {
                dispatch(toggle())
                console.log(err)
            })
    }
    const addEditMode = (data) => {
        if (data) {
            setCustomerId(data.id)
            setNameValue(data.name)
            setValue('name', data.name, { shouldValidate: true })
            setValue('email', data.email, { shouldValidate: true })
            setValue('phone_no', data.phone_number, { shouldValidate: true })
            setValue('state_id', data.state_id, { shouldValidate: true });
            setValue('city_id', data.city_id, { shouldValidate: true });
            setValue('zip_Code', data.zip_code, { shouldValidate: true })
            setValue('street_address_id', data.street_id, { shouldValidate: true })
            setValue('house_number', data.house_no, { shouldValidate: true });
            setValue('note', data.note, { shouldValidate: true })
            setIsAddEdit(true);
        }
    }
    const create = (data) => {
        dispatch(toggle());
        data.name = value;
        createCustomer(data)
            .then(res => {
                dispatch(toggle());
                toast.success(res.data.message, toastOptions);
                reset({
                    "name": '', 'email': '', 'phone_no': '',
                    'house_number': '', 'note': '', 'street_address_id': ''
                });
                if (props.onFormSubmit)
                    props.onFormSubmit(res.data.customer);
            })
            .catch(err => {
                dispatch(toggle())
                toast.error(err.response.data.message, toastOptions);
            })
    }
    const update = (data) => {
        dispatch(toggle());
        data.name = value;
        updateCustomer(data)
            .then(res => {
                dispatch(toggle());
                toast.success(res.data.message, toastOptions);
                if (props.onFormSubmit)
                    props.onFormSubmit(res.data.customer);
                reset({});
            })
            .catch(err => {
                console.log(err);
                dispatch(toggle())
                toast.error(err.response.data.error, toastOptions);
            })
    }

    // console.log(value,'set')
    useEffect(() => {
        cities();
        // console.log(props.customerList, "jhjh")
        if (props.data)
            addEditMode(props.data)

        if (props.number) {
            setValue('phone_no', props.number, { shouldValidate: true })

        }

    }, []);
    return (
        <React.Fragment>
            <Box component="div" m={0}>
                <Card className="form_wrapper">
                    <Container >

                        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                            <CardContent>
                                <Grid container spacing={3} >


                                    <Grid style={{ paddingTop: 2 }} item md={6} sm={6} xs={12} >
                                        <FormControl style={{ width: "100%" }} margin="dense" variant="outlined">
                                            <Autocomplete
                                                PopperComponent={PopperMy}
                                                freeSolo
                                                id="combo-box-demo"
                                                options={props.customerList}
                                                getOptionLabel={(customer) => customer.name}
                                                autoHighlight={true}
                                                renderOption={(customer) => (
                                                    <React.Fragment>
                                                        <span>{`k${customer.id}-${customer.name},${customer.house_no},${customer.street_name},${customer.zip_code},${customer.city_name}`}</span>
                                                    </React.Fragment>
                                                )}
                                                style={{ width: '100%' }}
                                                autoComplete
                                                size={'small'}
                                                onChange={(event, newValue) => {
                                                    addEditMode(newValue);
                                                }}
                                                onInputChange={(event, newInputValue) => {
                                                    setNameValue(newInputValue)
                                                }}
                                                renderInput={(params) => <Controller
                                                    name="name"
                                                    as={<TextField
                                                        {...params} id="name"
                                                        error={errors.name ? true : false}
                                                        helperText={errors.name ? <span>{t("Name")}  {t("required")}</span> : null} margin="dense" label={t("Name")}
                                                        variant="outlined" />}
                                                    control={control}
                                                    defaultValue=""
                                                    rules={{
                                                        required: 'Required',
                                                    }}
                                                />}

                                            />
                                            {/* comobo box */}
                                        </FormControl>
                                    </Grid>


                                    {/* 

                                    <Grid item md={6} sm={6} xs={12} >
                                        <Controller
                                            name="name"
                                            as={<TextField style={{ width: '100%' }} id="name" error={errors.name ? true : false}
                                                helperText={errors.name ? <span>{t("Name")}  {t("required")}</span> : null} margin="dense" label={t("Name")} variant="outlined" />}
                                            control={control}
                                            defaultValue=""

                                        />
                                    </Grid> */}

                                    <Grid item md={6} sm={6} xs={12} >
                                        <Controller
                                            name="email"
                                            as={<TextField type="email" id="email" style={{ width: '100%' }} label={t("email.label")} error={errors.email ? true : false}
                                                helperText={errors.email ? <span>{t("email.label")}  {t("email.label")}  {t("valid")}</span> : null}
                                                variant="outlined" margin="dense" />
                                            }
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

                                            }}
                                        />
                                    </Grid>

                                    <Grid item md={6} sm={6} xs={12} >
                                        <Controller
                                            name="phone_no"
                                            as={<TextField  type="number" style={{ width: '100%' }} label={t('phone.label')} variant="outlined"
                                                margin="dense" id="phone_no" error={errors.phone_no ? true : false}
                                                helperText={errors.phone_no ? <span>{t('phone.label')} {t('required')}</span> : null} />}
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                            }}
                                        />
                                    </Grid>


                                    <Grid item md={6} sm={6} xs={12} >

                                        <FormControl
                                            error={errors.city_id ? true : false}
                                            style={{ width: "100%" }} margin="dense" variant="outlined">

                                            <Autocomplete
                                                id="combo-box-demo"
                                                options={citiesOptions}
                                                getOptionLabel={(city) => city.name}

                                                autoHighlight={true}
                                                style={{ width: '100%' }}
                                                autoComplete
                                                size={'small'}
                                                openOnFocus
                                                onChange={(event, newValue) => {
                                                    handleCity((newValue ? newValue.city_id : null))
                                                }}
                                                renderInput={(params) =>
                                                    <Controller
                                                        name="city_id"
                                                        as={<TextField {...params} label={t('city.label')} error={errors.city_id ? true : false}
                                                            helperText={errors.city_id ? <span>{t('city.label')} {t('required')}</span> : null}
                                                            variant="outlined" />}

                                                        control={control}
                                                        defaultValue=""
                                                        rules={{
                                                            required: 'Required',
                                                        }}
                                                    />}

                                            />
                                        </FormControl>



                                    </Grid>

                                    <Grid item md={6} sm={6} xs={12} >

                                        <FormControl
                                            error={errors.zip_Code ? true : false}
                                            style={{ width: "100%" }} margin="dense" variant="outlined">

                                            <Autocomplete
                                                disabled={city ? false : true}
                                                id="combo-box-demo"
                                                options={zipCodeOptions}
                                                getOptionLabel={(zip_code) => zip_code.zip_code}

                                                autoHighlight={true}
                                                style={{ width: '100%' }}
                                                autoComplete
                                                size={'small'}
                                                openOnFocus
                                                onChange={(event, newValue) => {
                                                    handleZipCode((newValue ? newValue.zip_code : null))
                                                }}
                                                renderInput={(params) =>
                                                    <Controller
                                                        name="zip_Code"
                                                        as={<TextField {...params} label={t('zipCode.label')} error={errors.zip_Code ? true : false}
                                                            helperText={errors.zip_Code ? <span>{t('zipCode.label')} {t('required')}</span> : null}
                                                            variant="outlined" />}

                                                        control={control}
                                                        defaultValue=""
                                                        rules={{
                                                            required: 'Required',
                                                        }}
                                                    />}

                                            />
                                        </FormControl>


                                    </Grid>

                                    <Grid item md={6} sm={6} xs={12} >
                                        <FormControl
                                            error={errors.street_address_id ? true : false}
                                            style={{ width: "100%" }} margin="dense" variant="outlined">

                                            <Autocomplete
                                                disabled={zipCode ? false : true}
                                                id="combo-box-demo"
                                                options={streetOptions}
                                                getOptionLabel={(street) => street.street_name}

                                                autoHighlight={true}
                                                style={{ width: '100%' }}
                                                autoComplete
                                                size={'small'}
                                                openOnFocus
                                                onChange={(event, newValue) => {
                                                    handleStreetAddres((newValue ? newValue.street_address_id : null))
                                                }}
                                                renderInput={(params) =>
                                                    <Controller
                                                        name="street_address_id"
                                                        as={<TextField {...params} label={t('street.label')} error={errors.street_address_id ? true : false}
                                                            helperText={errors.street_address_id ? <span>{t('street.label')} {t('required')}</span> : null}
                                                            variant="outlined" />}

                                                        control={control}
                                                        defaultValue=""
                                                        rules={{
                                                            required: 'Required',
                                                        }}
                                                    />}

                                            />
                                        </FormControl>

                                    </Grid>



                                    <Grid item md={6} sm={6} xs={12} >
                                        <Controller
                                            name="house_number"
                                            as={<TextField style={{ width: '100%' }} margin="dense" id="house_number" error={errors.house_number ? true : false}
                                                helperText={errors.house_number ? <span>{t("houseNumber.label")}  {t('required')} </span> : null}
                                                type="number"
                                                label={t("houseNumber.label")} variant="outlined" />}
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'required',
                                            }}
                                        />
                                    </Grid>

                                    <Grid item md={12} sm={12} xs={12} >
                                        <Controller
                                            name="note"
                                            as={<TextField style={{ width: '100%' }} margin="dense" id="note" label={t("remarks.label")} variant="outlined" />}
                                            control={control}
                                            defaultValue=""

                                        />
                                    </Grid>

                                    <Grid item md={12} sm={12} xs={12}>
                                        {/* disabled={!isValid} */}
                                        <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary" type="submit">
                                            {t('submit.label')}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </form>
                    </Container>
                </Card>
            </Box>
        </React.Fragment>
    )
}
