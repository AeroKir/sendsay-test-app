/**
 * Get date and month in shorthand format
 * Like a '19 февраля' for 'ru' locale, for example
 */

function getDateAndMonth(date) {
  const options = {
    month: 'long',
    day: 'numeric',
  };
  const dateAndMonth = date.toLocaleString('ru', options);
  return dateAndMonth;
}

export default getDateAndMonth;
