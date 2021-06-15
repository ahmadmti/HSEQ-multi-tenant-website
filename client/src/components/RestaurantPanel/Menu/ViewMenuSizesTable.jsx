import React, { useEffect, useContext } from 'react'
import $ from 'jquery';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { getMenuSizes, deleteMenuItem } from "../../../api/api";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '../SharedComponent/Modal';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddMenuSizeForm from './AddMenuSizeForm';
import ToastContext from '../../../context/ToastContext';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';


const useStyles = makeStyles({
    margin: {
        marginRight: '6px',
    }
});
export default function ViewMenuSizesTable() {
    const [editModal, setEditModal] = React.useState(false);
    const [editRow, setEditRow] = React.useState({});
    const classes = useStyles();
    const [menuItem, setMenuItem] = React.useState([]);
    const { t } = useTranslation();
    const toastOptions = useContext(ToastContext);
    const dispatch = useDispatch();

    const getMenuSize = () => {
        dispatch(toggle())
        getMenuSizes().then((res) => {
            dispatch(toggle())

            setMenuItem([...res.data.sizes])
            $('#menu_sizes_table').DataTable({
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
        })
            .catch((err) => {
                dispatch(toggle())

                toast.error(err.response.data.error, toastOptions);
            })
    };


    // delete the data of menu size 
    const remove = (id) => {
        dispatch(toggle())

        deleteMenuItem(id).then((res) => {
            dispatch(toggle())

            $('#menu_sizes_table').dataTable().fnDestroy();
            getMenuSize();
            toast.success(res.data.message, toastOptions);
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
        setEditModal(false);
        $('#menu_sizes_table').dataTable().fnDestroy();
        getMenuSize();
    }



    useEffect(() => {
        getMenuSize();
    }, [])


    return (
        <div className="table-responsive">
            <table id="menu_sizes_table" className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>{t('Sr.#')}</th>
                        <th>{t('name.label')}</th>
                        <th>{t('Action')}</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        menuItem.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <Button variant="contained" size="small" color="primary"

                                            className={classes.margin}
                                            onClick={() => editItem(item)}>
                                            <EditIcon />
                                        </Button>

                                        <Button variant="contained" size="small" color="primary" onClick={() => remove(item.id)}>
                                            <DeleteIcon />
                                        </Button></td>
                                </tr>
                            )
                        })
                    }

                </tbody>

            </table>
            <Modal title={t("Update Size")} open={editModal} close={() => setEditModal(false)}>
                <AddMenuSizeForm data={editRow} onFormSubmit={() => closeEditModal(false)} />
            </Modal>
        </div>
    )
}
