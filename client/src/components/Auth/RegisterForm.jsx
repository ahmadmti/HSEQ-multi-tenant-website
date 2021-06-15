import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
export default function RegisterForm() {
    const classes = useStyles();
    const { t, i18n } = useTranslation();
    let history = useHistory();
    function handleClick() {
        history.push("/");
    }
    return (
        <div>
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label={t('firstName.label')}
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label={t('lastName.label')}
                            name="lastName"
                            autoComplete="lname"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label={t('email.label')}
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label={t('password.label')}
                            type="password"
                            id="password"
                            // autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="confirm_password"
                            label={t('confirm_password.label')}
                            type="password"
                            id="confirm_password"
                            // autoComplete="current-password"
                        />
                    </Grid>

                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleClick}
                >
                    {t('signUp.label')}
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link to="/" variant="body2">
                            {t('alreadyAccount.label')} {t('signIn.label')}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}
