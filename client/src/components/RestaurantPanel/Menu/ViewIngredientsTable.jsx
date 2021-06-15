import React, { useEffect } from 'react'
import $ from 'jquery';
import Modal from '../SharedComponent/Modal';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import { getIngredients, deleteIngredients } from "../../../api/api";
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import AddIngredientsForm from "./AddIngredientsForm";



export default function ViewIngredientsTable() {
    useEffect(() => {
        getItem();
    }, [])
    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };
    const useStyles = makeStyles({
        margin: {
            marginRight: '6px',

        }
    });
    const classes = useStyles();
    const [Item, setItem] = React.useState([]);
    const { t } = useTranslation();
    const getItem = () => {
        getIngredients().then((res) => {
            setItem([...res.data.data])
            if ($.fn.dataTable.isDataTable('#menu_ingredients_table')) {
                $('#menu_ingredients_table').DataTable({
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
                $('#menu_ingredients_table').DataTable({
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
            .catch((err) => {
                console.log(err)
            })
    };

    const [editModal, setEditModal] = React.useState(false);
    const [editRow, setEditRow] = React.useState({});

    const editItem = (item) => {
        setEditRow({ ...item });
        $('#menu_ingredients_table').dataTable().fnDestroy();

        setEditModal(true)
    };

    // delete the data of menu size 
    const remove = (id) => {
        deleteIngredients(id).then((res) => {
            toast.success(res.data.message, toastOptions);
            $('#menu_ingredients_table').dataTable().fnDestroy();
            getItem();
        }).catch((err) => {
            toast.error(err.response.data.error, toastOptions);
        })
    };
    const closeEditModal = (item) => {

        setEditModal(false);
        getItem();
    }
    return (

        <React.Fragment>
            <div className="table-responsive">
                <table id="menu_ingredients_table" className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>{t('Sr.#')}</th>
                            <th>{t('name.label')}</th>

                            <th>{t("price.label")}</th>
                            <th>{t('size.label')}</th>
                            <th>{t('category.label')}</th>
                            <th>{t('Action')}</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            Item.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.size_name}</td>
                                        <td>{item.cat_name}</td>
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
                <Modal title={t('Update Ingredients')} open={editModal} close={() => setEditModal(false)}>
                    <AddIngredientsForm data={editRow} onFormSubmit={() => closeEditModal(false)} />
                </Modal>
            </div>
        </React.Fragment>
    )
}
