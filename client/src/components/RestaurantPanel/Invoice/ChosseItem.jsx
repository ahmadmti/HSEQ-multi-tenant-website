import React, { useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ItemCard from './ItemCard';
import AppBar from '@material-ui/core/AppBar';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import Modal from '../SharedComponent/Modal';
import ItemSizesCard from './ItemSizeModal';
import { getCategoriesItemsTab, getAllSizes, getTabItems } from '../../../api/api';
import { Button } from '@material-ui/core';
// import Logo from '../../../assets/images/ResturantProLogo.png'
import styled from 'styled-components';
import { searchProduct } from '../../../api/api';
import AddDiverseModal from './AddDiverseItemModal';
import { useTranslation } from 'react-i18next';
import * as $ from 'jquery';
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import { useDispatch } from "react-redux";
import { toggle } from '../../../actions/pacerActions';
import { addToCart as addToCartAction } from '../../../actions/cartActions';

const ButtonWrapperSearch = styled.div`
    height:100%;
    display:flex;
   justify-content:center;
   align-Items:center;
`;

const Filter = styled.div`
    padding-bottom:7px;
`;

const NoItem = styled.p`
    color:#999393;
    text-align:center;
    width:100%;
    margin-top:15px;
    `;

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box div={3}>
                    <Typography variant="body2" component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        width: '100%',


    },
    cardAction: {
        marginTop: "13px",
        color: 'white',
        background: 'rgba(0,0,0,0.6)',
        fontWeight: 'bold',
        // background:'#ff6877',
    },
    btnBox: {
        margin: '5px'
    },
    cardCover: {
        overflow: 'hidden', /* required */
        maxWidth: '200px',
        width: '101%',
        height: '80px',
        minWidth: '114px',
        objectFit: 'cover',
        position: 'relative', /* required  for demo*/
        backgroundRepeat: 'round',
        backgroundImage: `url(${"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"})`
    },
    MuiTabWrapper: {

        color: '#ff6877',
    },
    tabs: {
        color: 'white !important',

    },
    tabsPanel: {
        height: '400px',
        overflow: 'scroll',

    },
    // MuiTabTextColorPrimary:{
    //     color:'white !important',
    // },
    appBar: {
        color: 'white !important',
        background: '#ff6877 !important',
    },
    MuiSelected: {
        color: 'white',
    }

}));



