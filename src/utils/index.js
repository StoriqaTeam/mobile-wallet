// @flow
import Aes from 'react-native-aes-crypto';

export function randomString(length) {
	const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	let randomstring = '';
	for (let i=0; i<length; i++) {
		const rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum, rnum+1);
  }
	return randomstring;
}

export function convertToHex(str) {
  let hex = '';
  for(let i=0;i<str.length;i++) {
      hex += ''+str.charCodeAt(i).toString(16);
  }
  return hex;
}

export function generateSalt() {
  return Math.random().toString(36).substring(2, 15);
}

export const generateKeyByPin = async (pin, salt) => {
  return await Aes.pbkdf2(pin, salt);
}

export const encrypt = async ({ str, pin }) => {
  const salt = generateSalt();
  const iv = convertToHex(randomString(16));
  const key = await generateKeyByPin(pin, salt);
  return Aes.encrypt(str, key, iv).then(cipher => ({ cipher, salt, iv }));
}

export const fetchQuery = async (url) => {
  const response = await fetch(url, { // eslint-disable-line
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      // Authorization: `Bearer ${token}`,
    },
    // credentials: 'include',
    // body: JSON.stringify({
    //   query: operation.text, // GraphQL text from input
    //   variables,
    // }),
  });
  return await response.json();
}
