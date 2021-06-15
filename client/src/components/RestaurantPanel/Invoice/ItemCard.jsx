import React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import '../SharedComponent/style.css';
import styled from 'styled-components'
import Logo from '../../../assets/images/ResturantProLogo.png';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";
import { addToCart as addToCartAction } from '../../../actions/cartActions';


const LOGO = styled.img`
display:block;
height:auto;
max-width:150px;
`;
const LogoWraper = styled.div`
flex:2;
display:flex;
justify-content:center;
`;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    cardAction: {
        marginTop: "13px",
        color: 'white',
        background: 'rgba(0,0,0,0.6)',
        fontWeight: 'bold',
        // background:'#ff6877',
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
        // backgroundImage: `url(${"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"})`
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },

}));
export default function ItemCard(props) {
    const classes = useStyles();

    const dispatch = useDispatch();

    const selectSize = (item) => {
        props.setname(item)
        // props.open();
        props.getAll(item);
        // let  id =item.byproducts_labels_id

    }
    const addToCart = (item) => {

        let content = {
            id: item.byproducts_labels_id,
            name: item.name,
            unit_price: item.sale_price,
            total_price: item.sale_price,
            size_id: item.size_id,
            vat_din_in: item.vat_din_in,
            vat_take_away: item.take_away_vat,
            qty: 1,
            sku: item.sku,
            size: item.size_name,
            options: []
        }
        dispatch(addToCartAction(content));

    }
    return (
        <div>
            {
                props.item_size ?
                    <Card onClick={() => selectSize(props.name)} className={classes.cardCover}  style={(props.item_row.product_image !=null ? {backgroundImage: `url(/public/images/menu/${props.item_row.product_image})`} : {backgroundImage: `url("https://s3.eu-central-1.amazonaws.com/web.eu-central-1.sumra.net/noimage.png?1500586448")`} )}>
                        <p className="ribbon">{props.price} €</p>
                        <CardHeader />
                        <CardActions disableSpacing className={classes.cardAction}>
                            {props.name}
                        </CardActions>
                    </Card>
                    :
                    <Card onClick={() => addToCart(props.item_row)} className={classes.cardCover} style={(props.item_row.product_image !=null ? {backgroundImage: `url(/public/images/menu/${props.item_row.product_image})`} : {backgroundImage: `url("https://s3.eu-central-1.amazonaws.com/web.eu-central-1.sumra.net/noimage.png?1500586448")`} )}>
                        <p className="ribbon">{props.price} €</p>
                        <CardHeader />
                        <CardActions disableSpacing className={classes.cardAction}>
                            {props.name}
                        </CardActions>
                    </Card>
            }

        </div>

    )
}