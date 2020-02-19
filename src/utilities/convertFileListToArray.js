function convertFileListToArray(fileList) {
  const array = [];
  for (let i = 0; i < fileList.length; i += 1) {
    array.push(fileList[i]);
  }
  return array;
}

export default convertFileListToArray;
