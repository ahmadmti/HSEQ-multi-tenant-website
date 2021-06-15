import React, { useEffect, useContext } from 'react'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { getCategories, updateCategoryOrder, removeCategoryById } from '../../../api/api';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';
import Chip from '@material-ui/core/Chip';
import Modal from '../SharedComponent/Modal';
import EditForm from './Form';
import ToastContext from '../../../context/ToastContext';
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';

export default function TableList() {

    const [categories, setCategorioes] = React.useState([]);
    const [editModal, setEditModal] = React.useState(false);
    const [editRow, setEditRow] = React.useState({});
    const [table, setTable] = React.useState(null);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const toastOptions = useContext(ToastContext);

    useEffect(() => {
        categoriesfetch();

    }, [])

    const categoriesfetch = () => {
        dispatch(toggle())

        getCategories()
            .then(res => {
                dispatch(toggle())
                setCategorioes([...res.data.data])
                $('#category_table tbody').sortable({
                    "placeholder": 'ui-state-highlight',
                    update: function (event, ui) {
                        let tr_row = new Array();
                        $('#category_table tbody tr').each(function () {
                            tr_row.push($(this).attr('id'));
                        })

                        updateCategoryOrder(tr_row)
                            .then(res => console.log(res))
                            .catch(err => console.log(err));

                    }
                });
                if ($.fn.dataTable.isDataTable('#category_table')) {

                    $('#category_table').DataTable({
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
                    $('#category_table').DataTable({
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
            })
            .catch(err => {
                dispatch(toggle())
                console.log(err);
                // toast.error(err.response.data.error, toastOptions);
            })
    }

    const removeItem = (id) => {
        dispatch(toggle())
        removeCategoryById(id)
            .then((res) => {
                dispatch(toggle())
                toast.success(res.data.message, toastOptions);
                $('#category_table').dataTable().fnDestroy();
                categoriesfetch()
            })
            .catch(err => {
                dispatch(toggle())
                // console.log(err);
                if (err.response && err.response.data)
                    toast.error(err.response.data.error, toastOptions);
            })
    }

    const editItem = (item) => {
        setEditRow({ ...item });
        setEditModal(true)
    }
    const recordUpdate = () => {

        categoriesfetch()
        $('#category_table').dataTable().fnDestroy();
        setEditModal(false);
    }

    return (
        <div className="table-responsive">
            <table id="category_table" className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>{t('Sr.#')}</th>
                        <th>{t('VAT Label')}</th>
                        <th>{t('Name')}</th>
                        <th>{t('Vat out house')}</th>
                        <th>{t('Vat in house')}</th>
                        <th>{t("status.label")}</th>
                        <th>{t('Action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map((item, index) => {
                            return (
                                <tr key={index} id={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.vat_label}</td>
                                    <td>{item.category_name}</td>
                                    <td>{item.vat_take_away}</td>
                                    <td>{item.vat}</td>
                                    <td>
                                        {item.status ? <Chip label={t('Active')} color="secondary" /> : <Chip label={t('In-Active')} disabled />}
                                    </td>
                                    <td>
                                        <ButtonGroup size="small" variant="contained">
                                            <Button color="primary" onClick={() => editItem(item)}><EditIcon /></Button>
                                            <Button color="primary" onClick={() => removeItem(item.id)}><DeleteIcon /></Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    {/* <SortAbleList items={categories} /> */}

                </tbody>

            </table>
            <Modal title={t("Update Category")} open={editModal} close={() => setEditModal(false)}>
                <EditForm data={editRow} onFormSubmit={() => recordUpdate()} />
            </Modal>
        </div >
    )
}
