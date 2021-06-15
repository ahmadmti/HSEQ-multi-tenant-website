import React, { useEffect } from 'react'
import $ from 'jquery';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { getItems, deleteItem, sync } from "../../../api/api";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '../SharedComponent/Modal';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';
import Chip from '@material-ui/core/Chip';
import AddItemForm from './AddItemForm';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';
import CompanyContext from '../../../context/CompanyContext';


export default function ViewItemTable() {
    const useStyles = makeStyles({
        syncbtn: {
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'flex-end'
        }
    });

    const [editModal, setEditModal] = React.useState(false);
    const [editRow, setEditRow] = React.useState({});
    const classes = useStyles();
    const [Item, setItem] = React.useState([]);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const company = React.useContext(CompanyContext);

    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };
    useEffect(() => {
        getItem();

    }, [])

    const getItem = () => {
        dispatch(toggle())

        getItems().then((res) => {
            setItem([...res.data.data])
            dispatch(toggle())

            if ($.fn.dataTable.isDataTable('#menu_item_table')) {
                $('#menu_item_table').DataTable({
                    "oLanguage": {
                        "sInfo": t("sInfo"),
                        "sInfoEmpty": t("sInfoEmpty"),
                        "sEmptyTable": t('sEmptyTable'),
                        "sZeroRecords": t('sZeroRecords'),
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
                $('#menu_item_table').DataTable({
                    paging: true,
                    "oLanguage": {
                        "sInfo": t("sInfo"),
                        "sInfoEmpty": t("sInfoEmpty"),
                        "sEmptyTable": t('sEmptyTable'),
                        "sZeroRecords": t('sZeroRecords'),
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
            .catch((err) => {
                dispatch(toggle())

                console.log(err)
            })
    };
    // delete the data of menu size 
    const remove = (id) => {
        dispatch(toggle())

        deleteItem(id).then((res) => {
            dispatch(toggle())

            toast.success(res.data.message, toastOptions);
            $('#menu_item_table').dataTable().fnDestroy();
            getItem();
        }).catch((err) => {
            dispatch(toggle())

            toast.error(err.response.data.error, toastOptions);
        })
    };

    const editItem = (item) => {
        setEditRow({ ...item });
        setEditModal(true)
    };
    const closeEditModal = (item) => {
        getItem();
        $('#menu_item_table').dataTable().fnDestroy();
        setEditModal(false);
    }
    const syncMenus = () => {
        dispatch(toggle())

        sync().then(res => {
            dispatch(toggle())

            toast.success(res.data.message, toastOptions);
        }).catch(err => {
            dispatch(toggle())
            if (err && err.response && err.response.data) {
                toast.error(err.response.data.message, toastOptions);
            }
            toast.error('Server Issue', toastOptions);
        })
    }


    return (
        <React.Fragment>
            <div >
                {
                    company.is_piko_pako ?
                        <div className={classes.syncbtn}>
                            <Button variant="contained" onClick={syncMenus} size="small" color="primary">Sync Menus</Button>
                        </div> : null}
                <div className="table-responsive">
                    <table id="menu_item_table" className="table table-striped table-bordered " >
                        <thead>
                            <tr>
                                <th>{t('Sr.#')}</th>
                                <th>{t('Name')}</th>
                                <th>{t('Category Name')}</th>
                                <th>{t('Item Code')}</th>
                                <th>Status</th>
                                <th>{t('Action')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Item.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.cat_name}</td>
                                            <td>{item.product_code}</td>
                                            <td>
                                                {item.status ? <Chip label={t('Active')} color="secondary" /> : <Chip label={t('In-Active')} disabled />}
                                            </td>

                                            <td>
                                                <Button variant="contained" size="small" color="primary"
                                                    className={classes.margin}
                                                    onClick={() => editItem(item)}
                                                >
                                                    <EditIcon />
                                                </Button>

                                                <Button variant="contained" size="small" color="primary"
                                                    onClick={() => remove(item.id)}
                                                >
                                                    <DeleteIcon />
                                                </Button></td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>

                    </table>
                </div>
                <Modal title={t("Update Item")} open={editModal} close={() => setEditModal(false)}>
                    <AddItemForm data={editRow} onEditSizeForm={() => console.log('ok')} onFormSubmit={() => closeEditModal(false)} />
                </Modal>

            </div>
        </React.Fragment>
    )
}
