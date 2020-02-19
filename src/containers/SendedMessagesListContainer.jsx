import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Table from '../components/table/Table';
import { requestDeliveryStatus } from '../actions/networkRequestsActions';

import { isArraysOfObjectsEqual } from '../utilities/isEqual';

class SendedMessagesListContainer extends Component {
  constructor(props) {
    super(props);
    this.checkUpdates = this.checkUpdates.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.checkUpdates, 10000);
  }

  componentDidUpdate(prevProps) {
    const { sendedMessages } = this.props;

    if (!isArraysOfObjectsEqual(prevProps.sendedMessages, sendedMessages)) {
      this.interval = setInterval(this.checkUpdates, 10000);
    }

    if (isArraysOfObjectsEqual(prevProps.sendedMessages, sendedMessages)) {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  checkUpdates() {
    const { getMessageStatus, sendedMessages } = this.props;

    sendedMessages.forEach((message) => {
      if (message.statusValue > -1) {
        getMessageStatus(message.id);
      }
    });
  }

  render() {
    const { sendedMessages } = this.props;
    return (
      <>
        {sendedMessages.length < 1
          ? <p>Сообщения ещё не отправлялись</p>
          : (
            <Table
              data={sendedMessages}
            />
          )}
      </>
    );
  }
}

SendedMessagesListContainer.propTypes = {
  sendedMessages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    date: PropTypes.string,
    subject: PropTypes.string,
    status: PropTypes.string,
    statusValue: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  })),
  getMessageStatus: PropTypes.func,
};

SendedMessagesListContainer.defaultProps = {
  sendedMessages: [{
    id: '',
    date: '',
    subject: '',
    status: '',
    statusValue: '',
  }],
  getMessageStatus: () => { },
};

function mapStateToProps({ sendFormReducer }) {
  return {
    sendedMessages: sendFormReducer.sendedMessages,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMessageStatus: (id) => dispatch(requestDeliveryStatus(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SendedMessagesListContainer);
