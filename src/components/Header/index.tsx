import React from 'react';
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles';

import logoimg from '../../assets/Logo.svg';


export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoimg} alt="" />
        <NewTransactionButton>Nova transação</NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  )
}
