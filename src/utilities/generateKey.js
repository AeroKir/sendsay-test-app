function generateKey() {
  const key = `_${Math.random().toString(16).substr(2, 9)}`;
  return key;
}

export default generateKey;
