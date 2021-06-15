import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'


const FooterContentWraper = styled.div`
display:block;
position: relative; 
`;

const FooterContentBlock = styled.div`
    background: #f0f0fa;
    padding: 10px;
    width:100%;
    
  
    
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ContentText = styled.p`
    margin:0;
    font-size:11px;
  
`;


export default function FooterContent() {
    const { t, i18n } = useTranslation();

    return (
        <FooterContentWraper>
            <FooterContentBlock>
                <ContentText>{t('developBy.label')} <a href="https://www.geeklone.com" rel="noreferrer" target="_blank">Geeklone Technology</a> v(4.2)</ContentText>
            </FooterContentBlock>
        </FooterContentWraper>
    )
}
