import React from 'react';
import Icon from '../../components/icon/Icon';
import MessageSendFormContainer from '../../containers/MessageSendFormContainer';
import SendedMessagesListContainer from '../../containers/SendedMessagesListContainer';

import './AppLayout.css';
import LogoIcon from '../../icons/LOGO.svg';

function AppLayout() {
  return (
    <div className="AppLayoutWrapper">
      <Icon src={LogoIcon} alt="App logo" className="AppLogo" />
      <div className="u-marginBottom">
        <MessageSendFormContainer />
      </div>
      <section className="SendedMessagesInfo u-marginBottom">
        <h2 className="Heading SendedMessagesInfo-mainHeading  u-letterSpacing">Отправленные сообщения</h2>
        <SendedMessagesListContainer />
      </section>
    </div>
  );
}

export default AppLayout;
