import React ,{ useContext, useEffect } from 'react'
import { Box, Grid, Button, TextField, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from "react-hook-form";
import { addBonus, updateBonus } from '../../../api/api.js'
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';

const useStyle = makeStyles((theme) => ({
    textField: {
        width: '100%'
    }
}))

const FormGroup = styled.div`
    width:50%;
    display:table;
   margin:0 auto;
`;

const ButtonBlock = styled.div`
   display:flex;
   justify-content:center;
   
`;

export default function AddBonusPointForm(props) {
    const classes = useStyle();
    const { register, reset, setValue, control, handleSubmit, errors } = useForm();
    const toastOptions = useContext(ToastContext);
    const { t } = useTranslation();
    const [isAddEdit, setIsAddEdit] = React.useState(false);
    const dispatch = useDispatch();
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
        addBonus(data).then((res) => {
            dispatch(toggle());
            toast.success(res.data.message, toastOptions);
            reset({});
            
        })
            .catch(err => {
                dispatch(toggle());
                toast.error(err.response.data.error, toastOptions);
            })
    }

    const update = (data) => {
        dispatch(toggle());

        updateBonus(data).then((res) => {
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
            setValue('Amount_From', props.data.amt_from)
            setValue('Amount_to', props.data.amt_to)
            setValue('Points', props.data.points)
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
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={3} >

                                <Grid item md={12} sm={12} xs={12} >
                                    <FormGroup>
                                    <Controller
                                            name="Amount_From"
                                            as={<TextField
                                                error={errors.Amount_From ? true : false}
                                                id="Amount_From" type="number" style={{ width: '100%' }} margin="dense" variant="outlined"
                                                label={t('Amount_From.label')} helperText={errors.Amount_From ? <span>{t('Amount_From.label')} {t('required')}</span> : null} />}
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'Required',
                                            }}
                                        />
                                    </FormGroup>
                                </Grid>

                                <Grid item md={12} sm={12} xs={12} >
                                    <FormGroup>
                                    <Controller
                                            name="Amount_to"
                                            as={<TextField
                                                error={errors.Amount_to ? true : false}
                                                id="Amount_to" type="number" style={{ width: '100%' }} margin="dense" variant="outlined"
                                                label={t('Amount_to.label')} helperText={errors.Amount_to ? <span>{t('Amount_to.label')} {t('required')}</span> : null} />}
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'Required',
                                            }}
                                        />
                                    </FormGroup>
                                </Grid>

                                <Grid item md={12} sm={12} xs={12} >
                                    <FormGroup>
                                    <Controller
                                            name="Points"
                                            as={<TextField
                                                error={errors.Points ? true : false}
                                                id="Points" type="number" style={{ width: '100%' }} margin="dense" variant="outlined"
                                                label={t('Points.label')} helperText={errors.Points ? <span>{t('Points.label')} {t('required')}</span> : null} />}
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'Required',
                                            }}
                                        />
                                     
                                    </FormGroup>
                                </Grid>

                                <Grid item md={12} sm={12} xs={12}>
                                    <ButtonBlock>
                                        <Button type="submit" variant="contained" color="primary">
                                        {t('submit.label')}
                                         </Button>
                                    </ButtonBlock>

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
