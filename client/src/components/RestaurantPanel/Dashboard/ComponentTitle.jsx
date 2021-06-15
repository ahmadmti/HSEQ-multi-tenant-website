import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next'
import { camelize } from '../../../helper/helper';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        padding: '5px !important',
    },

    titleWrapper: {
        background: '#ff6877',
        color: 'white',
        borderRadius: '5px',
        paddingLeft: '5px !important',
        marginBottom: '20px'
    },
    title: {
        margin: 0,
        color: 'white',
        paddingTop: '5px',
        display: "flex",
        alignItems: "center",
        textTransform: "uppercase"
    }

});

export default function ComponentTitle(props) {
    const classes = useStyles();
    const { t, i18n } = useTranslation();

    return (
        <div className={classes.root, classes.titleWrapper}>
            <Typography variant="h6" className={classes.title}  >
                {t(`${camelize(props.title.toLowerCase())}.label`)}
            </Typography>

        </div>
    );
}