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
    },
    titleWrapper: {

        marginBottom: '20px'
    },
    title: {
        margin: 0,
        paddingTop: '5px',
        display: "flex",
        alignItems: "center",
        textTransform: "uppercase"
    }

});

export default function PageHeadTitle(props) {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Card className={classes.root, classes.titleWrapper}>
            <CardContent>
                <Typography variant="h6" className={classes.title} color="textSecondary" >
                    {props.title}
                </Typography>
            </CardContent>
        </Card>
    );
}