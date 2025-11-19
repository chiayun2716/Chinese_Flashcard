import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// 你的 Firebase 設定（記得替換成你自己的）
const firebaseConfig = {
  apiKey: "AIzaSyAzFGk0_nvNTMR0HXZslHclOP9nKRRIcPU",
  authDomain: "chinese-flashcard-ade72.firebaseapp.com",
  projectId: "chinese-flashcard-ade72",
  storageBucket: "chinese-flashcard-ade72.firebasestorage.app",
  messagingSenderId: "169443250338",
  appId: "1:169443250338:web:101b2507c9a8a7c3c907fb",
  measurementId: "G-5QV4M1KGV0"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// 導出服務
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
