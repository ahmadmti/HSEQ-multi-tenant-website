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
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';
import Chip from '@material-ui/core/Chip';

export default function TableList() {

    const [user, setUser] = React.useState([]);
    const toastOptions = useContext(ToastContext);
    const [editModal, setEditModal] = React.useState(false);
    const [editRow, setEditRow] = React.useState({});
    const dispatch = useDispatch();
    useEffect(() => {
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

                    $('#user_table').DataTable();
                }
                else {
                    $('#user_table').DataTable();
                }
                console.log(res);
        })
                .catch (err => {
            dispatch(toggle())
            console.log(err);

        })
    }
    return (
        <div>
            <table id="user_table" className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Sr.#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Roles</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        user.map((item, index) => {
                            return (<tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone_no}</td>
                                <td>{item.role_name}</td>
                                <td>
                                {item.status ? <Chip label="Active" color="secondary" /> : <Chip label='In-Active' disabled />}
                                </td>
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
            <Modal title={'Update User'} open={editModal} close={() => setEditModal(false)}>
                <EditUser data={editRow} onFormSubmit={() => recordUpdate()} />
            </Modal>
        </div>
    )
}
