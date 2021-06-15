import React from 'react'
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { removeItemToCart, updateQuanity } from '../../../actions/cartActions';
import { useTranslation } from 'react-i18next';
import QuanityField from './QuanityField';

const TableBody = styled.tbody`
    max-height:100px;
    overflow:scroll;
    border: 1px solid #eee;
`;
const TableFooter = styled.tfoot`
`;

const Content = styled.span`
`;

const NoContent = styled.p`
text-align:center;
margin:0
`;

const FooterContent = styled.span`
    font-weight: bold;
`;

const FooterContentTax = styled.span`
    
`;

const useStyle = makeStyles((theme) => ({
    tableHead: {
        textTransform: 'uppercase',
        background: '#ff6877',
        border: 'none !important',
        color: 'white'
    }
}))

export default function InvoiceTable() {

    const { t } = useTranslation();
    let cart = useSelector(state => state.cart.cart);

    const dispatch = useDispatch();

    const removeItem = (item) => {
        dispatch(removeItemToCart(item));
    }
    const classes = useStyle();
    return (
        <div>
            <table className="table table-hover" style={{ fontSize: '12px' }}>
                <thead>
                    <tr className={classes.tableHead}>
                        <th colSpan={2}>{t('items')}</th>
                        <th>{t("price.label")}</th>
                        <th>{t("QTY")}</th>
                        <th>{t("total_price")}</th>
                        <th>{t("Action")}</th>

                    </tr>
                </thead>
                <TableBody>

                    {(cart && cart.content.length > 0) ?
                        cart.content.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td colSpan={2}>{item.name} {item.size != ' ' ? '-' + item.size : ''} </td>
                                    <td>{item.unit_price}</td>
                                    <td><QuanityField item={item} key={index} /></td>
                                    <td>{item.total_price}</td>
                                    <td><DeleteIcon onClick={() => removeItem(item)} /></td>
                                </tr>
                            );
                        })
                        :
                        <tr>
                            <td colSpan={6}>
                                <NoContent> {t("no_item")}</NoContent>
                            </td>
                        </tr>
                    }
                </TableBody>
                <TableFooter>
                    <tr>
                        <td colSpan={6}><FooterContent>{t("Total_Items")}: ({cart.totalItem})</FooterContent></td>
                    </tr>

                    <tr>
                        <td colSpan={5}>
                            <FooterContent>
                                <Content>{t("Sub_Total")}:</Content>
                            </FooterContent></td>
                        <td>{cart.subTotal}</td>
                    </tr>
                    <tr>
                        <td colSpan={5}>
                            <FooterContent>
                                <Content>{t("Discount_on_Cart")}:</Content>
                            </FooterContent></td>
                        <td>{cart.discount}</td>
                    </tr>
                    {/* <tr>
                        <td colSpan={5}>
                            <FooterContent>
                                <Content>Total TAX:</Content>
                            </FooterContent></td>
                        <td>{cart.total_tax}</td>
                    </tr> */}

                    {
                        cart.shippingCost ? <tr>
                            <td colSpan={5}>
                                <FooterContent>
                                    <Content>{t("shipping_cost")}:</Content>
                                </FooterContent></td>
                            <td>{cart.shippingCost}</td>
                        </tr> : null
                    }
                    <tr>
                        <td colSpan={5}>
                            <FooterContent>
                                <Content>{t("Total")}:</Content>
                            </FooterContent></td>
                        <td>{cart.total}</td>
                    </tr>
                    {cart.tax_array && cart.tax_array.length > 0 ? <tr>
                        <td colSpan={5}>
                            {cart.tax_array.map((item, index) => {
                                return (
                                    <FooterContentTax key={index}>
                                        <Content>enth.MwS.{item.vat_label}={item[cart.tax_type]}% {item.tax_amount} ({item.amount})<br /></Content>
                                    </FooterContentTax>);
                            })

                            }
                        </td>
                    </tr> : null}
                </TableFooter>
            </table>
        </div >
    )
}