export default function ChosseItem() {
    const [editModal, setEditModal] = React.useState(false);
    const [skuCode, setSkuCode] = React.useState('');
    const [productName, setProductName] = React.useState('');
    const [diverseItemModal, setDiverseItemModal] = React.useState(false);
    const { t } = useTranslation();
    const [categoriesTab, setCategorioesTab] = React.useState([]);
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [nameOfItem, setItemName] = React.useState();
    const [categoriesItem, setCategorioesItem] = React.useState([]);
    const [sizeItem, setSizeItem] = React.useState([]);
    const toastOptions = React.useContext(ToastContext);
    const dispatch = useDispatch();


    const editItem = (item) => {
        setEditModal(true)
    }
    useEffect((event) => {

        getCatecoryTab();

        document.addEventListener("keydown", (event) => {

            if (event.keyCode === 13) {
                $('#find').trigger('click');
            }
        });


    }, [])
    const getCatecoryTab = (data) => {
        dispatch(toggle())

        getCategoriesItemsTab(data).then((res) => {
            // console.log(res.data,"cate")
            setCategorioesTab([...res.data.data])
            if (res.data.data.length > 0)
                setValue(res.data.data[0].category_id)
            dispatch(toggle())

        }).catch((err) => {
            dispatch(toggle())

        })
    }


    const setItemsName = (data) => {
        setItemName(data)
    }
    const handleChange = (event, newValue) => {
        console.log(newValue, "newval");
        // dispatch(toggle())

        // getTabItems(newValue).then((res) => {
        //     dispatch(toggle())

        //     setCategorioesItem([...res.data.data])

        // }).catch((err) => {
        //     dispatch(toggle())

        // });
        setValue(newValue);
    };


    const getData = (data) => {
        console.log(data);
        if (data.length > 1) {
            setSizeItem(data)
            setEditModal(true);
        } else {
            let content = {
                id: data[0].product_label_id,
                name: data[0].name,
                unit_price: data[0].sale_price,
                total_price: data[0].sale_price,
                size_id: data[0].size_id,
                qty: 1,
                din_in: data[0].vat_din_in,
                take_away: data[0].take_away_vat,
                vat_label: data[0].vat_label,
                sku: data[0].sku,
                size: data[0].size_name,
                options: []
            }
            dispatch(addToCartAction(content));
        }


    }


    const addItem = () => {
        setDiverseItemModal(true);
    }

    const search = () => {

        if (productName != '' || skuCode != '') {
            dispatch(toggle())

            searchProduct({ productName, skuCode }).then(res => {
                dispatch(toggle())

                if (res.data.data.length > 0){
                setCategorioesTab(old=>{
                  let index= old.findIndex(item=>item.category_id== -11);
                  if(index <= -1){
                    return [...res.data.data,...old];

                  }else{
                    
                      old[index]=res.data.data[0];
                      console.info(old,index)
                    return [...old];
                  }      
                })
                setValue(-11)
                }
                else{
                    toast.error('No Item Found', toastOptions);
                }
            }).catch(err => {
                dispatch(toggle())

                console.log(err);
                toast.error(err.response.data.error, toastOptions);
            })
        }
    }


    return (


        <div style={{ padding: '10px', paddingTop: '0' }}>
            <Modal title={t('Diverse_Item')} open={diverseItemModal} close={() => setDiverseItemModal(false)}>
                <AddDiverseModal close={() => setDiverseItemModal(false)} />
            </Modal>
            <Filter>
                <Grid container spacing={0} >

                    <Grid item md={12} sm={12} xs={12} >

                        <TextField
                            style={{ width: '100%' }}
                            id="standard-name"
                            margin="dense"
                            variant="outlined"
                            label={t("Enter_Product_Name")}
                            value={productName}

                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={8} sm={8} xs={12} >
                        <TextField style={{ width: '100%' }} margin="dense" variant="outlined"
                            label={t('itemCode.label')} value={skuCode}
                            onChange={(e) => setSkuCode(e.target.value)} />
                    </Grid>
                    <Grid item md={4} sm={4} xs={12} >
                        <ButtonWrapperSearch>
                            <Button id="find" onClick={search} className={classes.btnBox} variant="contained" color="primary">
                                {t("find")}
                            </Button>
                            <Button onClick={addItem} className={classes.btnBox} variant="contained" color="primary">
                                {t("items")}
                            </Button>
                        </ButtonWrapperSearch>
                    </Grid>

                </Grid>
            </Filter>
            <AppBar className={classes.appBar} position="static" color="default">

                <Tabs
                    className={classes.tabs}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {
                        (categoriesTab.length > 0) ?
                            categoriesTab.map((item, index) => {
                                return (
                                    // {item}
                                    <Tab label={item.category_name} key={index} value={item.category_id} {...a11yProps(index)} />
                                )
                            }) :
                            <Tab label={t('no_Categories')} {...a11yProps(1)} disabled />

                    }


                </Tabs>
            </AppBar>

            {
                categoriesTab.map((item, index) => {


                    return (
                        <TabPanel className={classes.tabsPanel} key={index + 'panal'} value={value} index={item.category_id} >
                            <div>
                                <Grid container spacing={2} >

                                    {
                                        (item.products.length > 0) ?
                                            item.products.map((item, index) => {
                                                return (
                                                    <Grid item md={4} sm={6} xs={6} key={index}>
                                                        {
                                                            item.size_id
                                                                ?
                                                                <ItemCard key={index + 'pan'} item_row={item} setname={(data) => setItemsName(data)} item_size={true} getAll={() => getData(item.allSizes)} open={() => setEditModal(true)} name={item.name} price={item.sale_price}></ItemCard>
                                                                :
                                                                <ItemCard key={index + 'pan'} item_row={item} name={item.name} price={item.sale_price}></ItemCard>
                                                        }

                                                    </Grid>

                                                )
                                            }) : <NoItem>{t('no_item')}</NoItem>
                                    }

                                </Grid>
                            </div>
                            <Modal title={nameOfItem} open={editModal} close={() => setEditModal(false)}>
                                <ItemSizesCard data={sizeItem} close={() => setEditModal(false)} />
                            </Modal>
                        </TabPanel>
                    )
                })
            }



        </div>



    );
}
