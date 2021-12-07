import axios from 'axios';

const api = axios.create({
  baseURL: 'https://obp-apisandbox.bancohipotecario.com.sv',
  timeout: 10000,
});

//Disable lowercase in headers
XMLHttpRequest.prototype.setRequestHeader = function (
  header: string,
  value: any
): void {
  if (this.readyState !== this.OPENED) {
    throw new Error('Request has not been opened');
  }
  //@ts-ignore
  this._headers[header /* .toLowerCase() */] = String(value);
};

export default api;
