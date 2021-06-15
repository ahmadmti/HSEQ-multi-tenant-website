import React, { useEffect ,useContext} from 'react'
import $ from 'jquery';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { getBonus, removeBonusById } from '../../../api/api';

import { toast } from 'react-toastify';

import Modal from '../SharedComponent/Modal';
import AddBonusPointForm from './AddBonusPointForm';
import ToastContext from '../../../context/ToastContext';

import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';

export default function ViewBonusPointTable() {

    const [categories, setCategorioes] = React.useState([]);
    const [editModal, setEditModal] = React.useState(false);
    const [editRow, setEditRow] = React.useState({});
    const toastOptions = useContext(ToastContext);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    useEffect(() => {
        fetchBonus()
    }, [])

    const fetchBonus = () => {
        dispatch(toggle());
        getBonus()
            .then(res => {
                dispatch(toggle());
                // console.log(res.data.data);
                setCategorioes([...res.data.data])
              
                if ($.fn.dataTable.isDataTable('#bonus_point_table')) {

                    $('#bonus_point_table').DataTable({
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
                    $('#bonus_point_table').DataTable({
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
                toast.error(err.response.data.error, toastOptions);
            })
    }

    const removeItem = (id) => {
        dispatch(toggle());
        removeBonusById(id)
            .then((res) => {
                dispatch(toggle());
                $('#bonus_point_table').dataTable().fnDestroy();
                toast.success(res.data.message, toastOptions);
                fetchBonus()
            })
            .catch(err => {
                toast.error(err.response.data.error, toastOptions);
            })
    }

    const editItem = (item) => {
        setEditRow({ ...item });
        setEditModal(true)
    }
    const recordUpdate = () => {
        fetchBonus()
        $('#bonus_point_table').dataTable().fnDestroy();
        setEditModal(false);
    }

    return (
        <div>
            <table id="bonus_point_table" className="table table-striped table-bordered">
                <thead>
                    <tr>
                    <th>{t('Sr.#')}</th>
                    <th>{t('Amount_From.label')}</th>
                    <th>{t('Amount_to.label')}</th>
                    <th>{t('Points.label')}</th>
                    <td>{t('Action')}</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.amt_from}</td>
                                    <td>{item.amt_to}</td>
                                    <td>{item.points}</td>
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
                </tbody>

            </table>
            <Modal title={t("editSlab")} open={editModal} close={() => setEditModal(false)}>
                <AddBonusPointForm data={editRow} onFormSubmit={() => recordUpdate()} />
            </Modal>
        </div>
    )
}



