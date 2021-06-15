import React, { useEffect, useContext } from 'react'
import $ from 'jquery';
import { getTables, removeTableById } from '../../../api/api';
import { toast } from 'react-toastify';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';
import Modal from '../SharedComponent/Modal';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import EditForm from './AddTableForm';
import ToastContext from '../../../context/ToastContext';
import { useTranslation } from 'react-i18next';
import { toggle } from '../../../actions/pacerActions';
import { useDispatch } from "react-redux";


export default function TableList() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [tableList, setTableList] = React.useState([]);
    const [editModal, setEditModal] = React.useState(false);
    const [editRow, setEditRow] = React.useState({});
    const toastOptions = useContext(ToastContext);

    useEffect(() => {
        tables();
    }, [])
    const tables = () => {
        dispatch(toggle())
        getTables()
            .then(res => {
                dispatch(toggle())
                setTableList([...res.data.tables])

                if ($.fn.dataTable.isDataTable('#table__list')) {

                    $('#table__list').DataTable({
                        "oLanguage": {
                            "sInfo": t("sInfo"),
                            "sInfoEmpty": t("sInfoEmpty"),
                            "sZeroRecords": t('sZeroRecords'),
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
                    $('#table__list').DataTable({
                        paging: true,
                        "oLanguage": {
                            "sInfo": t("sInfo"),
                            "sInfoEmpty": t("sInfoEmpty"),
                            "sZeroRecords": t('sZeroRecords'),
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
                toast.error(err.response.data.error, toastOptions);
            })
    }

    const removeItem = (id) => {
        dispatch(toggle())
        removeTableById(id)
            .then((res) => {
                dispatch(toggle())
                $('#table__list').dataTable().fnDestroy();
                tables();
                toast.success(res.data.message, toastOptions);
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
    const recordUpdate = () => {
        $('#table__list').dataTable().fnDestroy();
        tables();
        setEditModal(false);
    }

    return (
        <div className="table-responsive">
            <table id="table__list" className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>{t('Sr.#')}</th>
                        <th>{t('Table_no')}</th>
                        <th>{t('Seats_Available')}</th>
                        <th>{t('Remarks')}</th>
                        <th>{t('Status')}</th>
                        <th>{t('Action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tableList.map((table, index) => {
                            return (
                                <tr key={index}>
                                    <td>{table.id}</td>
                                    <td>{table.table_no}</td>
                                    <td>{table.seats_available}</td>
                                    <td>{table.remarks ? table.remarks : "---"}</td>
                                    <td>
                                        {table.status ? <Chip label={t('Active')} color="secondary" /> : <Chip label={t('In-Active')} disabled />}

                                    </td>
                                    <td>
                                        <ButtonGroup size="small" variant="contained">
                                            <Button color="primary" onClick={() => editItem(table)}><EditIcon /></Button>
                                            <Button color="primary" onClick={() => removeItem(table.id)}><DeleteIcon /></Button>
                                        </ButtonGroup>
                                    </td>

                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>
            <Modal title="Update Table" open={editModal} close={() => setEditModal(false)}>
                <EditForm data={editRow} onFormSubmit={() => recordUpdate()} />
            </Modal>
        </div>
    )
}
