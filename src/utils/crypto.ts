import CryptoJS from "crypto-js";

// ⚠️ Simple key for frontend (learning purpose)
const SECRET_KEY = "frontend_secret_key_123";

// 🔐 Encrypt 
export const encryptFrontend = (data: string) => {
    if (!data) return "";   // 🔥 IMPORTANT FIX
  return CryptoJS.AES.encrypt(data.toString(), SECRET_KEY).toString();
};

// 🔓 Decrypt
export const decryptFrontend = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};