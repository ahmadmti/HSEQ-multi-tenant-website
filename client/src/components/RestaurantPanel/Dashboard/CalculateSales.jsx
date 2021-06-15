import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    subtitle: {
        paddingTop: '5px',
    },
    title: {
        margin: 0,
        fontSize: '16px',
        fontWeight: 'bold',
        color: 'white',
        paddingTop: '5px',
        display: "flex",
        alignItems: "center",
        textTransform: "uppercase"
    }

});

export default function CalculateSales(props) {
    const classes = useStyles();
    const { t, i18n } = useTranslation();

    return (
        <div className={classes.root, classes.titleWrapper}>
            <Typography variant="body2" className={classes.title}  >
                {t(`${camelize(props.title.toLowerCase())}.label`)}
            </Typography>

            <Typography variant="body2" className={classes.subtitle}  >
                {props.ammount}
            </Typography>
        </div>
    );
}