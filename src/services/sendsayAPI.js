import Sendsay from 'sendsay-api';
import API_KEY from '../constants/APIKey';

const sendsay = new Sendsay({ apiKey: API_KEY });

export function sendRequest(data) {
  return sendsay.request(data)
    .then((response) => response)
    .catch((error) => error);
}

export function trackMessageDelivery(id) {
  const trackData = {
    action: 'track.get',
    id,
  };
  return sendsay.request(trackData)
    .then((response) => response)
    .catch((error) => error);
}
