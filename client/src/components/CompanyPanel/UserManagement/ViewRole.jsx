import React, { useEffect, useContext } from 'react'
import $ from 'jquery';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
// import { getUserRole, updateRole, removeRole } from '../../../api/api';
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import Modal from '../SharedComponent/Modal';
import { useForm, Controller } from "react-hook-form";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import PermissionsTable from './PermissionsTable';
import { makeStyles } from '@material-ui/core/styles';
import ReplayIcon from '@material-ui/icons/Replay';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';

const useStyles = makeStyles((theme) => ({

    addButton: {
        width: '100%',
        padding: '5px',
        display: 'flex',
        justifyContent: 'flex-end'
    },

}));

export default function TableList() {

    const [rolesLits, setRoles] = React.useState([]);
    const toastOptions = useContext(ToastContext);
    const [editRoleModal, setEditRoleModal] = React.useState(false);
    const [editRoleRow, setEditRoleRow] = React.useState({});
    const [permissionModal, setPermissionModal] = React.useState(false);
    const [permission, setPermission] = React.useState({});
    const classes = useStyles();
    const dispatch = useDispatch();
    const { register, reset, formState: { isValid }, setValue, control, handleSubmit, errors } = useForm({
        mode: "all",
        reValidateMode: "all",
        shouldUnregister: true
    });

    useEffect(() => {
        roles()

    }, []);

    const roles = () => {
        dispatch(toggle())
        // getUserRole()
        //     .then(res => {
        //         dispatch(toggle())
        //         setRoles([...res.data.roles]);

        //         if ($.fn.dataTable.isDataTable('#role_table')) {

        //             $('#role_table').DataTable({
        //                 "oLanguage": {
        //                     "sInfo": t("sInfo"),
        //                     "sZeroRecords": t('sZeroRecords'),
        //                     "sInfoEmpty": t("sInfoEmpty"),
        //                     "sEmptyTable": t('sEmptyTable'),
        //                     "oPaginate": {
        //                         "sFirst": t('sFirst'),
        //                         "sPrevious": t('sPrevious'),
        //                         "sNext": t('sNext'),
        //                         "sLast": t('sLast'),
        //                     },
        //                     "sSearch": t('tabel.sSearch'),
        //                     "Show": t('tabel.Show'),
        //                     "sLengthMenu": t('tabel.Show') + " _MENU_ " + t('tabel.entries'),
        //                     "sInfoFiltered": "(" + t('filteredFrom') + " _MAX_ " + t('total_records') + ")",

        //                 }
        //             });
        //         }
        //         else {
        //             $('#role_table').DataTable({
        //                 paging: true,
        //                 "oLanguage": {
        //                     "sInfo": t("sInfo"),
        //                     "sZeroRecords": t('sZeroRecords'),
        //                     "sInfoEmpty": t("sInfoEmpty"),
        //                     "sEmptyTable": t('sEmptyTable'),
        //                     "oPaginate": {
        //                         "sFirst": t('sFirst'),
        //                         "sPrevious": t('sPrevious'),
        //                         "sNext": t('sNext'),
        //                         "sLast": t('sLast'),
        //                     },
        //                     "sSearch": t('tabel.sSearch'),
        //                     "Show": t('tabel.Show'),
        //                     "sLengthMenu": t('tabel.Show') + " _MENU_ " + t('tabel.entries'),
        //                     "sInfoFiltered": "(" + t('filteredFrom') + " _MAX_ " + t('total_records') + ")",

        //                 }
        //             });
        //         }

        //     })
        //     .catch(err => {
        //         dispatch(toggle());
        //         toast.error(err.response.data.error, toastOptions)
        //     });
    }
    const edit = (data) => {
        setEditRoleModal(true);
        setEditRoleRow(data);
        setValue('role_name', data.name)
    }

    const onSubmit = (data) => {
        data.id = editRoleRow.id;
        dispatch(toggle())
        // updateRole(data)
        //     .then(res => {
        //         dispatch(toggle())
        //         roles();
        //         setEditRoleModal(false);
        //         $('#role_table').dataTable().fnDestroy();
        //         toast.success(res.data.message, toastOptions);
        //     })
        //     .catch(err => {
        //         dispatch(toggle());
        //         toast.error(err.response.data.error, toastOptions)
        //     });
    }

    const remove = (id) => {
        dispatch(toggle());
        // removeRole(id)
        //     .then(res => {
        //         dispatch(toggle());
        //         $('#role_table').dataTable().fnDestroy();
        //         toast.success(res.data.message, toastOptions);
        //         roles();

        //     })
        //     .catch(err => {
        //         dispatch(toggle());
        //         toast.error(err.response.data.error, toastOptions)
        //     });
    }

    const showPermission = (data) => {
        setPermission({ ...data });
        setPermissionModal(true);
    }

    const refresh = () => {
        $('#role_table').dataTable().fnDestroy();
        roles();

    }

    return (
        <div>
            <div className={classes.addButton}>
                <Button variant="contained" color="primary" onClick={refresh}><ReplayIcon />Refresh</Button>
            </div>
            <table id="role_table" className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Sr.#</th>
                        <th>Roles</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rolesLits.map((role, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{role.name}</td>
                                    <td>
                                        <ButtonGroup size="small" variant="contained">
                                            <Button color="primary" onClick={() => showPermission(role)}><VisibilityIcon /></Button>
                                            <Button color="primary" onClick={() => edit({ id: role.id, name: role.name })}><EditIcon /></Button>
                                            <Button color="primary" onClick={() => remove(role.id)}><DeleteIcon /></Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>

            </table>



            <Modal title={'Roles Privilgs'} open={permissionModal} close={() => setPermissionModal(false)}>
                <PermissionsTable data={permission} />
            </Modal>


            <Modal title={'Update Role'} open={editRoleModal} close={() => setEditRoleModal(false)}>
                <Grid container spacing={0} >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid item md={12} sm={12} xs={12}  >
                            <div className="text-center">
                                <Controller
                                    name="role_name"
                                    as={<TextField id="role_name" margin="dense" variant="outlined"
                                        error={errors.role_name ? true : false}

                                        style={{ width: '100%' }} label={'Role Name'}
                                        helperText={errors.role_name ? <span>Role Name Is required</span> : null} />} control={control}
                                    defaultValue={editRoleRow.name}
                                    rules={{
                                        required: 'Required',
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <div className="text-center">
                                <Button disabled={!isValid} type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </div>
                        </Grid>
                    </form>
                </Grid>
            </Modal>
        </div>
    )
}
