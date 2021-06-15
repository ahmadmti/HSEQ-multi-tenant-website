import React, { useContext, useEffect } from 'react'
import { Box, MenuItem, Select, Input, InputLabel, FormControl, Divider, FormControlLabel, Checkbox, Grid, Button, TextField, Container } from '@material-ui/core';

import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from "react-hook-form";
import { addOffer, updateOffer ,getProducts,getMenuSizes,getSizeOfProduct} from '../../../api/api.js'
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import { useTranslation } from 'react-i18next';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { v4 as uuidv4 } from 'uuid';

const status = [
    { id: 1, name: "Active" },
    { id:0, name: "In-Active" }
]
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
    }
});
export default function Form(props) {
    const classes = useStyles();
    const { register, reset, setValue, control, handleSubmit, errors } = useForm();
    const toastOptions = useContext(ToastContext);
    const { t } = useTranslation();
    const [isAddEdit, setIsAddEdit] = React.useState(false);
    const dispatch = useDispatch();
    const [menuImage, setMenuImage] = React.useState(null);
    const [inputFields, setInputFields] = React.useState([
        { id: uuidv4(), product: '', size: '' },
    ]);
    const [products, setProducts] = React.useState([]);
    
    const [sizes, setSizes] = React.useState([]);

    useEffect(() => {
        fetchProducts()
        if (props.data)
            addEditMode(props.data)
    }, [])
    function formatDate(_date) {

        if (_date) {
            return new Date(_date).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
            // return new Date(_date).toISOString().slice(0, 10);

        }
    }
    const getSizeChange = (data)=>{
      
        dispatch(toggle());
       
        getSizeOfProduct(data).then((res) => {
            dispatch(toggle());
            setSizes([...res.data.data])

        })
            .catch(err => {
                dispatch(toggle());
            })
    }
    const fetchProducts = (data) => {
        dispatch(toggle());
       
        getProducts(data).then((res) => {
            dispatch(toggle());
            setProducts([...res.data.data])

        })
            .catch(err => {
                dispatch(toggle());
            })
    }

    const onSubmit = (data) => {
        console.log("InputFields", inputFields);
        if (menuImage)
            data.image = menuImage
        if (!isAddEdit)
            create(data);
        else {
            data.id = props.data.id;
            update(data);
        }

    };

    const create = (data) => {
        dispatch(toggle());
        data.products= inputFields;
        data.image = menuImage;
        addOffer(data).then((res) => {
            dispatch(toggle());
            toast.success(res.data.message, toastOptions);
            reset({});
            setInputFields([ { id: uuidv4(), product: '', size: '' }])

        })
            .catch(err => {
                dispatch(toggle());
                toast.error(err.response.data.error, toastOptions);
            })
    }

    const update = (data) => {
        dispatch(toggle());
        data.image = menuImage;
        data.products= inputFields;
        updateOffer(data).then((res) => {
            dispatch(toggle());
            toast.success(res.data.message, toastOptions);
            reset({});

            props.onFormSubmit();
        })
            .catch(err => {
                toast.error(err.response.data.error, toastOptions);
            })
    }

    const getMenuSize = () => {
        dispatch(toggle())
        getMenuSizes().then((res) => {
            dispatch(toggle())

            setSizes([...res.data.sizes])
       
        })
            .catch((err) => {
                dispatch(toggle())

                toast.error(err.response.data.error, toastOptions);
            })
    };
    const addEditMode = (data) => {
        if (data) {
            setValue('name', props.data.name)
            setValue('expire_on', formatDate(props.data.expire_on))
            setValue('offer_code', props.data.offer_code)
            setValue('points', props.data.points)
            setValue('status', props.data.status)
            setValue('price', props.data.price)
            // setValue('inputFields', props.data.products)
            getMenuSize();
            var result = props.data.products.map(data => ({ id: uuidv4(), product: data.product, size: data.size  }));
            setInputFields(result)
            




            setIsAddEdit(true);
            
        }
    }
    console.log(inputFields,'inputFields');
    const handleImage = (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onloadend = () => {

            setMenuImage(reader.result)

        };
        reader.readAsDataURL(file);

    }



    const handleChangeInput = (id, event) => {
  
        const newInputFields = inputFields.map(i => {
            if (id === i.id) {
                i[event.target.name] = event.target.value
            }
            return i;
        })

        setInputFields(newInputFields);
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, { id: uuidv4(), product: '', size: '' }])
    }
    const handleRemoveFields = id => {
        const values = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
    }
    return (
        <React.Fragment>
            <Box component="div" m={0}>

                <Container >
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={3} >

                                <Grid item md={6} sm={6} xs={12} >
                                    <Controller
                                        name="name"
                                        as={<TextField
                                            error={errors.name ? true : false}
                                            id="name" style={{ width: '100%' }} margin="dense" variant="outlined"
                                            label="Name" helperText={errors.name ? <span>name is reqiured</span> : null} />}
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: 'Required',
                                        }}
                                    />

                                </Grid>

                                <Grid item md={6} sm={6} xs={12} >
                                    {/* <form className={classes.container} noValidate> */}
                                    <Controller
                                        name="expire_on"
                                        as={<TextField
                                            id="expire_on"
                                            style={{ width: '100%' }}

                                            type="date"
                                            margin="dense" variant="outlined"
                                            defaultValue=""
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            error={errors.expire_on ? true : false}

                                            label={t('Expire_On.label')}
                                            helperText={errors.expire_on ? <span>Expire Date  is reqiured</span> : null} />}
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: 'Required',
                                        }}
                                    />
                                    {/* </form> */}
                                </Grid>


                                <Grid item md={6} sm={6} xs={12} >
                                    <Controller
                                        name="offer_code"
                                        as={<TextField
                                            error={errors.offer_code ? true : false}
                                            id="offer_code" style={{ width: '100%' }} margin="dense" variant="outlined"
                                            label={t('offer_code.label')} helperText={errors.offer_code ? <span>offer code is reqiured</span> : null} />}
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: 'Required',
                                        }}
                                    />

                                </Grid>
                                <Grid item md={6} sm={6} xs={12} >
                                    <Controller
                                        name="points"
                                        as={<TextField
                                            error={errors.points ? true : false}
                                            id="points" style={{ width: '100%' }} margin="dense" variant="outlined"
                                            label={t('points.label')} helperText={errors.points ? <span>points are reqiured</span> : null} />}
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: 'Required',
                                        }}
                                    />

                                </Grid>

                                <Grid item md={6} sm={6} xs={12} >
                                    <FormControl error={errors.status ? true : false} style={{ width: "100%" }}
                                        variant="outlined"  >
                                        <InputLabel >{t('status.label')}</InputLabel>
                                        <Controller
                                            name="status"
                                            as={<Select
                                                defaultValue=""
                                                labelId="demo-simple-select-outlined-label"
                                                id="status"
                                                margin="dense"
                                                label={t('selectSize.label')}
                                            >
                                                {
                                                    status.map((item, index) => {
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
                                        <FormHelperText error>{errors.status ? <span>status is reqiured</span> : null}</FormHelperText>
                                    </FormControl>

                                </Grid>


                                <Grid item md={6} sm={6} xs={12} >

                                    <Controller
                                        name="price"
                                        as={<TextField
                                            error={errors.price ? true : false}
                                            id="price" style={{ width: '100%' }} margin="dense" variant="outlined"
                                            label={t('price.label')} helperText={errors.price ? <span>price is reqiured</span> : null} />}
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: 'Required',
                                        }}
                                    />
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

                                <table className="table table-striped table-bordered" >
                                    <IconButton
                                        onClick={handleAddFields}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                    <thead>
                                        <tr>
                                            <th colspan="3" >PRODUCT</th>
                                            <th >Size</th>
                                            <th >Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {inputFields.map(inputField => (
                                         

                                                <tr key={inputField.id}>
                                                    <td colspan="3">


                                                        <Grid item md={12} sm={6} xs={12} >
                                                            <Select
                                                             name="product"
                                                             style={{width:"100%"}}
                                                                 value={inputField.product}
                                                                 onChange={event => {handleChangeInput(inputField.id, event);getSizeChange(inputField.product)}}>
                                                                {
                                                                      products.map((item, index) => {
                                                                        return <MenuItem value={item.id} key={index}>
                                                                            {item.name}
                                                                        </MenuItem>
                                                                    })
                                                                }
                                                            </Select>
                                                            {/* <TextField
                                                                name="firstName"
                                                                label="First Name"
                                                                width="100%"
                                                                variant="filled"
                                                                
                                                            /> */}
                                                        </Grid>
                                                    </td>
                                                    <td >
                                                        <Grid item md={12} sm={6} xs={12} >
                                                        <Select
                                                             name="size"
                                                             style={{width:"100%"}}
                                                                 value={inputField.size}
                                                                 onChange={event => handleChangeInput(inputField.id, event)}>
                                                                {
                                                                      sizes.map((item, index) => {
                                                                        return <MenuItem value={item.id} key={index}>
                                                                            {item.name}
                                                                        </MenuItem>
                                                                    })
                                                                }
                                                            </Select>
                                                        </Grid>
                                                    </td>
                                                    <td>
                                                        <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                                                            <RemoveIcon />
                                                        </IconButton>
                                                    </td>

                                                </tr>
                                       
                                        ))}

                                    </tbody>
                                </table>

                                <Grid item md={12} sm={12} xs={12}>
                                    <Button type="submit" variant="contained" color="primary">
                                        {t('submit.label')}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Container>

            </Box>
        </React.Fragment>
    )
}
