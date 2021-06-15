import React, { useEffect, useContext } from 'react'
import $ from 'jquery';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { getIngredientsCategory, deleteIngredientsCategoryItem } from "../../../api/api";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '../SharedComponent/Modal';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import AddIngredientsCategoryForm from './AddIngredientsCategoryForm';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';

const useStyles = makeStyles({
    margin: {
        marginRight: '6px',

    }
});

export default function ViewIngredientCategoryTable() {


    const classes = useStyles();
    const { t } = useTranslation();
    const [editModal, setEditModal] = React.useState(false);
    const [editRow, setEditRow] = React.useState({});
    const toastOptions = useContext(ToastContext);
    const [Item, setItem] = React.useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getCategory();
    }, []);


    const getCategory = () => {
        dispatch(toggle())
        getIngredientsCategory().then((res) => {
            dispatch(toggle())
            setItem([...res.data.ingredientCategories])
            if ($.fn.dataTable.isDataTable('#view_ingredient_category_table')) {
                $('#view_ingredient_category_table').DataTable({
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
            } else {
                $('#view_ingredient_category_table').DataTable({
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
                dispatch(toggle())
                toast.error(err.response.data.error, toastOptions);
            })

    };


    // delete the data of menu size 
    const remove = (id) => {
        dispatch(toggle())
        deleteIngredientsCategoryItem(id).then((res) => {
            dispatch(toggle())
            $('#view_ingredient_category_table').dataTable().fnDestroy();
            toast.success(res.data.message, toastOptions);
            getCategory();
        }).catch((err) => {
            dispatch(toggle())
            toast.error(err.response.data.error, toastOptions);
        })

    };

    const editItem = (item) => {
        setEditRow({ ...item });
        $('#view_ingredient_category_table').dataTable().fnDestroy();
        setEditModal(true)
    };
    const closeEditModal = (item) => {

        setEditModal(false);
        getCategory();
    }


    return (
        <div className="table-responsive">
            <table id="view_ingredient_category_table" className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>{t('Sr.#')}</th>
                        <th>{t('name.label')}</th>
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
            <Modal title={t("Update Category")} open={editModal} close={() => setEditModal(false)}>
                <AddIngredientsCategoryForm data={editRow} onFormSubmit={() => closeEditModal(false)} />
            </Modal>
        </div>
    )
}
