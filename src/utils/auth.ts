import CryptoJS from 'crypto-js';

interface JWTPayload {
  exp: number;
}

export const isAuthenticated = () => {
  const encryptedAuth = localStorage.getItem('2go-auth');
  if (!encryptedAuth) return false;

  try {
    const secretKey = '2go-secret-key';
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedAuth, secretKey);
    const authData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    
    if (!authData.access_token) return false;

    // Decode JWT payload (second part of token)
    const payload = JSON.parse(atob(authData.access_token.split('.')[1])) as JWTPayload;
    
    // Check if token is expired
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};