import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next'
import Button from '@material-ui/core/Button';
import { changeLang } from '../../../api/api';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: '8px auto',
        minWidth: 120,
        width: '80%',
        display: "flex",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    titleHeading: {
        padding: '10px 0'
    },
    applyBox: {
        margin: '8px auto',
        width: '80%',
        display: "flex",
        justifyContent: 'flex-end'
    }
}));


export default function LangSetting() {
    const { t, i18n } = useTranslation();
    const classes = useStyles();
    const [lng, setLng] = React.useState(localStorage.getItem('default_lang') || '');

    const handleChange = (event) => {
        setLng(event.target.value);
    };


    const apply = () => {
        i18n.changeLanguage(lng);
        localStorage.setItem('default_lang', lng);
        changeLang(lng)
            .then(res => console.log(res))
            .catch(error => console.log(error))
    }
    return (
        <div>

            <Typography variant="subtitle2" component="h4" className={classes.titleHeading}>
                {t('selectLang')}:
            </Typography>

            <FormControl margin="dense" variant="outlined" className={classes.formControl}>
                <InputLabel id="select-outlined-label">  {t('selectLanguage')}</InputLabel>
                <Select
                    labelId="=select-outlined-label"
                    id="select-outlined"
                    value={lng}
                    onChange={handleChange}
                    label="Select language"
                >
                    <MenuItem value={'en'}>English</MenuItem>
                    <MenuItem value={'de'}>German</MenuItem>
                </Select>
            </FormControl>
            <div className={classes.applyBox}>
                <Button variant="contained" disabled={lng === localStorage.getItem('default_lang')} color="primary" onClick={apply}>
                    {t('apply')}
                </Button>
            </div>


        </div>
    )
}


