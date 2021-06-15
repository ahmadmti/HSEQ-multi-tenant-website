import React from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Modal from '../SharedComponent/Modal';
import Form from './AddCustomerForm';

import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
const CustomerTabButtonWrapper = styled.div`
    width:100%;
    display:flex;
    padding:2px;
    justify-content:center;
    align-items:center;
    justify-content: flex-end;
`;



export default function AddCustomer(props) {
    const [modal, setModal] = React.useState(false);
    const closeModal = (defaultcustomer) => {

        setModal(false);
        props.updateCustomers((defaultcustomer && defaultcustomer[0]) ? defaultcustomer[0] : null);
    }
    const dispatch = useDispatch();
    const { t } = useTranslation();
    React.useEffect(() => {
        // if (props.number)
        //     setModal(true);
    })
    return (
        <React.Fragment>
            <CustomerTabButtonWrapper>
                <Button variant="outlined"
                    onClick={() => setModal(true)}
                    color="secondary" startIcon={<PersonAddIcon />}></Button>
                {/* {t("Add_Customer")} */}
            </CustomerTabButtonWrapper>
            <Modal title={t('customer')} open={modal || props.open} close={closeModal}>
                <Form number={props.number} customerList={props.customerList} onFormSubmit={(defaultcustomer) => closeModal(defaultcustomer)} />
            </Modal>
        </React.Fragment>
    )
}
