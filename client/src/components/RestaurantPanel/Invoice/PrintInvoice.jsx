import React, { useEffect, useContext, useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import Logo from '../../../assets/images/ResturantProLogo.png';
import CompanyContext from '../../../context/CompanyContext';
import { useTranslation } from 'react-i18next';
import { camelize } from '../../../helper/helper';
const PrintInvoice = (props) => {
    const { t } = useTranslation();
    const componentRef = useRef();
    const company = useContext(CompanyContext);
    const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10))
    const [time, seTime] = React.useState(() => {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();

        return (h + ":" + m + ":" + s);
    })

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    useEffect(() => {
        handlePrint();
    }, [])
    return (
        <div ref={componentRef}>
            <table style={{ tableLayout: "fixed", fontSize: '14px', width: '60mm' }} className="table ">
                <thead style={{ width: "100%" }}>
                    {
                        company ? <tr style={{ width: "100%" }}>

                            <td style={{ width: "100%", textAlign: 'center' }} colSpan={3}>
                                <img id="logo" src={`/public/images/company/${company.logo}`} width="100%" height="auto" alt="logo" />
                                <br /><br /><br />
                                <br />
                                <h5>{company.name}</h5><br />
                                <b>
                                    <span style={{ fontSize: "14px" }}>
                                        {company.email}<br />
                                        {company.address} <br />
                                        {company.zip_code}
                                        <br /><br />
                                    Tel: {company.phone_number}</span>
                                </b>

                            </td>
                        </tr> :
                            null
                    }



                    <tr style={{ width: "100%" }}>

                        <td style={{ width: "100%", fontSize: "14px" }} colSpan={3}>

                            {date}<br />

                            {time}

                        </td>

                    </tr>



                    {
                        !props.customerDetail.name ? <tr style={{ width: "100%" }}>

                            <td style={{ width: "100%", fontSize: "14px" }} colSpan={3}>
                                
                               {t('Walking_Customer')}
                            </td>
                        </tr> : <tr style={{ width: "100%" }}>

                            <td style={{ width: "100%", fontSize: "14px" }} colSpan={3}>
                                {props.customerDetail.name}
                            </td>
                        </tr>
                    }



                    <tr style={{ width: "100%" }}>

                        <td style={{ width: "100%", fontSize: "14px" }} colSpan="3">
                          {t('invoiceNumber')} <br />
                            {props.customerDetail.invoice_no}
                        </td>

                    </tr>


                    {
                        (props.customerDetail.name && props.customerDetail.email)
                            ?
                            <tr style={{ width: "100%" }}>

                                <td style={{ width: "100%", fontSize: '14px' }} colSpan={3}>
                                    <b>


                                        {props.customerDetail.name},
                                        {props.customerDetail.email}
                                        <br />
                                        {props.customerDetail.phone_number},
                                        {props.customerDetail.zip_code},
                                        <br />
                                        {
                                            (props.customerDetail && props.customerDetail.note) ?
                                                <span style={{ fontWeight: 'normal', fontSize: '14px' }}>Remakrs: {props.customerDetail.note}</span>
                                                :
                                                null
                                        }
                                        {/* <span style="font-weight:normal; font-size: 14px;">Anmerkungen: {{ $customer-> notes}}</span> */}
                                        {/* @if($customer) */}

                                        {/* {{ $customer-> customer_name}} <br> */}

                                        {/* {{ optional($customer-> street)->street_name }} . {{ $customer-> house_no}}<br> */}

                                        {/* {{ $customer-> zip_code}} */}

                                        {/* {{ optional($customer-> cityData)->name }} */}

                                        {/* <br/> */}

                                        {/* @if($customer->customer_phone) */}

                                        {/* Tel: {{ $customer-> customer_phone}} */}

                                        {/* @endif */}

                                        {/* @if($customer->notes) */}
                                        {/* <br /> */}
                                        {/* <span style="font-weight:normal; font-size: 14px;">Anmerkungen: {{ $customer-> notes}}</span> */}
                                        {/* @endif */}

                                        {/* @endif */}

                                    </b>

                                </td>

                            </tr> : null
                    }





                </thead>

                <tbody style={{ width: "100%" }}>

                    <tr style={{ width: "100%" }}>

                        <td height="30" colSpan="2" style={{ fontWeight: "bold", fontSize: "14px" }}>
                        {t("Item")}
                        </td>
                        <td height="30" style={{ fontWeight: "bold", textAlign: "right", fontSize: "14px" }} >
                        {t("Price")} 
                        </td>
                    </tr>

                    {/* @php($cart_subtotal = 0) */}

                    {/* @php($vat_cat = []) */}

                    {/* @foreach(Cart::instance('tab_'. $tab_id)->content() as $cart) */}

                    {/* <?php */}

                    {/* $sub_total = $cart->qty * $cart->price; */}

                    {/* $vat_cat[$cart->options->vat_label][] = $cart; */}

                    {/* //$vat = $cart->options->vat; */}

                    {/* //$sub_total += ($vat / 100) * $sub_total; */}

                    {/* ?> */}

                    {
                        props.data.content.map((item, index) => {

                            return (
                                <tr style={{ width: "100%" }} key={index}>

                                    <td height={'20'} colSpan={2} style={{ fontSize: "14px" }}>
                                        {item.qty} X {item.name} {item.size ? '-' + item.size : null}
                                    </td>

                                    <td height={"20"} style={{ textAlign: 'right', fontSize: '14px' }}>
                                        {item.total_price}
                                    </td>

                                </tr>
                            )
                        })
                    }



                    {/* @if($cart->options->has('ingredients')) */}

                    {/* @foreach($cart->options->ingredients as $ingredient) */}

                    {/* <tr style="width: 100%">

                        <td height="20" colspan="3" style="font-size: 14px;">

                            &nbsp;&nbsp;&nbsp;{{ $ingredient['qty'] .'X'.$ingredient['name'].':' .germanFormat($ingredient['price']).$company -> currency }}

                        </td>

                    </tr>

    @endforeach

    @endif */}

                    {/* @php($cart_subtotal+=$sub_total) */}

                    {/* @endforeach */}

                    <tr style={{ width: "100%" }}>

                        <td height={"20"} colSpan="2" style={{ fontSize: "14px", fontWeight: "bold" }}>
                            {t("subTotal")}
                        </td>

                        <td height={"20"} style={{ fontSize: "14px", fontWeight: "bold", textAlign: "right" }}>

                            {props.data.subTotal}
                        </td>

                    </tr>


                    <tr style={{ width: "100%" }}>
                        <td height="20" colSpan={"2"} style={{ fontSize: "14px" }}>
                            {t("Discount")}
                        </td>

                        <td height={"20"} style={{ fontSize: '14px', textAlign: "right" }}>
                            {props.data.discount}
                        </td>
                    </tr>




                    <tr style={{ width: "100%" }}>
                        <td height={"20"} colSpan="2" style={{ fontSize: "14px" }}>
                            {t("Shipping")}
                        </td>
                        <td height={"20"} style={{ fontSize: '14px', textAlign: 'right' }}>
                            {props.data.delivery_charges}
                        </td>

                    </tr>

                    {/* <tr style={{ width: "100%" }}>
                        <td height={"20"} colSpan="2" style={{ fontSize: "14px" }}>
                            Tax
                        </td>
                        <td height={"20"} style={{ fontSize: '14px', textAlign: 'right' }}>
                            {props.data.TotalTax}
                        </td>

                    </tr> */}

                    <tr style={{ width: "100%" }}>

                        <td height={"20"} colSpan={"2"} style={{ fontSize: "14px", fontWeight: 'bold' }}>
                            {t("Total")}
                        </td>

                        <td height={"20"} style={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'right' }}>
                            {props.data.total_price}
                            {/* {{ germanFormat( ($cart_subtotal + $shipping_cost - $discount)) . $company->currency }} */}
                        </td>
                    </tr>



                    {/* @if($order->points_out) */}

                    {/* <tr style={{ width: "100%" }}>

                        <td height={"20"} colSpan={"2"} style={{ fontSize: "14px", fontWeight: 'bold' }}>

                            Verbrauchte Bonuspunkte

      </td>

                        <td height={"20"} style=font-size: 14px; font-weight: bold; text-align: right;"> {{ $order-> points_out}}</td>

                    </tr> */}



                    {/* <tr style="width: 100%">

                        <td height={"20"} colSpan={2} style={{ fontSize: '14px', fontWeight: 'bold' }}>
                            Totally affordable
                        </td>

                    {/* <td height="20" style="font-size: 14px; font-weight: bold; text-align: right;"> {{ $company-> currency}} 0</td> 

    </tr> */}

                    {/* @endif */}



                    <tr style={{ width: "100%" }}>

                        <td height={"20"} colSpan={"2"} style={{ fontSize: "14px", fontWeight: 'bold' }}>
                            {t("Order_type")}
                        </td>
                        <td height={"20"} style={{ fontSize: '14px' }}>
                        {t(`${camelize(props.data.order_type.toLowerCase())}`)}
                            {/* {(props.data.order_type == 'TAKE_AWAY') ? 'Out Home' : 'inSide Home'} */}
                            {/* { $order-> order_type == "TAKE_AWAY" ? "Außer Haus" : "Im Haus"} */}
                        </td>

                    </tr>

                    {
                        props.data.tax_array ?
                            props.data.tax_array.map((item, index) => {
                                return (
                                    <tr style={{ width: "100%" }}>
                                        <td colSpan={"4"} style={{ fontSize: "11px" }}>
                                            enth.MwS.{item.vat_label}={item.perencetage ? item.perencetage : item[((props.data.order_type == 'TAKE_AWAY' ? 'take_away' : 'din_in').toLowerCase())]}% {item.tax_amount} ({item.amount})
                                        </td>
                                    </tr>)
                            })
                            : null
                    }

                    {/* <?php */}

                    {/* $vat_cat_sum = []; */}

                    {/* foreach ($vat_cat as $key => $items) { */}

                    {/* $amount = 0; */}

                    {/* foreach ($items as $item) { */}

                    {/* $amount += ($item -> qty * $item -> price); */}

                    {/* } */}



                    {/* $vat_cat_sum[$key] = ['amount' => $amount, 'vat' => $item->options->vat]; */}

                    {/* } */}



                    {/* ?> */}

                    {/* <tr style="width: 100%">

                        <td height="20" colspan="3" style="text-align: left; font-size: 14px;">

                            @foreach($vat_cat_sum as $key => $vatCat)

        <?php

$percent = ($vatCat['amount'] / ($vatCat['vat'] + 100)) * 100;

$cal_vat = $vatCat['amount'] - $percent;

?>
 
        enth.MwSt.{{ $key }} = {{ $vatCat['vat'] }}% {{ germanFormat($cal_vat) }}

        ({{ germanFormat($vatCat['amount'] ) }})<br>

                                @endforeach

      </td>

    </tr> */}

                    {/* @if(Session::has('shipping_cost'))
    <tr style="width: 100%">

                            <td height="20" colspan="3" style="text-align: left; font-size: 14px;">
                                @php($vatAmount = 0)
                                @php($shipping_cost = Session::get('shipping_cost'))
          <?php

$percent = ($shipping_cost / (19 + 100)) * 100;
$cal_vat = $shipping_cost - $percent;

$vatAmount += $cal_vat;

?>
          enth.MwSt.FK = {{ germanFormat(19) }}% {{ germanFormat($cal_vat) }}
          ({{ germanFormat($shipping_cost) }})<br>
        </td>

      </tr>
      @endif */}



                    {/* @if($company->bonus_points == 1)

    <tr style="width: 100%">

                                <td height="20" colspan="2" style="font-size: 14px; font-weight: bold;">
                                    Bonuspunkte


      </td>

                                <td height="20" style="font-size: 14px;">
                                    {{ $order-> points_out}}


      </td>

                            </tr>
    @endif */}

                    {/* @foreach($offers as $offer)

    <tr style="width: 100%">

                                <td height="20" colspan="2" style="font-size: 14px;">{{ $offer-> name}}</td>

                                <td height="20" style="font-size: 14px;">{{ $offer-> points}}</td>

                            </tr>

    @endforeach

 */}

                    <tr style={{ width: "100%" }}>
                        <td height={"20"} colSpan={"3"} style={{ fontSize: '14px' }} className="text-center">{company.invoice_footer_line || null}</td>
                    </tr>

                </tbody>

            </table>

        </div>
    )
}
export default PrintInvoice;