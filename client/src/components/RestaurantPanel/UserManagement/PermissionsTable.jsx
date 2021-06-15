import React, { useContext, useEffect } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import { removeRolePermission } from '../../../api/api';
import Modal from '../SharedComponent/Modal';
import FormHelperText from '@material-ui/core/FormHelperText';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { getMenuItems, assignNewPermission } from '../../../api/api';
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';
import { camelize } from '../../../helper/helper';
import $ from 'jquery';


const useStyles = makeStyles((theme) => ({
    fileInput: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    formControl: {
        width: '100%'
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    addButton: {
        width: '100%',
        padding: '5px',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
    chipRow: {
        display: "flex",
        flexWrap: "wrap"
    }
}));


export default function PermissionsTable(props) {
    const toastOptions = useContext(ToastContext);
    const classes = useStyles();
    const [modal, setModal] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const [permission, setPermissions] = React.useState([]);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setPermissions(event.target.value);
    };

    const removePermission = (id) => {
        dispatch(toggle())
        removeRolePermission(id)
            .then(res => {
                $('#offers').dataTable().fnDestroy();

                dispatch(toggle())
                toast.success(res.data.message, toastOptions);
            })
            .catch(err => {
                dispatch(toggle())
                toast.error(err.response.data.message, toastOptions);
            })
    }

    useEffect(() => {
        getItems();
    }, []);

    const getItems = () => {
        dispatch(toggle())
        getMenuItems()
            .then(res => {
                dispatch(toggle())
                setItems([...res.data.data])
                toast.success(res.data.message, toastOptions);
            })
            .catch(err => {
                 dispatch(toggle())
                toast.error(err.response.data.error, toastOptions);
            })
    }

    const insertNewPermission = () => {
        dispatch(toggle())
        assignNewPermission(props.data.id, permission)
            .then(res => {
                dispatch(toggle())
                toast.success(res.data.message, toastOptions);
                setModal(false)
            })
            .catch(err => {
                dispatch(toggle())
                toast.error(err.response.data.error, toastOptions);
            })
    }

    return (
        <div>
            <div className={classes.addButton}>
                <Button variant="contained" color="primary" onClick={() => setModal(true)}>{t('Add')} </Button>
            </div>
            <table  className="table table-striped table-bordered">
                <thead>
                    <tr>
                    <th>{t('Sr.#')}</th>
                    <th>{t('Permission')}</th>
                        <th>{t('Action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.data.permissions.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>   {t(`${camelize(item.name.toLowerCase())}`)}</td>
                                    <td>
                                        <Button color="primary" onClick={() => removePermission(item.permission_id)} variant="contained">
                                            <DeleteIcon />
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>

            </table>
            <Modal title={t('newAssignPrivilieg')} open={modal} close={() => setModal(false)}>
                <Grid item md={12} sm={12} xs={12}  >
                    <div className="text-center">
                        <FormControl variant="outlined" style={{ width: '100%' }} className={classes.formControl}>
                            <InputLabel id="demo-mutiple-chip-label">{t("Privilege")}</InputLabel>
                            <Select
                                labelId="demo-mutiple-chip-label"
                                id="permissions"
                                multiple variant="outlined"
                                value={permission}
                                onChange={handleChange}
                                input={<Input id="select-multiple-chip" />}
                                renderValue={(selected) => (
                                    <div className={classes.chips}>
                                        {selected.map((value) => (
                                            <Chip key={value.id} label= {t(`${camelize(value.name.toLowerCase())}`)} className={classes.chip} />
                                        ))}
                                    </div>
                                )}

                            >
                                {items.map((item) => (
                                    <MenuItem key={item.id} value={item}>
                                        {t(`${camelize(item.name.toLowerCase())}`)} 
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText error></FormHelperText>

                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={12} sm={12} xs={12}  >
                    <div className="text-center">
                        <Button disabled={permission.length <= 0} onClick={insertNewPermission} variant="contained" color="primary">    {t('submit.label')}</Button>
                    </div>
                </Grid>
            </Modal>
        </div >
    )
}
