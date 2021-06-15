import React, { useEffect, useContext } from 'react'
import $ from 'jquery';
import { getUsers, removeUser } from '../../../api/api';
import ToastContext from '../../../context/ToastContext';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Modal from '../SharedComponent/Modal';
import EditUser from './AddUser';
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';

export default function TableList() {

    const [user, setUser] = React.useState([]);
    const toastOptions = useContext(ToastContext);
    const [editModal, setEditModal] = React.useState(false);
    const [editRow, setEditRow] = React.useState({});
    const { t } = useTranslation();
    const dispatch = useDispatch();
    useEffect(() => {
        // 
        users();
    }, [])

    const removeItem = (id) => {
        dispatch(toggle())
        removeUser(id)
            .then((res) => {
                dispatch(toggle())
                toast.success(res.data.message, toastOptions);
                $('#user_table').dataTable().fnDestroy();
                users()
            })
            .catch(err => {
                console.log(err);
                dispatch(toggle())
                if (err.response && err.response.data)
                    toast.error(err.response.data.error, toastOptions);
            })
    }
    const editItem = (item) => {
        setEditRow({ ...item });
        setEditModal(true)
    }

    const recordUpdate = () => {

        // table.empty();
        $('#user_table').dataTable().fnDestroy();
        users();
        setEditModal(false);
    }

    const users = () => {
        dispatch(toggle())
        getUsers()
            .then(res => {
                dispatch(toggle())
                setUser([...res.data.users]);

                if ($.fn.dataTable.isDataTable('#user_table')) {

                    $('#user_table').DataTable({
                        "oLanguage": {
                            "sInfo": t("sInfo"),
                            "sZeroRecords": t('sZeroRecords'),
                            "sInfoEmpty": t("sInfoEmpty"),
                            "sEmptyTable": t('sEmptyTable'),
                            "oPaginate": {
                                "sFirst": t('sFirst'),
                                "sPrevious": t('sPrevious'),
                                "sNext": t('sNext'),
                                "sLast": t('sLast'),
                            },
                            "sSearch": t('tabel.sSearch'),
                            "Show": t('tabel.Show'),
                            "sLengthMenu": t('tabel.Show') + " _MENU_ " + t('tabel.entries'),
                            "sInfoFiltered": "(" + t('filteredFrom') + " _MAX_ " + t('total_records') + ")",

                        }
                    });
                }
                else {
                    $('#user_table').DataTable({
                        paging: true,
                        "oLanguage": {
                            "sInfo": t("sInfo"),
                            "sZeroRecords": t('sZeroRecords'),
                            "sInfoEmpty": t("sInfoEmpty"),
                            "sEmptyTable": t('sEmptyTable'),
                            "oPaginate": {
                                "sFirst": t('sFirst'),
                                "sPrevious": t('sPrevious'),
                                "sNext": t('sNext'),
                                "sLast": t('sLast'),
                            },
                            "sSearch": t('tabel.sSearch'),
                            "Show": t('tabel.Show'),
                            "sLengthMenu": t('tabel.Show') + " _MENU_ " + t('tabel.entries'),
                            "sInfoFiltered": "(" + t('filteredFrom') + " _MAX_ " + t('total_records') + ")",

                        }
                    });
                }
                console.log(res);
            })
            .catch(err => {
                dispatch(toggle())
                console.log(err);

            })
    }
    return (
        <div>
            <table id="user_table" className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>{t('Sr.#')}</th>
                        <th>{t('Name')}</th>
                        <th>{t("email.label")}</th>
                        <th>{t('phone.label')}</th>
                        <th>{t('Roles')}</th>
                        <th>{t('Action')}</th>

                    </tr>
                </thead>
                <tbody>

                    {
                        user.map((item, index) => {
                            return (<tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.fname + item.lname}</td>
                                <td>{item.email}</td>
                                <td>{item.phone_no}</td>
                                <td>{item.role_name}</td>
                                <td>
                                    <ButtonGroup size="small" variant="contained">
                                        <Button color="primary" onClick={() => editItem(item)}><EditIcon /></Button>
                                        <Button color="primary" onClick={() => removeItem(item.id)}><DeleteIcon /></Button>
                                    </ButtonGroup>
                                </td>
                            </tr>);
                        })
                    }
                </tbody>

            </table>
            <Modal title={t("update_user")} open={editModal} close={() => setEditModal(false)}>
                <EditUser data={editRow} onFormSubmit={() => recordUpdate()} />
            </Modal>
        </div>
    )
}
