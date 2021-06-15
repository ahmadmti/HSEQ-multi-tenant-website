import React, { useEffect, useContext } from 'react'
import $ from 'jquery';
import ToastContext from '../../../context/ToastContext';
import { getOffers, removeOfferById } from '../../../api/api';
import { toast } from 'react-toastify';
import Chip from '@material-ui/core/Chip';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';
import Modal from '../SharedComponent/Modal';
import Form from './Form';
import CardMedia from '@material-ui/core/CardMedia';
export default function TableList() {
    useEffect(() => {
        fetchOffers();
    }, [])
    const toastOptions = useContext(ToastContext);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [offer, setOffers] = React.useState([]);

    const [editModal, setEditModal] = React.useState(false);
    const [editRow, setEditRow] = React.useState({});

    function formatDate(_date) {

        if (_date) {
            return new Date(_date).toLocaleDateString();
            // return new Date(_date).toISOString().slice(0, 10);
        }
    }
    const fetchOffers = () => {
        dispatch(toggle());
        getOffers()
            .then(res => {
                dispatch(toggle());
                // console.log(res.data.data);
                setOffers([...res.data.data])

                if ($.fn.dataTable.isDataTable('#offers')) {

                    $('#offers').DataTable({
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
                    $('#offers').DataTable({
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
        removeOfferById(id)
            .then((res) => {
                dispatch(toggle());
                $('#offers').dataTable().fnDestroy();
                toast.success(res.data.message, toastOptions);
                fetchOffers()
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
        fetchOffers()
        $('#offers').dataTable().fnDestroy();
        setEditModal(false);
    }


    return (
        <div>
            <table id="offers" className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>{t('Sr.#')}</th>
                        <th>{t('offerImage')}</th>
                        <th>Name</th>
                        <th>{t('points.label')}</th>
                        <th>{t('price.label')}</th>
                        <th>{t('Status')}</th>
                        <th>{t('Expire_On.label')}</th>
                        <th>{t('Action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        offer.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>
                                        <CardMedia

                                            image={'/public/images/offer/' + item.image}
                                            title="Paella dish"
                                        />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.points}</td>
                                    <td>{item.price}</td>
                                    <td>                                
                                    {item.status ? <Chip label={t('Active')} color="secondary" /> : <Chip label={t('In-Active')} disabled />}
                                    </td>
                                    <td>{formatDate(item.expire_on)}</td>
                                    <td>
                                        <ButtonGroup size="small" variant="contained">
                                            <Button color="primary" onClick={() => editItem(item)}><EditIcon /></Button>
                                            <Button color="primary" onClick={() => removeItem(item.id)}><DeleteIcon /></Button>
                                        </ButtonGroup>
                                    </td>

                                </tr>
                            )
                        })
                    }



                </tbody>

            </table>
            <Modal title={t("editOffer")} open={editModal} close={() => setEditModal(false)}>
                <Form data={editRow} onFormSubmit={() => recordUpdate()} />
            </Modal>
        </div>
    )
}
