import React, { useEffect, useContext } from 'react'
import { Box, Grid, Button, Select, TextField, FormControl, InputLabel, MenuItem, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

import { useTranslation } from 'react-i18next';
import { useForm, Controller } from "react-hook-form";
import { getIngredientsCategory, getMenuSizes, addIngredients, updateIngredients } from "../../../api/api";
import { toast } from 'react-toastify';
import FormHelperText from '@material-ui/core/FormHelperText';
import ToastContext from '../../../context/ToastContext';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';



const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '100%'
    },
    formControlAlign: {
        display: 'flex',
        alignItems: 'center'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default function AddIngredientsForm(props) {

    const { control, handleSubmit, setValue, formState: { isValid }, reset, errors } = useForm({
        mode: "all",
        reValidateMode: "all",
        shouldUnregister: true
    });

    const [isAddEdit, setIsAddEdit] = React.useState(false);
    const toastOptions = useContext(ToastContext);
    const [Item, setItem] = React.useState([]);
    const [menuItem, setMenuItem] = React.useState([]);
    const { t } = useTranslation();
    const classes = useStyles();
    const dispatch = useDispatch();

    const getIngredientCategory = () => {
        dispatch(toggle())
        getIngredientsCategory()
            .then((res) => {
                dispatch(toggle())
                setItem([...res.data.ingredientCategories])
            })
            .catch((err) => {
                dispatch(toggle())
                toast.error(err.response.data.error);
            })
    };

    const getMenuSize = () => {
        dispatch(toggle())
        getMenuSizes()
            .then((res) => {
                dispatch(toggle())
                setMenuItem([...res.data.sizes])
            })
            .catch((err) => {
                dispatch(toggle())
                toast.error(err.response.data.error);
            })
    };
    const addEditMode = (data) => {
        console.log(data)
        if (data) {
            setValue('ingredients_name', props.data.name, { shouldValidate: true })
            setValue('category_id', props.data.ingredient_category_id, { shouldValidate: true })
            setValue('price', props.data.price, { shouldValidate: true })
            setValue('size_id', props.data.size_id, { shouldValidate: true })
            setIsAddEdit(true);
        }
    }
    useEffect(() => {
        getIngredientCategory();
        getMenuSize();
        if (props.data)
            addEditMode(props.data)
    }, [])



    const onSubmit = (data) => {
        if (!isAddEdit)
            create(data);
        else {
            data.id = props.data.id;
            update(data);
        }
    }
    const create = (data) => {
        dispatch(toggle())
        addIngredients(data).then((res) => {
            dispatch(toggle())
            toast.success(res.data.message, toastOptions);
            reset({
                'ingredients_name': '',
                'category_id': '',
                'price': '',
                'size_id': ''
            });
        }).catch((err) => {
            dispatch(toggle())
            toast.error(err.response.data.error, toastOptions);
        })
    };
    const update = (data) => {
        dispatch(toggle())
        updateIngredients(data).then((res) => {
            dispatch(toggle())
            toast.success(res.data.message, toastOptions);
            props.onFormSubmit();
            reset({
                'ingredients_name': '',
                'category_id': '',
                'price': '',
                'size_id': ''
            });
        }).catch((err) => {
            dispatch(toggle())
            toast.error(err.response.data.error, toastOptions);
        })
    };
    return (
        <React.Fragment>
            <Box component="div" m={0}>
                <Card >
                    <Container >
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                                <Grid container spacing={3} >

                                    <Grid item md={6} sm={6} xs={12} className={classes.formControlAlign}>
                                        <Controller
                                            name="ingredients_name"
                                            as={<TextField
                                                variant="outlined"
                                                margin="dense"
                                                error={errors.ingredients_name ? true : false}
                                                helperText={errors.ingredients_name ? <span>{t('ingredients.label')} {t('required')}</span> : null}

                                                style={{ width: '100%' }} label={t('ingredients.label')}
                                                type="text"
                                                id="ingredients_name"

                                            />}
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'required',
                                            }}
                                        />

                                    </Grid>
                                    <Grid item md={6} sm={6} xs={12} className={classes.formControlAlign}>
                                        <Controller
                                            name="price"
                                            as={<TextField
                                                variant="outlined"
                                                margin="dense"
                                                type="number"
                                                error={errors.price ? true : false}
                                                helperText={errors.price ? <span>{t('price.label')} {t('required')}</span> : null}
                                                style={{ width: '100%' }} label={t('price.label')}
                                                id="price"
                                            />}
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'required',
                                            }}
                                        />

                                    </Grid>

                                    <Grid item md={6} sm={6} xs={12} >
                                        <FormControl margin="dense" error={errors.category_id ? true : false} style={{ width: "100%" }}
                                            variant="outlined"  >
                                            <InputLabel >{t('category.label')}</InputLabel>
                                            <Controller
                                                name="category_id"
                                                as={<Select
                                                    defaultValue=""
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="category_id"

                                                    label={t('category.label')}
                                                >
                                                    {
                                                        Item.map((item, index) => {
                                                            return <MenuItem value={item.id} key={index}>
                                                                {item.name}
                                                            </MenuItem>
                                                        })
                                                    }
                                                </Select>}
                                                control={control}
                                                defaultValue=""
                                                rules={{
                                                    required: 'required',
                                                }}
                                            />
                                            <FormHelperText error>{errors.category_id ? <span>{t('category.label')} {t('required')}</span> : null}</FormHelperText>
                                        </FormControl>
                                    </Grid>

                                    <Grid item md={6} sm={6} xs={12} >
                                        <FormControl margin="dense" error={errors.size_id ? true : false} style={{ width: "100%" }}
                                            variant="outlined"  >
                                            <InputLabel >{t('size.label')}</InputLabel>
                                            <Controller
                                                name="size_id"
                                                as={<Select
                                                    defaultValue=""
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="size_id"

                                                    label={t('size.label')}
                                                >
                                                    {
                                                        menuItem.map((item, index) => {
                                                            return <MenuItem value={item.id} key={index}>
                                                                {item.name}
                                                            </MenuItem>
                                                        })
                                                    }
                                                </Select>}
                                                control={control}
                                                defaultValue=""
                                                rules={{
                                                    required: 'required',
                                                }}
                                            />
                                            <FormHelperText error>{errors.size_id ? <span>{t('size.label')} {t('required')}</span> : null}</FormHelperText>
                                        </FormControl>
                                    </Grid>

                                    <Grid item md={12} sm={12} xs={12}>
                                        <Button variant="contained" type="submit" color="primary" disabled={!isValid}>
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
