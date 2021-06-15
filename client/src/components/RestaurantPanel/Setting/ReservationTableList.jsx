import React, { useEffect, useContext } from 'react'
import $ from 'jquery';
import ToastContext from '../../../context/ToastContext';
import { getReservations, removeReservationById } from '../../../api/api';
import { toast } from 'react-toastify';
import Chip from '@material-ui/core/Chip';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';
import TableReservationForm from './TableReservationForm';
import Modal from '../SharedComponent/Modal';

export default function ReservationTableList() {
     useEffect(() => {
        fetchReservation();
    }, [])
    const toastOptions = useContext(ToastContext);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [reservation, setReservation] = React.useState([]);
    const [editModal, setEditModal] = React.useState(false);
    const [editRow, setEditRow] = React.useState({});
    function formatDate(_date) {

        if (_date) {
            return new Date(_date).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
            // return new Date(_date).toISOString().slice(0, 10);
          
        }
    }
    function formatAMPM(time) {
       
            // Check correct time format and split into components
            var timeString =time;
            var H = +timeString.substr(0, 2);
            var h = H % 12 || 12;
            var ampm = (H < 12 || H === 24) ? "AM" : "PM";
        return     timeString = h + timeString.substr(2, 3) + ampm;
        
      }
    

    const fetchReservation = () => {
        dispatch(toggle());
        getReservations()
            .then(res => {
                dispatch(toggle());
                // console.log(res.data.data);
                setReservation([...res.data.results])

                if ($.fn.dataTable.isDataTable('#reservation_table_list')) {

                    $('#reservation_table_list').DataTable({
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
                    $('#reservation_table_list').DataTable({
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
        dispatch(toggle())
        removeReservationById(id)
            .then((res) => {
                dispatch(toggle())
                $('#reservation_table_list').dataTable().fnDestroy();

                toast.success(res.data.message, toastOptions);
                fetchReservation()
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
        fetchReservation()
        $('#reservation_table_list').dataTable().fnDestroy();
        setEditModal(false);
    }
    return (
        <div className="table-responsive">
            <table id="reservation_table_list" className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>{t('Sr.#')}</th>
                        <th>{t('Customer')}</th>
                        <th>{t('reservationDate')}</th>
                        <th>{t('startTime')}</th>
                        <th>{t('endTime')}</th>
                        <th>{t('totalPersons')}</th>
                        <th>{t('tableNo')}</th>
                        <th>{t('status.label')}</th>
                        <th>{t('remarks')}</th>
                        <th>{t('Action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reservation.map((item,index)=>{
                            return(
                                <tr key={index}>
                                <td>{item.r_id}</td>
                                <td>{item.customer_name}</td>
                                <td>{formatDate(item.reservation_date)}</td>
                                <td>{ formatAMPM(item.start_time)}</td>
                                <td>{formatAMPM(item.end_time)}</td>
                                <td>{item.total_persons}</td>
                                <td>{
                                item.table.map((table,index2)=>{
                                    return(
                                        <Chip   color="secondary" size="medium" label={table.table_no} />
                                      
                                    )
                                })
                                
                                }
                                </td>
                                <td>
                                {item.status ? <Chip label={t('Active')} color="secondary" /> : <Chip label={t('In-Active')} disabled />}
                                
                                </td>
                                <td>{item.remarks}</td>

                                <td>
                                <ButtonGroup size="small" variant="contained">
                                    <Button color="primary" onClick={() => editItem(item)}><EditIcon /></Button>
                                    <Button color="primary" onClick={() => removeItem(item.r_id)}><DeleteIcon /></Button>
                                </ButtonGroup>
                                </td>

                                
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Modal title={t('updateReservation')} open={editModal} close={() => setEditModal(false)}>
                <TableReservationForm data={editRow} onFormSubmit={() => recordUpdate()} />
            </Modal>
        </div>
    )
}
