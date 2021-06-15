import React, { useEffect, useContext } from 'react'
import { Box, MenuItem, Select, Input, InputLabel, FormControl, FormControlLabel, Checkbox, Grid, Button, TextField, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SelectMat from 'react-select';

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from "react-hook-form";
import {
    getMenuCategories, addSizeItem, getMenuSizesItem, deleteSizeItem,
    getMenuSizes, updateItem, addItem, getIngredients
} from "../../../api/api";
import { toast } from 'react-toastify';
import FormHelperText from '@material-ui/core/FormHelperText';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SizeModal from '../SharedComponent/SizeModal';
import EditSizeForm from "./EditSizeForm";
import AddIcon from '@material-ui/icons/Add';
import ToastContext from '../../../context/ToastContext';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';

const useStyles = makeStyles({
    fileInput: {
        display: "flex",

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



export default function AddItemForm(props) {
    const toastOptions = useContext(ToastContext);

    const [editSizeModal, setSizeEditModal] = React.useState(false);
    const [editExistSizeModal, setEditExistSizeModal] = React.useState(false);

    const [editSizeRow, setSizeEditRow] = React.useState({});
    const [editExistSizeRow, setEditExistSizeRow] = React.useState({});

    const [add, setAdd] = React.useState(true);
    const [menuImage, setMenuImage] = React.useState(null);
    const [status, setStatus] = React.useState(true);
    const [setIng, setIngredientsItem] = React.useState([]);
    const dispatch = useDispatch();


    const editSizeItem = (item) => {
        setAdd(false);
        setSizeEditRow({ ...item });
        setSizeEditModal(true)
    };
    const editAddSizeItem = () => {
        setAdd(true);
        setSizeEditModal(true)
    };
    const closeSizeEditModal = () => {
        setSizeEditRow({})
        getSizeMenuData(props.data);
        setSizeEditModal(false);


    }
    const classes = useStyles();
    const { register, control, handleSubmit, formState: { isValid }, setValue, reset, errors } = useForm({
        mode: "onBlur",
        reValidateMode: "onBlur",
        shouldUnregister: true
    });
    const { t } = useTranslation();
    const [personName, setPersonName] = React.useState([]);
    // const [image, setItemImage] = React.useState([]);
    const removeSizeItem = (id) => {
        dispatch(toggle())
        deleteSizeItem(id).then((res) => {
            toast.success(res.data.message, toastOptions);
            getSizeMenuData(props.data);
            dispatch(toggle())
        }).catch((err) => {
            dispatch(toggle())
            toast.error(err.response.data.error, toastOptions);
        })
    }





    const getItem = () => {
        dispatch(toggle())
        getIngredients().then((res) => {
            dispatch(toggle())
            setIngredientsItem([...res.data.data])

        })
            .catch((err) => {
                dispatch(toggle())
                console.log(err)
            })
    };
    const [Item, setItem] = React.useState([]);
    const getCategory = () => {
        dispatch(toggle())
        getMenuCategories().then((res) => {
            dispatch(toggle())
            setItem([...res.data.data])

        })
            .catch((err) => {
                dispatch(toggle())
                console.log(err)
            })
    };
    const [isAddEdit, setIsAddEdit] = React.useState(false);
    const [menuItem, setMenuItem] = React.useState([]);
    const getMenuSize = () => {
        dispatch(toggle())
        getMenuSizes().then((res) => {
            dispatch(toggle())
            setMenuItem([...res.data.sizes])
        })
            .catch((err) => {
                dispatch(toggle())
                console.log(err)
            })
    };
    const [sizeMenuItem, setSizeMenuItem] = React.useState([]);
    const getSizeMenuData = (data) => {
        dispatch(toggle())
        getMenuSizesItem({ id: data.b_id }).then((res) => {
            dispatch(toggle())
            setSizeMenuItem([...res.data.size])
        })
            .catch((err) => {
                console.log(err)
                dispatch(toggle())
            })
    }

    const addEditMode = (data) => {

        if (data) {
            setValue('item_name', props.data.name)
            setValue('category_id', props.data.category_id)
            setValue('price', props.data.price)
            setValue('size_id', props.data.size_id)
            setValue('item_code', props.data.product_code)
            setValue('purchase_price', props.data.purchase_price)
            setValue('sale_price', props.data.sale_price)
            setValue('sku', props.data.sku)
            setValue('item_quantity', props.data.quantity)
            setStatus(props.data.status ? true : false);
            setIsAddEdit(true);
        }
    }
    useEffect(() => {
        getCategory();
        getMenuSize();
        getItem();
        if (props.data) {

            getSizeMenuData(props.data)
            addEditMode(props.data)

        }

    }, [])


    const handleChange = (event) => {
        setPersonName(event.target.value);
    };
    const [value, setTabValue] = React.useState('1');

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const onSizeSubmit = (data) => {

        dispatch(toggle())
        data.id = id;
        addSizeItem(data).then((res) => {
            dispatch(toggle())
            toast.success(res.data.message, toastOptions);
            // props.onFormSubmit();
            setTabValue("2")
            reset();
            reset({ size_id: '', purchase_price: '', sale_price: '', sku: '', item_quantity: '' });


        }).catch((err) => {
            dispatch(toggle());
            if (err.response.data.item && err.response.data.item.length > 0) {
                setEditExistSizeRow({ ...err.response.data.item[0] });
                setEditExistSizeModal(true);
            }

            toast.error(err.response.data.error, toastOptions);
        })
    }

    const onSubmit = (data) => {
        // console.log('ddd', data);

        if (menuImage)
            data.image = menuImage
        data.status = status;

        if (!isAddEdit) {
            create(data);
        }
        else {

            data.id = props.data.b_id;
            update(data);
        }
    }
    const [id, setId] = React.useState();
    const create = (data) => {
        dispatch(toggle())
        data.image = menuImage;
        console.log(data);
        addItem(data).then((res) => {
            dispatch(toggle())
            toast.success(res.data.message, toastOptions);
            reset({});
            setStatus(false);

            setId(res.data.id);
            setTabValue("2")
        }).catch((err) => {
            dispatch(toggle())

            toast.error(err.response.data.error, toastOptions);
        })
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

    const update = (data) => {
        dispatch(toggle())
        data.image = menuImage;
        updateItem(data).then((res) => {
            dispatch(toggle())
            toast.success(res.data.message, toastOptions);
            props.onFormSubmit();
            setStatus(false);
            reset();
        }).catch((err) => {
            dispatch(toggle())

            toast.error(err.response.data.error, toastOptions);
        })
    };

    const handleImage = (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onloadend = () => {

            setMenuImage(reader.result)

        };
        reader.readAsDataURL(file);

    }
    return (
        <React.Fragment>
            <Box component="div" >
                <Card >

                    <Container >
                        <CardContent>
                            <TabContext value={value}>
                                {(!isAddEdit) ?
                                    <AppBar className={classes.app} position="static">
                                        <TabList onChange={handleTabChange} aria-label="simple tabs example">
                                            <Tab label={t("Add Item")} value="1" />

                                            <Tab label={t("Add Size")} value="2" disabled={id ? false : true} />
                                            {/* <Tab label="Add Size" value="2" /> */}

                                        </TabList>
                                    </AppBar>
                                    : null
                                }
                                <TabPanel value="1">
                                    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                                        <Grid container spacing={3} >


                                            <Grid item md={6} sm={6} xs={12} >
                                                <Controller
                                                    name="item_name"
                                                    as={<TextField

                                                        variant="outlined"
                                                        margin="dense"
                                                        error={errors.item_name ? true : false}
                                                        helperText={errors.item_name ? <span>{t('itemName.label')} {t('required')}</span> : null}

                                                        style={{ width: '100%' }} label={t('itemName.label')}
                                                        type="text"
                                                        id="item_name"

                                                    />}
                                                    control={control}
                                                    defaultValue=""
                                                    rules={{
                                                        required: 'required',
                                                    }}
                                                />

                                            </Grid>


                                            <Grid item md={6} sm={6} xs={12} >
                                                <FormControl margin="dense" error={errors.category_id ? true : false} style={{ width: "100%" }}
                                                    variant="outlined"  >
                                                    <InputLabel id="select-outlined-label">{t('category.label')}</InputLabel>
                                                    <Controller
                                                        name="category_id"
                                                        as={<Select

                                                            defaultValue=""
                                                            labelId="select-outlined-label"
                                                            id="category_id"
                                                            label={t('category.label')}
                                                        >
                                                            {
                                                                Item.map((item, index) => {
                                                                    return <MenuItem value={item.id} key={index}>
                                                                        {item.category_name}
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
                                                    <FormHelperText error>{errors.category_id ? <span>{t('category.label')} {t('required')}</span> : null}</FormHelperText>
                                                </FormControl>
                                            </Grid>

                                            <Grid item md={6} sm={6} xs={12} className={classes.fileInput}>

                                                <label htmlFor="raised-button-file">
                                                    {/* <Button variant="contained" component="span">
                                                        Upload
                                                    </Button> */}
                                                </label>
                                                <input
                                                    accept="image/*"
                                                    className={classes.input}
                                                    onChange={handleImage}
                                                    id="raised-button-file"
                                                    type="file"
                                                />

                                                {errors.image && <span>{t('image.label')} {t('required')}</span>}
                                            </Grid>

                                            <Grid item md={6} sm={6} xs={12} >
                                                <Controller
                                                    name="item_code"
                                                    as={<TextField

                                                        variant="outlined"
                                                        margin="dense"
                                                        error={errors.item_code ? true : false}
                                                        helperText={errors.item_code ? <span>{t('itemCode.label')} {t('required')}</span> : null}

                                                        style={{ width: '100%' }} label={t('itemCode.label')}
                                                        type="text"
                                                        id="item_code"

                                                    />}
                                                    control={control}
                                                    defaultValue=""
                                                    rules={{
                                                        required: 'required',
                                                    }}
                                                />

                                            </Grid>


                                            <Grid item md={12} sm={12} xs={12}>

                                                <FormControlLabel
                                                    id="status"
                                                    control={
                                                        <Checkbox
                                                            checked={status}
                                                            color="primary"
                                                            onChange={(e) => setStatus(e.target.checked)}
                                                        />
                                                    }
                                                    label={t('status.label')}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item md={12} className="text-right" sm={12} xs={12}>
                                            <Button variant="contained" type="submit" color="primary">{t('submit.label')}</Button>
                                        </Grid>

                                    </form>


                                    {(isAddEdit) ?
                                        // {/ Table Content /}
                                        <div>
                                            <Button variant="contained" size="small" color="primary"
                                                className={classes.margin}
                                                onClick={() => editAddSizeItem()}
                                            >
                                                <AddIcon />
                                            </Button>

                                            <table id="menu__item" className="table table-hover table-bordered " style={{ marginLeft: -1, marginTop: 10 }} >

                                                <thead>
                                                    <tr>
                                                        <th>{t("Size")}</th>
                                                        <th>{t("Ingredients")}</th>
                                                        <th>{t("Purchase Price")}</th>
                                                        <th>{t("Sale Price")}</th>
                                                        <th>{t("Sku")}</th>
                                                        <th>{t("quantity")}</th>
                                                        <th>{t("Action")}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        sizeMenuItem.map((item, index) => {
                                                            return (
                                                                <tr key={index}>

                                                                    <td>{item.size_name}</td>
                                                                    <td>
                                                                        {
                                                                            item.ingredient_id.map((data, indexes) => {
                                                                                return (
                                                                                    <p key={indexes}>{data.name}</p>
                                                                                )
                                                                            })
                                                                        }
                                                                    </td>
                                                                    <td>{item.purchase_price}</td>
                                                                    <td>{item.sale_price}</td>
                                                                    <td>{item.sku}</td>
                                                                    <td>{item.quantity}</td>
                                                                    <td>
                                                                        <Button variant="contained" size="small" color="primary"

                                                                            className={classes.margin}
                                                                            onClick={() => editSizeItem(item)}
                                                                        >
                                                                            <EditIcon />
                                                                        </Button>

                                                                        <Button variant="contained" size="small" color="primary"
                                                                            onClick={() => removeSizeItem(item.id)}
                                                                        >
                                                                            <DeleteIcon />
                                                                        </Button></td>
                                                                </tr>
                                                            )
                                                        })
                                                    }

                                                </tbody>
                                                <SizeModal title={t('Item')} open={editSizeModal} close={() => { setSizeEditModal(false); setSizeEditRow({}) }
                                                }>
                                                    <EditSizeForm id={props.data.b_id} data={editSizeRow} check={add} onSizeFormSubmit={() => closeSizeEditModal()} />
                                                </SizeModal>

                                            </table>

                                        </div>
                                        : null}
                                </TabPanel>
                                <TabPanel value="2">
                                    {/* Table Content */}
                                    <SizeModal title="Update Item" open={editExistSizeModal} close={() => { setEditExistSizeModal(false); setEditExistSizeRow({}) }}>
                                        <EditSizeForm id={id} data={editExistSizeRow} check={false} onSizeFormSubmit={() => {
                                            reset({
                                                'size_id': "",
                                                'sale_price': "",
                                                'purchase_price': "",
                                                'ingredient_id': [],
                                                'sku': "",
                                                'item_quantity': ""
                                            }); setEditExistSizeModal(false); setEditExistSizeRow({});
                                        }} />
                                    </SizeModal>
                                    <form onSubmit={handleSubmit(onSizeSubmit)} noValidate autoComplete="off">
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
                                                <div style={{ zIndex: 1000, marginTop: 11 }}>
                                                    <Controller
                                                        name="ingredient_id"
                                                        as={<SelectMat

                                                            placeholder={<div>{t("selectIngridients")}</div>}
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
                                                        min={1}

                                                        variant="outlined"
                                                        margin="dense"
                                                        error={errors.purchase_price ? true : false}
                                                        helperText={errors.purchase_price ? <span>{t('Purchase_Price')} {t('required')}</span> : null}


                                                        style={{ width: '100%' }}
                                                        type="number"
                                                        id="purchase_price"
                                                        label={t("Purchase_Price")}
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
                                                        min={1}

                                                        variant="outlined"
                                                        margin="dense"
                                                        error={errors.sale_price ? true : false}
                                                        helperText={errors.sale_price ? <span>{t('Sale_Price')} {t('required')}</span> : null}

                                                        style={{ width: '100%' }}
                                                        type="number"
                                                        id="sale_price"
                                                        label={t("Sale_Price")}

                                                    // label={t('sale_price.label')}

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
                                                        label={t("Sku")}
                                                    // label={t('sku.label')}

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
                                                        min={1}
                                                        style={{ width: '100%' }}
                                                        type="number"
                                                        id="item_quantity"
                                                        label={t('quantity')}
                                                    // label={t('item_quantity.label')}

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
                                </TabPanel>
                            </TabContext>
                        </CardContent>
                    </Container>
                </Card>
            </Box>
        </React.Fragment>
    )
}
