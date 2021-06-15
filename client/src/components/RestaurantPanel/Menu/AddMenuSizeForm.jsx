import React, { useEffect, useContext } from 'react'
import { Box, Grid, Button, TextField, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useForm, Controller } from "react-hook-form";
import { addMenuItems, updateMenuItems } from "../../../api/api";
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';
import { useTranslation } from 'react-i18next';


export default function AddMenuSizeForm(props) {



    const { t } = useTranslation();

    const [isAddEdit, setIsAddEdit] = React.useState(false);
    const dispatch = useDispatch();

    const toastOptions = useContext(ToastContext);
    const { control, handleSubmit, formState: { isValid }, setValue, reset, errors } = useForm({
        mode: "all",
        reValidateMode: "all",
        shouldUnregister: true
    });

    const addEditMode = (data) => {
        if (data) {
            setValue('size_name', props.data.name)
            setIsAddEdit(true);
        }
    }
    useEffect(() => {
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
        addMenuItems(data).then((res) => {
            dispatch(toggle())
            toast.success(res.data.message, toastOptions);
            reset({ 'size_name': '' });
        }).catch((err) => {
            dispatch(toggle())
            toast.error(err.response.data.error, toastOptions);
        })
    };
    const update = (data) => {
        dispatch(toggle())
        updateMenuItems(data).then((res) => {
            dispatch(toggle())
            toast.success(res.data.message, toastOptions);
            props.onFormSubmit();
            reset({ 'size_name': '' });
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

                                    <Grid item md={12} sm={12} xs={12}  >
                                        <div className="text-center">
                                            <Controller
                                                name="size_name"
                                                as={<TextField
                                                    variant="outlined"
                                                    margin="normal"

                                                    error={errors.size_name ? true : false}
                                                    helperText={errors.size_name ? <span>{t('size_name')} {t("required")}</span> : null}

                                                    style={{ width: '70%' }} label={t('size_name')}
                                                    type="text"
                                                    id="text"

                                                />}
                                                control={control}
                                                defaultValue=""
                                                rules={{
                                                    required: 'required',
                                                }}
                                            />
                                        </div>

                                    </Grid>


                                    <Grid item md={12} sm={12} xs={12} className="text-center">
                                        <Button disabled={!isValid} variant="contained" type="submit" color="primary">
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
