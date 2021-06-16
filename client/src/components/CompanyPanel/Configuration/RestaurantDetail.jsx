import React, { useContext, useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import { Button } from '@material-ui/core';
import { companyDetail } from '../../../api/api';
import CompanyContext from '../../../context/CompanyContext';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { toggle } from '../../../actions/pacerActions';
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({

    titleHeading: {
        padding: '10px 0',
        textAlign: 'center'
    },
    root: {
        flexGrow: 1,
    },
    labelField: {
        display: 'flex',
        alignItems: 'center',
        height: '100%'
    },
    submitButton: {
        display: "flex",
        justifyContent: 'center'
    },
    box: {
        padding: '20px',
        border: '1px solid #eee',
        margin: '20px'
    }
}));


export default function RestaurantDetail(props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { register, reset, formState: { isValid }, setValue, control, handleSubmit, errors } = useForm({
        mode: "all",
        reValidateMode: "all",
        shouldUnregister: true
    });
    const toastOptions = useContext(ToastContext);
    const company = useContext(CompanyContext);
    const [image, setImage] = React.useState(null);



    useEffect(() => {
        console.log(company);
        if (company && company !== 'null' && Object.keys(company).length > 0) {

            setValue('name', company.name, { shouldValidate: true });
            setValue('email', company.email, { shouldValidate: true });
            setValue('address', company.address, { shouldValidate: true });
            setValue('phone_number', company.phone_number, { shouldValidate: true })
            setValue('zip_code', company.zip_code, { shouldValidate: true });
            setValue('invoice_type', company.invoice_type, { shouldValidate: true })
            setValue('invoice_footer_line', company.invoice_footer_line, { shouldValidate: true })
            setValue('vat_label', company.vat_label, { shouldValidate: true })
            setValue('vat_take_away', company.vat_take_away, { shouldValidate: true })
            setValue('vat_din_in', company.vat_din_in, { shouldValidate: true })
            setValue('bonus_system', company.bonus_system, { shouldValidate: true })
            
            
        }

    }, []);

    const handleImage = (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onloadend = () => {
            setImage(reader.result)
        };
        reader.readAsDataURL(file);

    }

    const onSubmit = (data) => {
        dispatch(toggle());
        data.id = company.id;
        data.image = image
        companyDetail(data)
            .then(res => {
                dispatch(toggle());
                toast.success(res.data.message, toastOptions);
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            })
            .catch(err => {
                dispatch(toggle());
                toast.error(err.response.data.error, toastOptions);
            })

    }
    return (
        <div>

            <Typography variant="subtitle2" component="h2" className={classes.titleHeading}>
                {t('Restaurant_details')}
            </Typography>

            <div className={classes.box}>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <Grid container className={classes.root} spacing={2}>


                        <Grid item xs={12} sm={6} md={4}>
                            <div className={classes.labelField}>
                                <Typography variant="body2" component="span" >
                                    {t('Restaurant_name')}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={8}>
                            <Controller
                                name="name"
                                as={<TextField
                                    error={errors.name ? true : false}
                                    id="name" style={{ width: '100%' }} margin="dense" variant="outlined"
                                    helperText={errors.name ? <span>{t('Name')} {t('required')}</span> : null} />}
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Required',
                                }}
                            />
                        </Grid>



                        <Grid item xs={12} sm={6} md={4}>
                            <div className={classes.labelField}>
                                <Typography variant="body2" component="span" >
                                    {t('Restaurant_email')}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={8}>
                            <Controller
                                name="email"
                                as={<TextField
                                    error={errors.email ? true : false}
                                    id="email" style={{ width: '100%' }} margin="dense" variant="outlined"
                                    helperText={errors.email ? <span>{t("Email")} {t('required')}</span> : null} />}
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Required',
                                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <div className={classes.labelField}>
                                <Typography variant="body2" component="span" >
                                    {t('Restaurant_number')}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={8}>
                            <Controller
                                name="phone_number"
                                as={<TextField
                                    error={errors.phone_number ? true : false}
                                    id="phone_number" style={{ width: '100%' }} margin="dense" variant="outlined"
                                    helperText={errors.phone_number ? <span>{t('Restaurant_number')} {t('required')}</span> : null} />}
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Required',
                                }}
                            />
                        </Grid>


                        <Grid item xs={12} sm={6} md={4}>
                            <div className={classes.labelField}>
                                <Typography variant="body2" component="span" >
                                    {t('Restaurant_address')}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={8}>
                            <Controller
                                name="address"
                                as={<TextField
                                    error={errors.address ? true : false}
                                    id="address" style={{ width: '100%' }} margin="dense" variant="outlined"
                                    helperText={errors.address ? <span>{t('Address')} {t('required')}</span> : null} />}
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Required',
                                }}
                            />
                        </Grid>


                        <Grid item xs={12} sm={6} md={4}>
                            <div className={classes.labelField}>
                                <Typography variant="body2" component="span" >
                                    {t('zipCode.label')}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={8}>
                            <Controller
                                name="zip_code"
                                as={<TextField
                                    error={errors.zip_code ? true : false}
                                    id="zip_code" style={{ width: '100%' }} margin="dense" variant="outlined"
                                    helperText={errors.zip_code ? <span>{t('zipCode.label')}  {t('required')}</span> : null} />}
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Required',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <div className={classes.labelField}>
                                <Typography variant="body2" component="span" >
                                    {t('Default')} {t('type')}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={8}>

                            <FormControl error={errors.invoice_type ? true : false} style={{ width: "100%" }} margin="dense" variant="outlined" className={classes.formControl}>
                                {/* <InputLabel id="demo-simple-select-label">Status</InputLabel> */}
                                <Controller
                                    defaultValue={(props.invoice_type && props.data.invoice_type) ? props.data.invoice_type : ""}

                                    name="invoice_type"
                                    as={<Select
                                        labelId="demo-simple-select-label"
                                        id="invoice_type"


                                    >
                                        <MenuItem value={'DINNING'}>{t('DINNING')} </MenuItem>
                                        <MenuItem value={'TAKE_AWAY'}>{t('TAKE_AWAY')}</MenuItem>

                                    </Select>} control={control}

                                    rules={{
                                        required: 'required'
                                    }}
                                />
                                <FormHelperText error>{errors.status ? <span>{t('Default')} {t('type')} {t('required')} </span> : null}</FormHelperText>
                            </FormControl>

                        </Grid>


                        <Grid item xs={12} sm={6} md={4}>
                            <div className={classes.labelField}>
                                <Typography variant="body2" component="span" >
                                    {t('default_vat_label')}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={8}>
                            <Controller
                                name="vat_label"
                                as={<TextField
                                    error={errors.vat_label ? true : false}
                                    id="vat_label" style={{ width: '100%' }} margin="dense" variant="outlined"
                                    helperText={errors.vat_label ? <span>{t('default_vat_label')} {t('required')}</span> : null} />}
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Required',
                                }}
                            />
                        </Grid>



                        <Grid item xs={12} sm={6} md={4}>
                            <div className={classes.labelField}>
                                <Typography variant="body2" component="span" >
                                    {t('Default_Take_Away_Tax')}

                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={8}>
                            <Controller
                                name="vat_take_away"
                                as={<TextField
                                    error={errors.vat_take_away ? true : false}
                                    id="vat_take_away" style={{ width: '100%' }} margin="dense" variant="outlined"
                                    helperText={errors.vat_take_away ? <span> {t('Default_Take_Away_Tax')} {t('required')}</span> : null} />}
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Required',
                                }}
                            />
                        </Grid>



                        <Grid item xs={12} sm={6} md={4}>
                            <div className={classes.labelField}>
                                <Typography variant="body2" component="span" >

                                    {t('Default_Dining_Tax')}
                                </Typography>
                            </div>
                        </Grid>
                       
                        <Grid item xs={12} sm={6} md={8}>
                            <Controller
                                name="vat_din_in"
                                as={<TextField
                                    error={errors.vat_din_in ? true : false}
                                    id="vat_din_in" style={{ width: '100%' }} margin="dense" variant="outlined"
                                    helperText={errors.vat_din_in ? <span>    {t('Default_Dining_Tax')}    {t('required')}</span> : null} />}
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Required',
                                }}
                            />
                        </Grid>





                        <Grid item xs={12} sm={6} md={4}>
                            <div className={classes.labelField}>
                                <Typography variant="body2" component="span" >
                                    {t('Invoice_Footer_Line')}

                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={8}>
                            <Controller
                                name="invoice_footer_line"
                                as={<TextField
                                    error={errors.invoice_footer_line ? true : false}
                                    id="invoice_footer_line" style={{ width: '100%' }} margin="dense" variant="outlined"
                                    helperText={errors.invoice_footer_line ? <span>{t('Invoice_Footer_Line')}   {t('required')}</span> : null} />}
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Required',
                                }}
                            />
                        </Grid>


                        <Grid item xs={12} sm={6} md={4}>
                            <div className={classes.labelField}>
                                <Typography variant="body2" component="span" >
                                    {t('activate_bonus_point_system.label')}

                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={8}>
                        <FormControl error={errors.bonus_system ? true : false} style={{ width: "100%" }} margin="dense" variant="outlined" className={classes.formControl}>
                                {/* <InputLabel id="demo-simple-select-label">Status</InputLabel> */}
                                <Controller
                                    defaultValue={(props.bonus_system && props.data.bonus_system) ? props.data.bonus_system : ""}

                                    name="bonus_system"
                                    as={<Select
                                        labelId="demo-simple-select-label"
                                        id="bonus_system"


                                    >
                                        <MenuItem value="1">{t('Active')} </MenuItem>
                                        <MenuItem value="0">{t('In-Active')}</MenuItem>

                                    </Select>} control={control}

                                    rules={{
                                        required: 'required'
                                    }}
                                />
                                <FormHelperText error>{errors.bonus_system ? <span>{t('activate_bonus_point_system.label')} {t('required')} </span> : null}</FormHelperText>
                            </FormControl>

                        </Grid>


                        <Grid item xs={12} sm={6} md={4}>
                            <div className={classes.labelField}>
                                <Typography variant="body2" component="span" >
                                    {t('Restaurant_LOGO')}

                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={8}>
                            <input
                                accept="image/*"

                                onChange={handleImage}
                                id="raised-button-file"
                                type="file"
                            />
                        </Grid>


                        <Grid item xs={12} sm={12} md={12}>
                            <div className={classes.submitButton}>
                                <Button type="submit" color="primary" variant="contained">{t("submit.label")}</Button>
                            </div>
                        </Grid>


                    </Grid>
                </form>
            </div>

        </div>
    )
}
