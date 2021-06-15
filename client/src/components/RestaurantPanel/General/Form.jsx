import React from 'react'
import { Box, MenuItem, Select, Input, InputLabel, FormControl, Divider, FormControlLabel, Checkbox, Grid, Button, TextField, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import App from "../SharedComponent/CkEditor";
import { useTranslation } from 'react-i18next'

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 }];
    const useStyles = makeStyles({
        fileInput: {
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
        },
        formControl: {
            width: '100%'
        },
        chipRow: {
            display: "flex",
            flexWrap: "wrap"
        }
    });
export default function Form() {
    const { t, i18n } = useTranslation();

    const classes = useStyles();
    return (
        <React.Fragment>
            <Box component="div" m={0}>
                <Card >
                    <Container >
                        <CardContent>
                            <Grid container spacing={3} >

                                <Grid item md={6} sm={6} xs={12} >
                                    <TextField style={{ width: '100%' }} margin="dense" variant="outlined"  label={t('surname.label')} />
                                </Grid>

                                <Grid item md={6} sm={6} xs={12} >
                                    <TextField style={{ width: '100%' }} margin="dense" variant="outlined"  label={t('phone.label')} />
                                </Grid>

                                <Grid item md={6} sm={6} xs={12} >
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={top100Films}
                                        getOptionLabel={(option) => option.title}

                                        renderInput={(params) => <TextField {...params} label={t('city.label')} margin="dense" variant="outlined" />}
                                    />
                                </Grid>

                                <Grid item md={6} sm={6} xs={12} >
                                <Autocomplete
                                        id="combo-box-demo"
                                        options={top100Films}
                                        getOptionLabel={(option) => option.title}

                                        renderInput={(params) => <TextField {...params} label={t('zip_code.label')} margin="dense" variant="outlined" />}
                                    />
                                </Grid>
                                <Grid item md={6} sm={6} xs={12} >
                                <Autocomplete
                                        id="combo-box-demo"
                                        options={top100Films}
                                        getOptionLabel={(option) => option.title}

                                        renderInput={(params) => <TextField {...params} label={t('select_street.label')} margin="dense" variant="outlined" />}
                                    />
                                </Grid>
                                
                                <Grid item md={6} sm={6} xs={12} >
                                    <TextField style={{ width: '100%' }} margin="dense" variant="outlined"  label={t('house_number.label')}  />
                                </Grid>
                                <Grid item md={6} sm={6} xs={12} className={classes.fileInput}>
                                
                                    <TextField type="file" margin="dense" variant="outlined"  style={{ width: '100%' }} />
                                </Grid>
 
                                <Grid item md={6} sm={6} xs={12} >
                                <Autocomplete
                                        id="combo-box-demo"
                                        options={top100Films}
                                        getOptionLabel={(option) => option.title}

                                        renderInput={(params) => <TextField {...params} label={t('standard_order_type.label')} margin="dense" variant="outlined" />}
                                    />
                                </Grid>
                                
                                <Grid item md={6} sm={6} xs={12} >
                                    <TextField style={{ width: '100%' }} margin="dense" variant="outlined"  label={t('account_title.label')} />
                                </Grid>
                                
                                <Grid item md={6} sm={6} xs={12} >
                                    <TextField style={{ width: '100%' }} margin="dense" variant="outlined"  label={t('DE_IBAN.label')} />
                                </Grid>

                                <Grid item md={6} sm={6} xs={12} >
                                <Autocomplete
                                        id="combo-box-demo"
                                        options={top100Films}
                                        getOptionLabel={(option) => option.title}

                                        renderInput={(params) => <TextField {...params} label={t('package.label')} margin="dense" variant="outlined" />}
                                    />
                                     <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label={t('activate_bonus_point_system.label')}
                                        
                                    />
                                </Grid>
                                <Grid item md={6} sm={6} xs={12} >
                                <Autocomplete
                                        id="combo-box-demo"
                                        options={top100Films}
                                        getOptionLabel={(option) => option.title}

                                        renderInput={(params) => <TextField {...params} label={t('choose_bank.label')}  margin="dense" variant="outlined" />}
                                    />
                                     <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label={t('terms1.label')}
                                        
                                    />
                                     <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label={t('terms2.label')}
                                        
                                    />
                                     <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label={t('terms3.label')}
                                        
                                    />
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                <App></App>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                    <Button variant="contained"  color="primary">
                                        
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Container>
                </Card>
            </Box>
        </React.Fragment>
    )
}
