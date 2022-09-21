function createRandomId() {
  const numberLength = 999_999_999_999;
  return Math.floor(Math.random() * numberLength);
}

export default createRandomId;
