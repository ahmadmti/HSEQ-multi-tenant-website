import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { sendForgotEmailLink } from '../../api/api.js'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function ForgotPasswordForm() {
  const classes = useStyles()
  let history = useHistory()
  const { control, handleSubmit, errors } = useForm()
  const [length, setLength] = React.useState(0)
  const [lengthTrue, setLengthTrue] = React.useState(false)

  const { t } = useTranslation()

  const onSubmit = (data) => {

    sendForgotEmailLink(data)
      .then((res) => {
        // console.log(res);
        toast.success(res.data.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        history.push('/login')
    

      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.response.data.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classes.form}
        noValidate
      >
        <Controller
          name="email"
          as={
            <TextField
              variant="outlined"
              id="email"
              margin="normal"
              error={errors.email ? true : false}
              helperText={
                errors.email ? (
                  <span>{t("email.label")} {t("required")}  & {t("email.label")}  {t("valid")}</span>
                ) : null
              }
              fullWidth
              label={t('email.label')}
              autoComplete="email"
              autoFocus
            />
          }
          control={control}
          defaultValue=""
          rules={{
            required: 'required',
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          }}
        />
    
  
      
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {t('forgotPasswordRecovery.label')}
        </Button>
     
      </form>
    </div>
  )
}
