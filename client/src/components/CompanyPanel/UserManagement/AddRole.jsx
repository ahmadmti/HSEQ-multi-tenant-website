import React, { useEffect, useContext } from 'react'
import { Box, Grid, Button, TextField, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import { getMenuItems, addRole } from '../../../api/api';
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import { useForm, Controller } from "react-hook-form";
import FormHelperText from '@material-ui/core/FormHelperText';
import { toggle } from '../../../actions/pacerActions';
import { useDispatch } from "react-redux";
import { camelize } from '../../../helper/helper';

const useStyles = makeStyles((theme) => ({
    fileInput: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    formControl: {
        width: '100%'
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
    chipRow: {
        display: "flex",
        flexWrap: "wrap"
    }
}));


export default function Form() {
    const classes = useStyles();
    const theme = useTheme();
    const [permission, setPermissions] = React.useState([]);
    const [items, setItems] = React.useState([]);
    const dispatch = useDispatch();

    const { register, reset, formState: { isValid }, setValue, control, handleSubmit, errors } = useForm({
        mode: "all",
        reValidateMode: "all",
        shouldUnregister: true
    });
    const toastOptions = useContext(ToastContext);

    const handleChange = (event) => {
        setPermissions(event.target.value);
        console.log(event.target.value);
    };

    const onSubmit = (data) => {
        dispatch(toggle());
        // addRole(data)
        //     .then(res => {
        //         dispatch(toggle());
        //         toast.success(res.data.message, toastOptions);
        //         reset({
        //             'role_name': '',
        //             'permissions': []
        //         });
        //         setPermissions([])
        //     })
        //     .catch(err => {
        //         console.log(err); dispatch(toggle());
        //         toast.error(err.response.data.error, toastOptions);

        //     })
    }

    useEffect(() => {
        getItems();
    }, []);

    const getItems = () => {
        dispatch(toggle());
        // getMenuItems()
        //     .then(res => {
        //         dispatch(toggle());
        //         setItems([...res.data.data])
        //         console.log(res);
        //     })
        //     .catch(err => {
        //         dispatch(toggle());
        //         console.log(err);
        //     })
    }



    return (
        <React.Fragment>
            <Box component="div" m={0}>
                <Card >
                    <Container >
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                                <Grid container spacing={3} >
                                    <Grid item md={12} sm={12} xs={12}  >
                                        <div className="text-center">
                                            <Controller
                                                name="role_name"
                                                as={<TextField id="role_name" margin="dense" variant="outlined"
                                                    error={errors.role_name ? true : false}
                                                    style={{ width: '70%' }} label={'Role Name'}
                                                    helperText={errors.role_name ? <span>Role is required</span> : null} />} control={control}
                                                defaultValue=""
                                                rules={{
                                                    required: 'Required',
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}  >
                                        <div className="text-center">
                                            <FormControl error={errors.permissions ? true : false} variant="outlined" style={{ width: '70%' }} className={classes.formControl}>
                                                <InputLabel id="demo-mutiple-chip-label">Permission</InputLabel>
                                                <Controller
                                                    name="permissions"
                                                    as={<Select
                                                        labelId="demo-mutiple-chip-label"
                                                        id="permissions"
                                                        multiple variant="outlined"
                                                        value={permission}
                                                        onChange={handleChange}
                                                        input={<Input id="select-multiple-chip" />}
                                                        renderValue={(selected) => (
                                                            <div className={classes.chips}>
                                                                {selected.map((value) => (
                                                                    <Chip key={value.id} label={'Role'} className={classes.chip} />
                                                                ))}
                                                            </div>
                                                        )}

                                                    >
                                                        {items.map((item, index) => {

                                                            return (item.children && item.children.length > 0) ?


                                                                item.children.map((child, i) => {
                                                                    return <MenuItem key={i + 'ii'} value={child}>
                                                                        {child.name}
                                                                    </MenuItem>
                                                                })


                                                                :

                                                                <MenuItem key={item.id + '9un'} value={item}>
                                                                    {item.name}
                                                                </MenuItem>







                                                        })}
                                                    </Select>} control={control}
                                                    defaultValue={[]}
                                                    rules={{
                                                        required: 'Required',
                                                    }}
                                                />
                                                <FormHelperText error>{errors.permissions ? <span>This is reqiured</span> : null}</FormHelperText>

                                            </FormControl>
                                        </div>
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <div className="text-center">
                                            <Button disabled={!isValid || permission.length < 0} type="submit" variant="contained" color="primary">
                                                Submit
                                            </Button>
                                        </div>
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
