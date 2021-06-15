import React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import '../SharedComponent/style.css';
import styled from 'styled-components'
import { Box, FormControlLabel, Checkbox, Grid, Button, TextField, Container } from '@material-ui/core';
import { useDispatch } from "react-redux";
import Logo from '../../../assets/images/ResturantProLogo.png';
import { makeStyles } from '@material-ui/core/styles';
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

export default function ItemSizesCard(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const addToCart = (item) => {

        let content = {
            id: item.product_label_id,
            name: item.name,
            unit_price: item.sale_price,
            total_price: item.sale_price,
            size_id: item.size_id,
            qty: 1,
            din_in: item.vat_din_in,
            take_away: item.take_away_vat,
            vat_label: item.vat_label,
            sku: item.sku,
            size: item.size_name,
            options: []
        }
        props.close();
        dispatch(addToCartAction(content));

    }

    return (
        <div>
            <Box component="div" m={0}>

                <Container >
                    <CardContent>
                        <Grid container spacing={3} >
                            {
                                props.data.map((item, index) => {
                                    return (

                                        <Grid item md={6} sm={6} xs={6} key={index}>
                                            <Card onClick={() => addToCart(item)} className={classes.cardCover}  style={(item.product_image !=null ? {backgroundImage: `url(/public/images/menu/${item.product_image})`} : {backgroundImage: `url("https://s3.eu-central-1.amazonaws.com/web.eu-central-1.sumra.net/noimage.png?1500586448")`} )}>
                                                <p className="ribbon">{item.sale_price} €</p>
                                                <CardHeader />
                                                <CardActions disableSpacing className={classes.cardAction}>

                                                    <span>{item.size_name}</span>
                                                </CardActions>
                                            </Card>

                                        </Grid>

                                    )
                                })
                            }

                        </Grid>

                    </CardContent>
                </Container >
            </Box>
        </div>

    )
}