import React, { useEffect, useContext } from 'react'
import { Box, Grid, Button, TextField, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from "react-hook-form";
import { addIngredientsCategory, updateIngredientsCategory } from "../../../api/api";
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';

export default function AddIngredientsCategoryForm(props) {

    const { control, handleSubmit, setValue, formState: { isValid }, reset, errors } = useForm({
        mode: "all",
        reValidateMode: "all",
        shouldUnregister: true
    });
    const [isAddEdit, setIsAddEdit] = React.useState(false);

    const toastOptions = useContext(ToastContext);
    const dispatch = useDispatch();


    const create = (data) => {
        dispatch(toggle())
        addIngredientsCategory(data).then((res) => {
            dispatch(toggle())
            toast.success(res.data.message, toastOptions);
            reset({ 'category_name': '' });
        }).catch(err => {
            dispatch(toggle())
            toast.error(err.response.data.error, toastOptions);
        })
    }

    const update = (data) => {
        dispatch(toggle())
        updateIngredientsCategory(data).then((res) => {
            dispatch(toggle())
            toast.success(res.data.message, toastOptions);
            props.onFormSubmit();
            reset({ 'category_name': '' });
        })
            .catch(err => {
                dispatch(toggle())
                toast.error(err.response.data.error, toastOptions);
            })
    }

    const onSubmit = (data) => {

        if (!isAddEdit)
            create(data);
        else {
            data.id = props.data.id;
            update(data);
        }

    };
    const { t } = useTranslation();
    const addEditMode = (data) => {
        if (data) {
            setValue('category_name', props.data.name)
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
                            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                                <Grid container spacing={3} >

                                    <Grid item md={12} sm={12} xs={12}  >
                                        <div className="text-center">
                                            <Controller
                                                name="category_name"
                                                as={<TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    label={t("createIngredientsCategories.label")}
                                                    style={{ width: '70%' }}
                                                    type="text"
                                                    error={errors.category_name ? true : false}
                                                    helperText={errors.category_name ? <span>{t("createIngredientsCategories.label")} {t("required")}</span> : null}
                                                    id="category_name"

                                                />}
                                                control={control}
                                                defaultValue=""
                                                rules={{
                                                    required: 'Required',
                                                }}
                                            />

                                        </div>

                                    </Grid>


                                    <Grid item md={12} sm={12} xs={12} className="text-center">
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
