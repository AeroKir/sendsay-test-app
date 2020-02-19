function reduceLongFileName(fileName) {
  const MAX_FILE_NAME_LENGTH = 23;
  if (fileName.length > MAX_FILE_NAME_LENGTH) {
    const fileExtensionDotIndex = fileName.lastIndexOf('.');
    const fileExtensionName = fileName.slice(fileExtensionDotIndex - fileName.length);
    const shortcutFileName = fileName.slice(0, 20);
    const reducedFileName = `${shortcutFileName}..${fileExtensionName}`;

    return reducedFileName;
  }

  return fileName;
}

export default reduceLongFileName;
