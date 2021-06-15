import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { login } from '../../api/api.js'
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

export default function LoginForm() {
  const classes = useStyles()
  let history = useHistory()
  const { control, handleSubmit, errors } = useForm()
  const [length, setLength] = React.useState(0)
  const [lengthTrue, setLengthTrue] = React.useState(false)

  const { t } = useTranslation()

  const onSubmit = (data) => {
    // console.log(data)
    setLengthTrue(true)
    login(data)
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
        localStorage.setItem(
          'auth_user',
          JSON.stringify({
            token: res.data.token,
            user: res.data.user,
          })
        )
        history.push('/restaurant')
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
        <Controller
          name="password"
          as={
            <TextField
              variant="outlined"
              margin="normal"
              error={errors.password ? true : false}
              helperText={
                errors.password ? <span>{t('password.label')} {t("required")}  </span> : null
              }
              fullWidth
              label={t('password.label')}
              type="password"
              id="password"
              onInput={(e) => {
                setLength(e.target.value.length)
              }}
              autoComplete="current-password"
            />
          }
          control={control}
          defaultValue=""
          rules={{
            required: 'required',
          }}
        />
        {lengthTrue ? (
          length < 8 ? (
            <p style={{ marginTop: 0, color: 'red' }}>
              {t("minLength")}
            </p>
          ) : null
        ) : null}

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label={t('rememberMe.label')}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {t('signIn.label')}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link  style={{textDecoration:"none"}}to={'/forgot-password'} variant="body2">
              {t('forgotPassword.label')}
            </Link>
          </Grid>
          <Grid item>
            {/* <Link to="/register" variant="body2">
              {t('donotHaveAccount.label')} {t('signUp.label')}
            </Link> */}
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
