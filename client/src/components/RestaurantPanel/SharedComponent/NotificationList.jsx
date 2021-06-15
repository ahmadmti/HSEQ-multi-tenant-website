import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MenuItem from "@material-ui/core/MenuItem";
import NotificationsIcon from '@material-ui/icons/Notifications';
import Modal from './Modal';
import NotificationModal from './NotificationModal'
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
        color: '#d5d0d0'
    },
}));

const MenuList = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const [modal, setModal] = React.useState(false);
    const [notificationData, setNotificationData] = React.useState({});

    const createMarkup = (content) => {
        return { __html: content };
    }
    console.log(props.data);

    const openDetailModel = (data) => {
        setModal(true);
        setNotificationData({ ...data })
    }
    return (<React.Fragment>
        <MenuItem onClick={() => openDetailModel(props.data)}>
            <ListItem className={props.data.notification_type.toLowerCase()} divider alignItems="flex-start" disableGutters dense={true}>
                <ListItemAvatar>
                    <NotificationsIcon />
                </ListItemAvatar>
                <ListItemText

                    primary={props.data.title}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                            >
                                <span dangerouslySetInnerHTML={createMarkup(props.data.description)} className='editor'></span>
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>

        </MenuItem>
        <Modal title={t('notification')} maxWidth={'lg'} open={modal} close={() => setModal(false)} >
            <NotificationModal notification={notificationData} readNotification={() => props.readNotification()} close={() => setModal(false)} />
        </Modal>
    </React.Fragment>);
}


export default function NotificationList(props) {
    const classes = useStyles();
    const { t } = useTranslation();


    return (

        <List className={classes.root}>
            {
                props.notifications.length > 0 ?
                    props.notifications.map((item, index) => <MenuList readNotification={() => props.readNotification()} key={index} data={item} />)
                    :
                    <MenuItem>{t("noNotification")}</MenuItem>
            }


        </List>
    );
}