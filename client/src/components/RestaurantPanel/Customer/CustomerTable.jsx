import React, { useEffect, useContext } from 'react'
import $ from 'jquery';
import { getCustomers, removeCustomerById } from '../../../api/api'
import { toast } from 'react-toastify';
import Chip from '@material-ui/core/Chip';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ToastContext from '../../../context/ToastContext';
import EditForm from './AddCustomerForm';
import Modal from '../SharedComponent/Modal';
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';


export default function CustomerTable() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [customerList, setCustomerList] = React.useState([]);
    const [editModal, setEditModal] = React.useState(false);
    const [editRow, setEditRow] = React.useState({});
    const toastOptions = useContext(ToastContext);

    useEffect(() => {
        customers();
    }, [])

    const recordUpdate = () => {
        $('#customer_list_table').dataTable().fnDestroy();
        customers();
        setEditModal(false);
    }
    const customers = () => {
        dispatch(toggle())
        getCustomers()
            .then(res => {
                dispatch(toggle())
                setCustomerList([...res.data.customers]);
                // $('#customer_list_table').DataTable()
                if ($.fn.dataTable.isDataTable('#customer_list_table')) {

                    $('#customer_list_table').DataTable({
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
                    $('#customer_list_table').DataTable({
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
            })
            .catch(err => {
                dispatch(toggle())
                console.log(err);
                toast.error(err.response.data.message, toastOptions);
            })
    }

    const removeItem = (id) => {
        dispatch(toggle())
        removeCustomerById(id)
            .then((res) => {
                dispatch(toggle())
                toast.success(res.data.message, toastOptions);
                $('#customer_list_table').dataTable().fnDestroy();
                customers()
            })
            .catch(err => {
                dispatch(toggle())
                toast.error(err.response.data.error, toastOptions);
            })
    }
    const editItem = (item) => {
        setEditRow({ ...item });
        setEditModal(true)
    }

    return (
        <div>
            <div className="table-responsive">
                <table id="customer_list_table" className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>{t('Sr.#')}</th>
                            <th>{t('Name')}</th>
                            <th>{t("email.label")}</th>
                            <th>{t('phone.label')}</th>
                            {/* <th>Bouns Points</th> */}
                            <th>{t('address')}</th>
                            <th>{t("remarks.label")} </th>
                            <th>{t("status.label")}</th>
                            <th>{t('Action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customerList.map((customer, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{customer.id}</td>
                                        <td>{customer.name}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.phone_number}</td>
                                        {/* <td>Pending</td> */}
                                        <td>
                                            {customer.house_no},{customer.street_name},
                                    {customer.city_name}</td>
                                        <td>{customer.note}</td>
                                        <td>
                                            {customer.status ? <Chip label={t('Active')} color="secondary" /> : <Chip label={t('In-Active')} disabled />}
                                        </td>
                                        <td>
                                            <ButtonGroup size="small" variant="contained">
                                                <Button color="primary" onClick={() => editItem(customer)}><EditIcon /></Button>
                                                <Button color="primary" onClick={() => removeItem(customer.id)}><DeleteIcon /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>

                </table>
            </div>
            <Modal title="Update Customer" open={editModal} close={() => setEditModal(false)}>
                <EditForm data={editRow} onFormSubmit={() => recordUpdate()} />
            </Modal>
        </div>
    )
}
