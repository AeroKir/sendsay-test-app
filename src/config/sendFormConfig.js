const sendFormConfig = {
  inputs: [
    {
      id: 'sender-name-input',
      type: 'text',
      name: 'senderName',
      label: 'От кого',
      placeholder: 'Имя',
      inputHalfLeft: true,
      errorMessage: 'Поле "От кого" не может быть пустым',
    },
    {
      id: 'sender-email-input',
      type: 'email',
      name: 'senderEmail',
      placeholder: 'Email',
      inputHalfRight: true,
      errorMessage: 'Введите корректный Email',
    },
    {
      id: 'receiver-name-input',
      type: 'text',
      name: 'receiverName',
      label: 'Кому',
      placeholder: 'Имя',
      inputHalfLeft: true,
      errorMessage: 'Поле "Кому" не может быть пустым',
    },
    {
      id: 'receiver-email-input',
      type: 'email',
      name: 'receiverEmail',
      placeholder: 'Email',
      inputHalfRight: true,
      errorMessage: 'Введите корректный Email',
    },
    {
      id: 'message-subject-input',
      type: 'text',
      name: 'messageSubject',
      label: 'Тема письма',
      placeholder: '',
      errorMessage: 'Тема письма не может быть пустой',
    },
  ],
  textarea: {
    id: 'message-content',
    name: 'messageText',
    label: 'Сообщение',
    placeholder: '',
    errorMessage: 'Сообщение не может быть пустым',
  },
  submitButton: {
    type: 'submit',
    buttonText: 'Отправить',
  },
  infoBlock: {
    heading: 'Сообщение поставлено в очередь на отправку',
  },
};

export default sendFormConfig;
