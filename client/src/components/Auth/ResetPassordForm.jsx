import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory, Link, useParams } from 'react-router-dom'
import { resetPassword } from '../../api/api.js'
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

export default function ResetPasswordForm() {
  const classes = useStyles()
  let history = useHistory()
  const { control, handleSubmit, errors } = useForm()
  const [length, setLength] = React.useState(0)
  const [lengthTrue, setLengthTrue] = React.useState(false)
  let { id, token } = useParams();

  const onSubmit = (data) => {
    // data.id = id;
    // data.token = token;
    // setLengthTrue(true)
    // if (length >= "8") {
    //   resetPassword(data).then((res) => {
    //     // console.log(res);
    //     toast.success(res.data.message, {
    //       position: 'top-right',
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     })
    //     history.push('/login')


    //   })
    //     .catch((err) => {
    //       // console.log(err);
    //       toast.error(err.response.data.message, {
    //         position: 'top-right',
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //       })
    //     })
    // }


  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classes.form}
        noValidate
      >
        <Controller
          name="password"
          as={
            <TextField
              variant="outlined"
              margin="normal"
              error={errors.password ? true : false}
              helperText={
                errors.password ? <span>Password Is required  </span> : null
              }
              fullWidth
              label={'New Password'}
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
              Password Must b * character
            </p>
          ) : null
        ) : null}


        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Submit
        </Button>

      </form>
    </div>
  )
}
