import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import PageHeadTitle from '../CompanyPanel/SharedComponent/PageHeadTitle'
import { Box, Grid, Button, TextField, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useForm, Controller } from "react-hook-form";
import { changePassword } from "../../api/api";
import { toast } from 'react-toastify';
import ToastContext from '../../context/ToastContext';
import { useDispatch } from "react-redux";
import { toggle } from '../../actions/pacerActions';

import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function ChangePassword() {
  const classes = useStyles()
  const dispatch = useDispatch();
  const [length, setLength] = React.useState(0)
  const [lengthTrue, setLengthTrue] = React.useState(false)

  const [value, setNameValue] = React.useState('')

  const toastOptions = useContext(ToastContext);
  const { control, handleSubmit, formState: { isValid }, reset, errors } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldUnregister: true
  });

  const onSubmit = (data) => {
    setLengthTrue(true)
    dispatch(toggle())
    changePassword(data).then((res) => {
      dispatch(toggle())
      toast.success(res.data.message, toastOptions);
      reset({ 'old_password': '', 'new_password': '' });
    }).catch((err) => {
      dispatch(toggle())
      toast.error(err.response.data.error, toastOptions);
    })
  }

  return (
    <div>
      <PageHeadTitle title="Change Password"></PageHeadTitle>
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
                          name="old_password"
                          as={<TextField
                            variant="outlined"
                            margin="dense"

                            error={errors.old_password ? true : false}
                            helperText={errors.old_password ? <span>Old Password is required</span> : null}

                            style={{ width: '70%' }} label={'Old Password'}
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

                    <Grid item md={12} sm={12} xs={12}  >
                      <div className="text-center">
                        <Controller
                          name="new_password"
                          as={<TextField
                            variant="outlined"
                            margin="dense"
                            onInput={(e) => {
                              setLength(e.target.value.length)
                            }}
                            error={errors.new_password ? true : false}
                            helperText={errors.new_password ? <span>New Password is required</span> : null}

                            style={{ width: '70%' }} label={'New Password'}
                            type="text"
                            id="text"

                          />}
                          control={control}
                          defaultValue=""
                          rules={{
                            required: 'required',
                          }}
                        />
                        {lengthTrue ? (
                          length < 8 ? (
                            <p style={{ marginTop: 0, color: 'red' }}>
                              Minimum length of Password is 8
                            </p>
                          ) : null
                        ) : null}
                      </div>

                    </Grid>


                    <Grid item md={12} sm={12} xs={12} className="text-center">
                      <Button disabled={!isValid} variant="contained" type="submit" color="primary">
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Container>
          </Card>
        </Box>
      </React.Fragment>
    </div>
  )
}
