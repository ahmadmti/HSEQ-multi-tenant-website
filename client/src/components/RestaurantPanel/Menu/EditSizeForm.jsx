import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Box, MenuItem, Select, Input, InputLabel, FormControl, FormControlLabel, Checkbox, Grid, TextField, Container } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import Chip from '@material-ui/core/Chip';
import SelectMat from 'react-select';
import { useForm, Controller } from "react-hook-form";
import { getMenuSizes, addSizeItem, updateMenuSize, getIngredients } from "../../../api/api";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';


const useStyles = makeStyles({
    fileInput: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    formControl: {
        width: '100%'
    },
    chipRow: {
        display: "flex",
        flexWrap: "wrap"
    },
    app: {
        background: '#ff6877',
    }
});

const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};


export default function EditSizeForm(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { control, handleSubmit, setValue, reset, errors } = useForm();
    const [personName, setPersonName] = React.useState([]);
    const { t } = useTranslation();
    const [isAddEdit, setIsAddEdit] = React.useState(false);
    const [isAddId, setId] = React.useState();

    const handleChange = (event) => {
        setPersonName(event.target.value);
    };
    const [setIng, setIngredientsItem] = React.useState([]);
    const getItem = () => {
        getIngredients().then((res) => {

            setIngredientsItem([...res.data.data])

        })
            .catch((err) => {
                console.log(err)
            })
    };
    const [menuItem, setMenuItem] = React.useState([]);
    const getMenuSize = () => {
        getMenuSizes().then((res) => {
            setMenuItem([...res.data.sizes])
        })
            .catch((err) => {
                console.log(err)
            })
    };
    const onSizeSubmitUpdated = (data) => {
        // console.log(isAddEdit);

        if (props.check == true) {
            create(data);
        }
        else {
            data.id = props.data.product_label_id;
            update(data);
        }
    }
    const create = (data) => {
        // console.log('ddd', data);
        data.id = isAddId;
        dispatch(toggle())

        addSizeItem(data).then((res) => {
            toast.success(res.data.message, toastOptions);
            props.onSizeFormSubmit();
            dispatch(toggle());

            reset({
                'sale_price': "",
                'purchase_price': "",
                'ingredient_id': "",
                'sku': "",
                'item_quantity': ""
            });

        }).catch((err) => {
            dispatch(toggle());

            toast.error(err.response.data.error, toastOptions);
        })
    }
    const update = (data) => {
        dispatch(toggle())

        data.id = props.data.id

        updateMenuSize(data).then((res) => {
            dispatch(toggle());
            toast.success(res.data.message, toastOptions);
            props.onSizeFormSubmit();
            setIsAddEdit(false);
            reset({
                'sale_price': "",
                'purchase_price': "",
                'ingredient_id': "",
                'sku': "",
                'item_quantity': ""
            });
        }).catch((err) => {
            dispatch(toggle())
            console.log(err);
            toast.error(err.response.data.error, toastOptions);
        })

    }
    const addEditMode = (data) => {

        if (data) {
            setValue('item_name', props.data.name || '')
            setValue('category_id', props.data.category_id || '')
            setValue('price', props.data.price || '')
            setValue('size_id', props.data.size_id)
            setValue('item_code', props.data.product_code || '')
            setValue('ingredient_id', props.data.ingredient_id || '')

            // setPersonName([...props.data.ingredient_id])
            setValue('purchase_price', props.data.purchase_price || "")
            setValue('sale_price', props.data.sale_price || "")
            setValue('sku', props.data.sku || "")
            setValue('item_quantity', props.data.quantity || "")
            setIsAddEdit(true);
        }
    }
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 100,
            },
        },
    };
    const customStyles = {
        menu: provided => ({ ...provided, zIndex: 9999, maxHeight: "150px", overFlow: "scroll" }),
        menuList: (provided, state) => ({
            ...provided,
            // zIndex: 9999999,
            // overflow: "scroll",
            // height:"30px !important"
            maxHeight: "150px"
            // background: 'blue',


        }),
        control: (base, state) => ({
            ...base,

            // state.isFocused can display different borderColor if you need it

            // overwrittes hover style


        })
    }


    // const[isAddEdit, ]
    useEffect(() => {
        getMenuSize()
        getItem()
        // console.log(props.data)
        if (props.data) {

            addEditMode(props.data)

        }
        if (props.id) {

            setId(props.id)
        }
    }, [])
    // console.log(personName, "name")
    return (
        <div>

            {/* Table Content */}
            <form onSubmit={handleSubmit(onSizeSubmitUpdated)} noValidate autoComplete="off">
                {/* {isAddId} */}
                <Grid container spacing={3} >
                    <Grid item md={6} sm={6} xs={12} >
                        <FormControl margin="dense" error={errors.size_id ? true : false} style={{ width: "100%" }}
                            variant="outlined"  >
                            <InputLabel >{t('size.label')}</InputLabel>
                            <Controller
                                name="size_id"
                                as={<Select
                                    defaultValue=""
                                    labelId="demo-simple-select-outlined-label"
                                    id="size_id"

                                    label={t('selectSize.label')}
                                >
                                    {
                                        menuItem.map((item, index) => {
                                            return <MenuItem value={item.id} key={index}>
                                                {item.name}
                                            </MenuItem>
                                        })
                                    }
                                </Select>}
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'required',
                                }}
                            />
                            <FormHelperText error>{errors.size_id ? <span>{t('size.label')} {t('required')}</span> : null}</FormHelperText>
                        </FormControl>


                    </Grid>

                    <Grid item md={6} sm={6} xs={12} >
                        <div style={{ zIndex: 1000 }}>
                            <Controller
                                name="ingredient_id"
                                as={<SelectMat
                                    placeholder={<div>{t("selectIngridients")} </div>}
                                    isMulti
                                    styles={customStyles}
                                    id="ingredient_id"
                                    options={setIng}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                    className="basic-multi-select"
                                    classNamePrefix="select-react"
                                />}
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'required'
                                }}
                            />
                            <FormHelperText error={errors.ingredient_id ? true : false}>{errors.ingredient_id ? <span>{t('ingridients')} {t('required')}</span> : null}</FormHelperText>
                        </div>

                    </Grid>
                    <Grid item md={6} sm={6} xs={12} >
                        <Controller
                            name="purchase_price"
                            as={<TextField

                                variant="outlined"
                                margin="dense"
                                error={errors.purchase_price ? true : false}
                                helperText={errors.purchase_price ? <span>{t('Purchase_Price')} {t('required')}</span> : null}

                                style={{ width: '100%' }}
                                type="number"
                                id="purchase_price"
                                label={t("Purchase Price")}
                            // label={t('purchase_price.label')}

                            />}
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'required',
                            }}
                        />
                    </Grid>
                    <Grid item md={6} sm={6} xs={12} >
                        <Controller
                            name="sale_price"
                            as={<TextField

                                variant="outlined"
                                margin="dense"
                                error={errors.sale_price ? true : false}
                                helperText={errors.sale_price ? <span>{t('Sale_Price')} {t('required')}</span> : null}

                                style={{ width: '100%' }}
                                type="number"
                                id="sale_price"
                                // label={t('sale_price.label')}
                                label={t("Sale Price")}

                            />}
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'required',
                            }}
                        />
                    </Grid>

                    <Grid item md={6} sm={6} xs={12} >
                        <Controller
                            name="sku"
                            as={<TextField

                                variant="outlined"
                                margin="dense"
                                error={errors.sku ? true : false}
                                helperText={errors.sku ? <span>{t('Sku')} {t('required')}</span> : null}

                                style={{ width: '100%' }}
                                type="text"
                                id="sku"
                                // label={t('sku.label')}
                                label={t("SKU")}

                            />}
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'required',
                            }}
                        />
                    </Grid>

                    <Grid item md={6} sm={6} xs={12} >
                        <Controller
                            name="item_quantity"
                            as={<TextField

                                variant="outlined"
                                margin="dense"
                                error={errors.item_quantity ? true : false}
                                helperText={errors.item_quantity ? <span>{t('quantity')} {t('required')}</span> : null}

                                style={{ width: '100%' }}
                                type="number"
                                id="item_quantity"
                                // label={t('item_quantity.label')}
                                label={t('Quantity')}
                            />}
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'required',
                            }}
                        />
                    </Grid>


                </Grid>
                <Grid item md={12} className="text-right" sm={12} xs={12}>
                    <Button variant="contained" type="submit" color="primary">{t('submit.label')}</Button>
                </Grid>

            </form>
            {/* Table Content */}
        </div>
    );
}
