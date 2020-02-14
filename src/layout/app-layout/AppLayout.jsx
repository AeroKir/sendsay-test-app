/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import Icon from '../../components/icon/Icon';
import MessageSendFormContainer from '../../containers/MessageSendFormContainer';
import SendedMessagesListContainer from '../../containers/SendedMessagesListContainer';

import './AppLayout.css';
import LogoIcon from '../../icons/LOGO.svg';

class AppLayout extends Component {
  constructor(props) {
    super(props);
    this.preventFileDrop = this.preventFileDrop.bind(this);
    this.preventFileDragover = this.preventFileDragover.bind(this);
  }

  preventFileDrop(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  preventFileDragover(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  render() {
    return (
      <div className="AppLayoutWrapper" onDrop={this.preventFileDrop} onDragOver={this.preventFileDragover}>
        <div className="AppLogoWrapper">
          <Icon src={LogoIcon} alt="App logo" className="AppLogo" />
        </div>
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
}

export default AppLayout;
