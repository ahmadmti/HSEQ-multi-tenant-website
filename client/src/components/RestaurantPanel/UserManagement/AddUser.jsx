import React, { useEffect, useContext } from 'react'
import { Box, MenuItem, FormControl, Select, InputLabel, Grid, Button, TextField, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { roles } from '../../../api/api';
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import { useForm, Controller } from "react-hook-form";
import FormHelperText from '@material-ui/core/FormHelperText';
import { createUser, updateUser } from '../../../api/api';
import { useTranslation } from 'react-i18next';
import { toggle } from '../../../actions/pacerActions';
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
    fileInput: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    formControl: {
        width: '100%'
    },
    chipRow: {
        display: "flex",
        flexWrap: "wrap"
    }
});
export default function Form(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [role, setRoles] = React.useState([]);
    const [isAddEdit, setIsAddEdit] = React.useState(false);
    const [image, setImage] = React.useState(null);

    const toastOptions = useContext(ToastContext);

    const { register, reset, formState: { isValid }, setValue, control, handleSubmit, errors } = useForm({
        mode: "all",
        reValidateMode: "all",
        shouldUnregister: true
    });

    useEffect(() => {
        getRoles();
        if (props.data)
            addEditMode(props.data)
    }, []);

    const handleImage = (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onloadend = () => {

            setImage(reader.result)

        };
        reader.readAsDataURL(file);

    }

    const create = (data) => {
        dispatch(toggle());
        createUser(data)
            .then(res => {
                dispatch(toggle());
                toast.success(res.data.message, toastOptions);

                reset({
                    'user_name': '',
                    'phone_number': '',
                    'role_id': '',
                    'email': '',
                    'password': '',
                    'status': ''
                })
            })
            .catch(err => {
                dispatch(toggle());
                toast.error(err.response.data.error, toastOptions)
            })
        console.log(data)
    }

    const update = (data) => {
        dispatch(toggle());
        updateUser(data)
            .then(res => {
                dispatch(toggle());
                toast.success(res.data.message, toastOptions);
                props.onFormSubmit()
                reset({
                    'user_name': '',
                    'phone_number': '',
                    'role_id': '',
                    'email': '',
                    'password': '',
                    'status': ''
                })
            })
            .catch(err => {
                dispatch(toggle());
                toast.error(err.response.data.error, toastOptions)
            })
        console.log(data)
    }

    const onSubmit = (data) => {
        data.image = image;
        if (!isAddEdit)
            create(data);
        else {
            data.id = props.data.id;
            update(data);
            console.log('edit')
        }
    }

    const addEditMode = (data) => {
        if (data) {

            setValue('user_name', props.data.fname + props.data.lname, { shouldValidate: true })
            setValue('phone_number', props.data.phone_no, { shouldValidate: true })
            setValue('role_id', props.data.role_id, { shouldValidate: true })
            setValue('email', props.data.email, { shouldValidate: true })
            // setValue('password', props.data.password, { shouldValidate: true })
            setValue('status', props.data.status, { shouldValidate: true })

            setIsAddEdit(true);
        }
    }

    const getRoles = () => {
        dispatch(toggle());
        roles()
            .then(res => {
                dispatch(toggle());
                setRoles([...res.data.roles]);

            }).catch(err => {     dispatch(toggle());
                toast.error(err.response.data.error, toastOptions)})
    }
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
                                            name="user_name"
                                            as={<TextField
                                                error={errors.user_name ? true : false}
                                                id="user_name" style={{ width: '100%' }} margin="dense" variant="outlined"
                                                label={t("Name")} helperText={errors.user_name ? <span>{t("Name")} {t("required")}</span> : null} />}
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'Required',
                                            }}
                                        />
                                    </Grid>


                                    <Grid item md={6} sm={6} xs={12} >
                                        <Controller
                                            name="phone_number"
                                            as={<TextField
                                                error={errors.phone_number ? true : false}
                                                id="phone_number" style={{ width: '100%' }} margin="dense" variant="outlined"
                                                label={t("phone.label")} helperText={errors.phone_number ? <span>{t("phone.label")} {t("required")}</span> : null} />}
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'Required',
                                            }}
                                        />
                                    </Grid>
                                    <Grid item md={6} sm={6} xs={12} >
                                        <Controller
                                            name="email"
                                            as={<TextField
                                                variant="outlined"
                                                id="email"
                                                margin="dense"
                                                error={errors.email ? true : false}
                                                helperText={errors.email ? <span>{t("email.label")} {t("required")}  & {t("email.label")}  {t("valid")}</span> : null}
                                                fullWidth
                                                // label={t('email.label')}
                                                label={t("email.label")} 
                                            />}
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'required',
                                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

                                            }}
                                        />
                                    </Grid>

                                    <Grid item md={6} sm={6} xs={12} >

                                        {!isAddEdit ?
                                            <Controller
                                                name="password"
                                                as={<TextField
                                                    variant="outlined"
                                                    id="password"
                                                    margin="dense"
                                                    error={errors.password ? true : false}
                                                    helperText={errors.password ? <span>{t('password.label')}  {t('required')}</span> : null}
                                                    fullWidth
                                                    label={t('password.label')}
                                                  
                                                />}
                                                control={control}
                                                defaultValue=""
                                                rules={{
                                                    required: 'required',

                                                }}
                                            />
                                            : <Controller
                                                name="new_password"
                                                as={<TextField
                                                    variant="outlined"
                                                    id="new_password"
                                                    margin="dense"
                                                    error={errors.new_password ? true : false}
                                                    helperText={errors.new_password ? <span>{t('new_password.Label')}  {t('required')}</span> : null}
                                                    fullWidth
                                                 label={t('new_password.Label')}
                                                                                                    />}
                                                control={control}
                                                defaultValue=""
                                            // rules={{
                                            //     required: 'required',

                                            // }}
                                            />}
                                    </Grid>


                                    <Grid item md={6} sm={6} xs={12} >
                                        <FormControl error={errors.role_id ? true : false} style={{ width: "100%" }} margin="dense" variant="outlined" className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-label">{t("Roles")}</InputLabel>
                                            <Controller
                                                defaultValue={''}

                                                name="role_id"
                                                as={<Select
                                                    labelId="demo-simple-select-label"
                                                    id="role_id"


                                                >
                                                    {
                                                        role.map((item, index) => <MenuItem key={index} value={item.id}>{item.name}</MenuItem>)
                                                    }


                                                </Select>} control={control}

                                                rules={{
                                                    required: 'required'
                                                }}
                                            />
                                            <FormHelperText error>{errors.role_id ? <span>{t("Roles")} {t("required")}</span> : null}</FormHelperText>
                                        </FormControl>
                                    </Grid>



                                    <Grid item md={6} sm={6} xs={12} >
                                        <FormControl error={errors.status ? true : false} style={{ width: "100%" }} margin="dense" variant="outlined" className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-label">{t("Status")}</InputLabel>
                                            <Controller
                                                defaultValue={''}

                                                name="status"
                                                as={<Select
                                                    labelId="demo-simple-select-label"
                                                    id="status"


                                                >
                                                    <MenuItem value={1}>{t('Active')} </MenuItem>
                                                    <MenuItem value={0}>{t('In-Active')}</MenuItem>

                                                </Select>} control={control}

                                                rules={{
                                                    required: 'required'
                                                }}
                                            />
                                            <FormHelperText error>{errors.status ? <span>{t("Status")}  {t("required")}</span> : null}</FormHelperText>
                                        </FormControl>
                                    </Grid>




                                    <Grid item md={6} sm={6} xs={12} className={classes.fileInput}>

                                        <TextField type="file" accept="image/*" onChange={handleImage} margin="dense" variant="outlined" style={{ width: '100%' }} />
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
