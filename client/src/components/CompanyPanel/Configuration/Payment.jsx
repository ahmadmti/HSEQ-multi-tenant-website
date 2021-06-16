import React, { useEffect, useContext } from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import $ from 'jquery';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { getAllPayments, removePaymentMethod } from '../../../api/api';
import Modal from '../SharedComponent/Modal';
import ToastContext from '../../../context/ToastContext';
import { toast } from 'react-toastify';
import AddPaymentModal from './AddPaymentModal';
import { useTranslation } from 'react-i18next';
import { toggle } from '../../../actions/pacerActions';
import { useDispatch } from "react-redux";
const useStyles = makeStyles((theme) => ({
    titleHeading: {
        padding: '10px 0',
        textAlign: 'center'
    },
    box: {
        padding: '20px',
        border: '1px solid #eee',
        margin: '20px'
    },
    addButton: {
        width: '100%',
        padding: '5px',
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));
export default function Payment() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [paymentMethods, setPaymentMethods] = React.useState([]);
    const [editModal, setEditModal] = React.useState(false);
    const [editRow, setEditRow] = React.useState({});
    const toastOptions = useContext(ToastContext);


    useEffect(() => {
        getMethods();
    }, [])

    const getMethods = () => {
        dispatch(toggle());
        getAllPayments()
            .then(res => {
                dispatch(toggle());
                console.log(res);
                setPaymentMethods([...res.data.method]);

                if ($.fn.dataTable.isDataTable('#payment_table')) {

                    $('#payment_table').DataTable({
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
                    $('#payment_table').DataTable({
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
                dispatch(toggle());
                console.log(err);
            })
    }

    const editItem = (item) => {
        setEditRow({ ...item });
        setEditModal(true)
    }

    const removeItem = (id) => {
        dispatch(toggle());
        removePaymentMethod(id)
            .then((res) => {
                dispatch(toggle());
                toast.success(res.data.message, toastOptions);
                $('#payment_table').dataTable().fnDestroy();
                getMethods()
            })
            .catch(err => {
                dispatch(toggle());
                console.log(err);
                if (err.response && err.response.data)
                    toast.error(err.response.data.error, toastOptions);
            })
    }

    const recordUpdate = () => {
        getMethods();
        $('#payment_table').dataTable().fnDestroy();
        setEditModal(false);
    }

    return (
        <div>

            <Typography variant="subtitle2" component="h2" className={classes.titleHeading}>
                {t('Payment_Method')}
            </Typography>

            <div className={classes.box}>
                <div className={classes.addButton}>
                    <Button variant="contained" color="primary" onClick={() => setEditModal(true)}>{t('Add')}  </Button>
                </div>
                <div className="table-responsive">
                    <table id="payment_table" className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>{t('Sr.#')}</th>
                                <th>{t('Payment_Method')}</th>
                                <th>{t("Status")}</th>
                                {/* <td>{t("Action")}</td> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                paymentMethods.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.status ? <Chip label={t('Active')} color="secondary" /> : <Chip label={t('In-Active')} disabled />}</td>
                                            {/* <td>
                                            <ButtonGroup size="small" variant="contained">
                                                <Button color="primary" onClick={() => editItem(item)} ><EditIcon /></Button>
                                                <Button color="primary" onClick={() => removeItem(item.id)}><DeleteIcon /></Button>
                                            </ButtonGroup>
                                        </td> */}
                                        </tr>
                                    )
                                })
                            }

                        </tbody>

                    </table>
                </div>
            </div>
            <Modal title={t('Payment_Method')} open={editModal} close={() => setEditModal(false)}>
                <AddPaymentModal data={editRow} onFormSubmit={() => recordUpdate()} />
            </Modal>
        </div >
    )
}
