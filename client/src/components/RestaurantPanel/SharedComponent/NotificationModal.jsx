import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { markAsRead as read } from '../../../api/api'
import ToastContext from '../../../context/ToastContext'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

export default function NotificationModal(props) {
  const classes = useStyles()
  const toastOption = React.useContext(ToastContext)
  const createMarkup = (content) => {
    return { __html: content }
  }
  const { t } = useTranslation();

  const markAsRead = () => {
    read(props.notification.join_id)
      .then((res) => {
        toast.success(res.data.message, toastOption);
        props.readNotification()
      })
      .catch((error) => {
        toast.error(error.response.data.error, toastOption)
      })
    console.log(props.notification.id)
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.notification.title}
        </Typography>
        <Typography variant="body2" component="div">
          <div
            dangerouslySetInnerHTML={createMarkup(
              props.notification.description
            )}
            className="editor"
          ></div>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" color="primary" onClick={markAsRead}>
          {t('markAsRead')}
        </Button>
      </CardActions>
    </Card>
  )
}
