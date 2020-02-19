import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InputTypeFile from '../components/input/InputTypeFile';
import AttachedFileField from '../components/input/AttachedFileField';
import FileReceiver from '../components/file-receiver/FileReceiver';
import InfoBlock from '../components/service-blocks/InfoBlock';
import Modal from '../components/modal/Modal';
import ExtraContentBlock from '../components/service-blocks/ExtraContentBlock';
import TextBlock from '../components/service-blocks/TextBlock';
import Button from '../components/button/Button';

import { storeAttachedFile, removeAttachedFile } from '../actions/attachedFilesActions';

import convertFileListToArray from '../utilities/convertFileListToArray';
import reduceLongFileName from '../utilities/reduceLongFileName';
import generateKey from '../utilities/generateKey';

import { ACCEPTED_FILE_TYPES, MAX_BYTES_PER_FILE, MAX_BYTES_PER_SINGLE_EMAIL } from '../constants/fileRestrictions';
import warningIcon from '../icons/icon-warning.svg';

const acceptedFileTypesArray = ACCEPTED_FILE_TYPES.split(',').map((item) => item.trim());

class FileAttachmentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileReceiverState: {
        isFileReceiverShowed: false,
        isDragOver: false,
      },
      isModalShowed: false,
      attachedFiles: [],
      attachedFileSizes: [],
      rejectedFiles: [],
      warningMessage: '',
      indexForFileDeletion: 0,
      nameFileForDeletion: '',
      isTtotalFilesSizeLimitAchieved: false,
    };

    this.fileInputRef = React.createRef();

    this.deleteFile = this.deleteFile.bind(this);

    this.openFileDialog = this.openFileDialog.bind(this);
    this.closeInfoBlock = this.closeInfoBlock.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleFileInputClick = this.handleFileInputClick.bind(this);
    this.handleFileInputChange = this.handleFileInputChange.bind(this);
    this.handleFileDelete = this.handleFileDelete.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.convertFileToBase64 = this.convertFileToBase64.bind(this);
  }

  checkAttachedFiles(attachedFilesArray) {
    attachedFilesArray.forEach((file) => {
      if (file.size >= MAX_BYTES_PER_FILE || !acceptedFileTypesArray.includes(file.type)) {
        this.setState((prevState) => ({
          fileReceiverState: !prevState.fileReceiverState.isFileReceiverShowed,
          rejectedFiles: prevState.rejectedFiles.concat(file),
        }));

        if (file.size >= MAX_BYTES_PER_FILE) {
          this.setState({
            warningMessage: 'Файлы слишком большие. Размер одного файла не должен превышать 5 МБ.',
          });
        }

        if (!acceptedFileTypesArray.includes(file.type)) {
          this.setState({
            warningMessage: 'Недопустимый формат файла. Мы принимаем картинки (jpg, png, gif), офисные файлы (doc, xls, pdf) и zip-архивы.',
          });
        }

        if (file.size >= MAX_BYTES_PER_FILE && !acceptedFileTypesArray.includes(file.type)) {
          this.setState({
            warningMessage: 'Недопустимый формат и размер файла. Мы принимаем картинки (jpg, png, gif), офисные файлы (doc, xls, pdf) и zip-архивы. Размер одного файла не должен превышать 5 МБ.',
          });
        }
      }

      if (file.size <= MAX_BYTES_PER_FILE && acceptedFileTypesArray.includes(file.type)) {
        this.setState((prevState) => ({
          fileReceiverState: !prevState.fileReceiverState.isFileReceiverShowed,
          attachedFiles: prevState.attachedFiles.concat(file),
          attachedFileSizes: prevState.attachedFileSizes.concat(file.size),
        }));

        this.convertFileToBase64(file);
      }
    });
  }

  checkAttachedFilesTotalSize() {
    const { attachedFileSizes } = this.state;

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalFilesSize = attachedFileSizes.reduce(reducer, attachedFileSizes[0]);

    if (totalFilesSize >= MAX_BYTES_PER_SINGLE_EMAIL) {
      this.setState({
        isTtotalFilesSizeLimitAchieved: true,
        warningMessage: `Вы достигли максимально возможного размера прикрепляемых файлов на одно письмо. Максимальный размер не должен превышать 20 МБ.
        Пожалуйста, удалите один или несколько файлов.`,
      });
    }
  }

  handleFileInputChange(event) {
    const { files } = event.target;
    const filesArray = convertFileListToArray(files);

    this.checkAttachedFiles(filesArray);
    this.checkAttachedFilesTotalSize();
  }

  convertFileToBase64(file) {
    const { storeFileInRedux } = this.props;
    const fileName = file.name;
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      storeFileInRedux(fileName, reader.result);
    };
  }

  handleFileInputClick() {
    this.setState({
      fileReceiverState: {
        isFileReceiverShowed: true,
      },
      rejectedFiles: [],
    });
  }

  openFileDialog(event) {
    event.preventDefault();

    this.setState({
      rejectedFiles: [],
    });

    this.fileInputRef.current.click();
  }

  toggleModal() {
    this.setState((prevState) => ({
      isModalShowed: !prevState.isModalShowed,
    }));
  }

  closeInfoBlock() {
    this.setState({
      rejectedFiles: [],
      isTtotalFilesSizeLimitAchieved: false,
    });
  }

  handleFileDelete(index, name) {
    this.setState((prevState) => ({
      isModalShowed: !prevState.isModalShowed,
      indexForFileDeletion: index,
      nameFileForDeletion: name,
    }));
  }

  deleteFile() {
    const {
      attachedFiles,
      attachedFileSizes,
      indexForFileDeletion,
      nameFileForDeletion,
    } = this.state;
    const { removeFileFromReduxStore } = this.props;

    this.setState({
      attachedFiles: attachedFiles.filter((item, i) => i !== indexForFileDeletion),
      attachedFileSizes: attachedFileSizes.filter((item, i) => i !== indexForFileDeletion),
    });

    this.setState((prevState) => ({
      isModalShowed: !prevState.isModalShowed,
    }));

    removeFileFromReduxStore(nameFileForDeletion);
  }

  handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();

    this.setState((prevState) => {
      const nextState = prevState;
      nextState.fileReceiverState.isDragOver = true;
      return nextState;
    });
  }

  handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();

    this.setState((prevState) => {
      const nextState = prevState;
      nextState.fileReceiverState.isDragOver = false;
      return nextState;
    });
  }

  handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    const { files } = event.dataTransfer;
    const filesArray = convertFileListToArray(files);

    this.checkAttachedFiles(filesArray);
    this.checkAttachedFilesTotalSize();
  }

  render() {
    const {
      fileReceiverState: { isFileReceiverShowed, isDragOver },
      isModalShowed,
      attachedFiles,
      rejectedFiles,
      warningMessage,
      isTtotalFilesSizeLimitAchieved,
    } = this.state;

    return (
      <>
        {isFileReceiverShowed && (
          <FileReceiver
            id="file-receiver"
            ref={this.fileInputRef}
            onDragOver={this.handleDragOver}
            onDragLeave={this.handleDragLeave}
            onDrop={this.handleDrop}
            dragOver={isDragOver}
            onChange={this.handleFileInputChange}
            onClick={this.openFileDialog}
          />
        )}

        {attachedFiles.length > 0 ? attachedFiles.map((item, index) => (
          <AttachedFileField
            key={generateKey()}
            fileName={reduceLongFileName(item.name)}
            onClick={() => this.handleFileDelete(index, item.name)}
            firstInRow={index % 2 === 0}
          />
        )) : null}

        <Modal
          isOpen={isModalShowed}
          modalHeading="Подтвердите действие"
          modalContent="Файл будет удалён."
          onCancel={this.toggleModal}
          onSubmit={this.deleteFile}
        />

        {
          rejectedFiles.length > 0 && !isTtotalFilesSizeLimitAchieved ? (
            <InfoBlock
              infoBlockHeading="Следующие файлы не были прикреплены:"
              infoBlockMessage={warningMessage}
              transparent
              positionAbsolute
              showIcon
              src={warningIcon}
              alt="Warning icon"
              footerContent={(
                <>
                  <InputTypeFile
                    id="file-input-additional"
                    type="file"
                    label="Прикрепить другой файл"
                    onClick={this.openFileDialog}
                    onChange={this.handleFileInputChange}
                  />
                  <Button onClick={this.closeInfoBlock} buttonText="Закрыть" secondaryButton />
                </>
              )}
            >
              <ExtraContentBlock>
                {rejectedFiles.map((item) => (
                  <Fragment key={generateKey()}>
                    <TextBlock>
                      Файл
                      {' '}
                      {reduceLongFileName(item.name)}
                    </TextBlock>
                  </Fragment>

                ))}
              </ExtraContentBlock>
            </InfoBlock>
          ) : null
        }

        {isTtotalFilesSizeLimitAchieved ? (
          <InfoBlock
            infoBlockHeading="Астанавитесь!"
            infoBlockMessage={warningMessage}
            transparent
            positionAbsolute
            showIcon
            src={warningIcon}
            alt="Warning icon"
            footerContent={(
              <Button
                onClick={this.closeInfoBlock}
                buttonText="Понятно"
                secondaryButton
                centered
              />
            )}
          />
        ) : null}

        <InputTypeFile
          ref={this.fileInputRef}
          id="file-input"
          type="file"
          label="Прикрепить файл"
          onClick={this.handleFileInputClick}
          onChange={this.handleFileInputChange}
        />
      </>
    );
  }
}

FileAttachmentContainer.propTypes = {
  storeFileInRedux: PropTypes.func,
  removeFileFromReduxStore: PropTypes.func,
};

FileAttachmentContainer.defaultProps = {
  storeFileInRedux: () => { },
  removeFileFromReduxStore: () => { },
};

function mapDispatchToProps(dispatch) {
  return {
    storeFileInRedux: (name, content) => dispatch(storeAttachedFile(name, content)),
    removeFileFromReduxStore: (name) => dispatch(removeAttachedFile(name)),
  };
}

export default connect(null, mapDispatchToProps)(FileAttachmentContainer);
