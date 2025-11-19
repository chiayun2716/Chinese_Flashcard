import React, { useState, useEffect } from 'react';
import { Volume2, Filter, RotateCw, CheckCircle, LogIn, LogOut, Upload, X, Settings, Plus, Trash2 } from 'lucide-react';
import { auth, db, storage } from './firebase';
import { 
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider, 
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';

const ChineseFlashcard = () => {
  const [mode, setMode] = useState('menu');
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [filterLevel, setFilterLevel] = useState('all');
  const [studiedToday, setStudiedToday] = useState(new Set());
  const [fontFamily, setFontFamily] = useState(() => {
    return localStorage.getItem('fontFamily') || 'default';
  });
  const [cardLevels, setCardLevels] = useState({});
  const [customImages, setCustomImages] = useState({});
  const [customCards, setCustomCards] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showCardManager, setShowCardManager] = useState(false);

  const defaultCards = [
    // 動物類 - 圖片
    { word: '貓', type: 'image', image: '🐱', color: 'from-amber-50 to-orange-50', accent: 'bg-amber-500', level: 5 },
    { word: '狗', type: 'image', image: '🐶', color: 'from-blue-50 to-cyan-50', accent: 'bg-blue-500', level: 5 },
    { word: '魚', type: 'image', image: '🐟', color: 'from-cyan-50 to-teal-50', accent: 'bg-cyan-500', level: 5 },
    { word: '鳥', type: 'image', image: '🐦', color: 'from-sky-50 to-indigo-50', accent: 'bg-sky-500', level: 4 },
    { word: '雞', type: 'image', image: '🐔', color: 'from-yellow-50 to-amber-50', accent: 'bg-yellow-500', level: 5 },
    { word: '鴨', type: 'image', image: '🦆', color: 'from-blue-50 to-sky-50', accent: 'bg-blue-400', level: 5 },
    { word: '豬', type: 'image', image: '🐷', color: 'from-pink-50 to-rose-50', accent: 'bg-pink-400', level: 3 },
    { word: '牛', type: 'image', image: '🐮', color: 'from-amber-50 to-yellow-50', accent: 'bg-amber-600', level: 4 },
    { word: '馬', type: 'image', image: '🐴', color: 'from-orange-50 to-amber-50', accent: 'bg-orange-500', level: 5 },
    { word: '羊', type: 'image', image: '🐑', color: 'from-slate-50 to-gray-50', accent: 'bg-slate-400', level: 3 },
    { word: '熊', type: 'image', image: '🐻', color: 'from-amber-50 to-orange-50', accent: 'bg-amber-700', level: 5 },
    { word: '虎', type: 'image', image: '🐯', color: 'from-orange-50 to-red-50', accent: 'bg-orange-600', level: 5 },
    { word: '獅', type: 'image', image: '🦁', color: 'from-yellow-50 to-orange-50', accent: 'bg-yellow-600', level: 2 },
    { word: '象', type: 'image', image: '🐘', color: 'from-gray-50 to-slate-50', accent: 'bg-gray-500', level: 3 },
    { word: '猴', type: 'image', image: '🐵', color: 'from-amber-50 to-yellow-50', accent: 'bg-amber-500', level: 5 },
    { word: '鹿', type: 'image', image: '🦌', color: 'from-orange-50 to-amber-50', accent: 'bg-orange-400', level: 5 },
    { word: '兔', type: 'image', image: '🐰', color: 'from-pink-50 to-rose-50', accent: 'bg-pink-400', level: 5 },
    { word: '蛇', type: 'image', image: '🐍', color: 'from-green-50 to-emerald-50', accent: 'bg-green-600', level: 4 },
    { word: '龜', type: 'image', image: '🐢', color: 'from-emerald-50 to-teal-50', accent: 'bg-emerald-600', level: 0 },
    { word: '蝴', type: 'image', image: '🦋', color: 'from-purple-50 to-pink-50', accent: 'bg-purple-400', level: 5 },
    { word: '蟲', type: 'image', image: '🐛', color: 'from-green-50 to-lime-50', accent: 'bg-green-500', level: 3 },
    { word: '鵝', type: 'image', image: '🦢', color: 'from-slate-50 to-blue-50', accent: 'bg-slate-300', level: 5 },
    { word: '蝦', type: 'image', image: '🦐', color: 'from-red-50 to-orange-50', accent: 'bg-red-400', level: 5 },
    { word: '鯊', type: 'image', image: '🦈', color: 'from-blue-50 to-cyan-50', accent: 'bg-blue-600', level: 0 },
    { word: '猩', type: 'image', image: '🦍', color: 'from-gray-50 to-slate-50', accent: 'bg-gray-600', level: 0 },
    { word: '螞', type: 'image', image: '🐜', color: 'from-red-50 to-orange-50', accent: 'bg-red-600', level: 0 },
    
    // 植物/自然 - 圖片
    { word: '花', type: 'image', image: '🌸', color: 'from-pink-50 to-rose-50', accent: 'bg-pink-500', level: 4 },
    { word: '樹', type: 'image', image: '🌳', color: 'from-emerald-50 to-green-50', accent: 'bg-emerald-500', level: 5 },
    { word: '草', type: 'image', image: '🌿', color: 'from-green-50 to-emerald-50', accent: 'bg-green-500', level: 4 },
    { word: '木', type: 'image', image: '🪵', color: 'from-amber-50 to-orange-50', accent: 'bg-amber-700', level: 4 },
    { word: '桃', type: 'image', image: '🍑', color: 'from-pink-50 to-orange-50', accent: 'bg-pink-400', level: 3 },
    { word: '莓', type: 'image', image: '🍓', color: 'from-red-50 to-pink-50', accent: 'bg-red-400', level: 0 },
    
    // 物品 - 圖片
    { word: '書', type: 'image', image: '📚', color: 'from-blue-50 to-indigo-50', accent: 'bg-blue-500', level: 3 },
    { word: '車', type: 'image', image: '🚗', color: 'from-blue-50 to-cyan-50', accent: 'bg-blue-500', level: 4 },
    { word: '門', type: 'image', image: '🚪', color: 'from-amber-50 to-orange-50', accent: 'bg-amber-600', level: 5 },
    { word: '船', type: 'image', image: '⛵', color: 'from-sky-50 to-blue-50', accent: 'bg-sky-500', level: 5 },
    { word: '手', type: 'image', image: '✋', color: 'from-orange-50 to-amber-50', accent: 'bg-orange-400', level: 5 },
    { word: '星', type: 'image', image: '⭐', color: 'from-yellow-50 to-amber-50', accent: 'bg-yellow-500', level: 5 },
    { word: '球', type: 'image', image: '⚽', color: 'from-green-50 to-emerald-50', accent: 'bg-green-500', level: 5 },
    { word: '鞋', type: 'image', image: '👟', color: 'from-blue-50 to-cyan-50', accent: 'bg-blue-400', level: 1 },
    { word: '筆', type: 'image', image: '✏️', color: 'from-yellow-50 to-orange-50', accent: 'bg-yellow-600', level: 3 },
    { word: '杯', type: 'image', image: '🥤', color: 'from-red-50 to-orange-50', accent: 'bg-red-400', level: 0 },
    { word: '床', type: 'image', image: '🛏️', color: 'from-blue-50 to-indigo-50', accent: 'bg-blue-400', level: 0 },
    { word: '橋', type: 'image', image: '🌉', color: 'from-orange-50 to-red-50', accent: 'bg-orange-500', level: 0 },
    { word: '椅', type: 'image', image: '🪑', color: 'from-amber-50 to-yellow-50', accent: 'bg-amber-500', level: 0 },
    { word: '桌', type: 'image', image: '🪑', color: 'from-brown-50 to-amber-50', accent: 'bg-amber-600', level: 0 },
    { word: '袋', type: 'image', image: '👜', color: 'from-purple-50 to-pink-50', accent: 'bg-purple-400', level: 0 },
    { word: '刀', type: 'image', image: '🔪', color: 'from-gray-50 to-slate-50', accent: 'bg-slate-500', level: 0 },
    
    // 熟悉度 5 - 抽象字
    { word: '一', type: 'abstract', color: 'from-violet-50 to-purple-50', accent: 'bg-violet-500', level: 5 },
    { word: '二', type: 'abstract', color: 'from-indigo-50 to-blue-50', accent: 'bg-indigo-500', level: 5 },
    { word: '三', type: 'abstract', color: 'from-sky-50 to-cyan-50', accent: 'bg-sky-500', level: 5 },
    { word: '四', type: 'abstract', color: 'from-blue-50 to-indigo-50', accent: 'bg-blue-500', level: 5 },
    { word: '五', type: 'abstract', color: 'from-pink-50 to-rose-50', accent: 'bg-pink-500', level: 5 },
    { word: '我', type: 'abstract', color: 'from-purple-50 to-fuchsia-50', accent: 'bg-purple-500', level: 5 },
    { word: '人', type: 'abstract', color: 'from-cyan-50 to-teal-50', accent: 'bg-cyan-500', level: 5 },
    { word: '大', type: 'abstract', color: 'from-orange-50 to-amber-50', accent: 'bg-orange-500', level: 5 },
    { word: '上', type: 'abstract', color: 'from-emerald-50 to-green-50', accent: 'bg-emerald-500', level: 5 },
    { word: '小', type: 'abstract', color: 'from-rose-50 to-pink-50', accent: 'bg-rose-500', level: 5 },
    { word: '地', type: 'abstract', color: 'from-teal-50 to-cyan-50', accent: 'bg-teal-500', level: 5 },
    { word: '下', type: 'abstract', color: 'from-amber-50 to-yellow-50', accent: 'bg-amber-500', level: 5 },
    { word: '公', type: 'abstract', color: 'from-lime-50 to-green-50', accent: 'bg-lime-500', level: 5 },
    { word: '心', type: 'abstract', color: 'from-fuchsia-50 to-pink-50', accent: 'bg-fuchsia-500', level: 5 },
    { word: '媽', type: 'abstract', color: 'from-pink-50 to-rose-50', accent: 'bg-pink-500', level: 5 },
    { word: '太', type: 'abstract', color: 'from-cyan-50 to-sky-50', accent: 'bg-cyan-500', level: 5 },
    { word: '樂', type: 'abstract', color: 'from-yellow-50 to-amber-50', accent: 'bg-yellow-500', level: 5 },
    { word: '月', type: 'abstract', color: 'from-indigo-50 to-violet-50', accent: 'bg-indigo-500', level: 5 },
    { word: '爸', type: 'abstract', color: 'from-blue-50 to-cyan-50', accent: 'bg-blue-500', level: 5 },
    { word: '弟', type: 'abstract', color: 'from-green-50 to-emerald-50', accent: 'bg-green-500', level: 5 },
    { word: '飛', type: 'abstract', color: 'from-rose-50 to-pink-50', accent: 'bg-rose-500', level: 5 },
    { word: '火', type: 'abstract', color: 'from-red-50 to-orange-50', accent: 'bg-red-500', level: 5 },
    { word: '亮', type: 'abstract', color: 'from-yellow-50 to-orange-50', accent: 'bg-yellow-600', level: 5 },
    { word: '肉', type: 'abstract', color: 'from-red-50 to-pink-50', accent: 'bg-red-400', level: 5 },
    { word: '紅', type: 'abstract', color: 'from-red-50 to-rose-50', accent: 'bg-red-500', level: 5 },
    { word: '土', type: 'abstract', color: 'from-amber-50 to-orange-50', accent: 'bg-amber-600', level: 5 },
    { word: '哥', type: 'abstract', color: 'from-blue-50 to-indigo-50', accent: 'bg-blue-700', level: 5 },
    { word: '阿', type: 'abstract', color: 'from-purple-50 to-fuchsia-50', accent: 'bg-purple-500', level: 5 },
    { word: '冷', type: 'abstract', color: 'from-cyan-50 to-blue-50', accent: 'bg-cyan-600', level: 5 },
    { word: '香', type: 'abstract', color: 'from-pink-50 to-rose-50', accent: 'bg-pink-400', level: 5 },
    { word: '醫', type: 'abstract', color: 'from-green-50 to-teal-50', accent: 'bg-green-600', level: 5 },
    { word: '藍', type: 'abstract', color: 'from-blue-50 to-indigo-50', accent: 'bg-blue-500', level: 5 },
    { word: '雪', type: 'abstract', color: 'from-slate-50 to-blue-50', accent: 'bg-slate-300', level: 5 },
    { word: '圈', type: 'abstract', color: 'from-violet-50 to-purple-50', accent: 'bg-violet-500', level: 5 },
    { word: '鼻', type: 'abstract', color: 'from-orange-50 to-amber-50', accent: 'bg-orange-500', level: 5 },
    { word: '潤', type: 'abstract', color: 'from-cyan-50 to-teal-50', accent: 'bg-cyan-500', level: 5 },
    
    // 熟悉度 4
    { word: '的', type: 'abstract', color: 'from-violet-50 to-purple-50', accent: 'bg-violet-500', level: 4 },
    { word: '生', type: 'abstract', color: 'from-green-50 to-emerald-50', accent: 'bg-green-600', level: 4 },
    { word: '水', type: 'abstract', color: 'from-blue-50 to-cyan-50', accent: 'bg-blue-400', level: 4 },
    { word: '電', type: 'abstract', color: 'from-yellow-50 to-amber-50', accent: 'bg-yellow-600', level: 4 },
    { word: '愛', type: 'abstract', color: 'from-pink-50 to-red-50', accent: 'bg-pink-600', level: 4 },
    { word: '吃', type: 'abstract', color: 'from-orange-50 to-red-50', accent: 'bg-orange-500', level: 4 },
    { word: '謝', type: 'abstract', color: 'from-rose-50 to-pink-50', accent: 'bg-rose-500', level: 4 },
    { word: '女', type: 'abstract', color: 'from-pink-50 to-fuchsia-50', accent: 'bg-pink-500', level: 4 },
    { word: '讀', type: 'abstract', color: 'from-indigo-50 to-blue-50', accent: 'bg-indigo-500', level: 4 },
    { word: '黃', type: 'abstract', color: 'from-yellow-50 to-orange-50', accent: 'bg-yellow-500', level: 4 },
    { word: '黑', type: 'abstract', color: 'from-gray-50 to-slate-50', accent: 'bg-slate-600', level: 4 },
    { word: '坐', type: 'abstract', color: 'from-blue-50 to-sky-50', accent: 'bg-blue-500', level: 4 },
    { word: '買', type: 'abstract', color: 'from-green-50 to-emerald-50', accent: 'bg-green-500', level: 4 },
    { word: '牙', type: 'abstract', color: 'from-slate-50 to-gray-50', accent: 'bg-slate-400', level: 4 },
    { word: '蛋', type: 'abstract', color: 'from-yellow-50 to-amber-50', accent: 'bg-yellow-400', level: 4 },
    { word: '窗', type: 'abstract', color: 'from-cyan-50 to-blue-50', accent: 'bg-cyan-500', level: 4 },
    { word: '冰', type: 'abstract', color: 'from-blue-50 to-cyan-50', accent: 'bg-blue-300', level: 4 },
    
    // 熟悉度 3
    { word: '不', type: 'abstract', color: 'from-red-50 to-rose-50', accent: 'bg-red-500', level: 3 },
    { word: '家', type: 'abstract', color: 'from-orange-50 to-amber-50', accent: 'bg-orange-500', level: 3 },
    { word: '寫', type: 'abstract', color: 'from-indigo-50 to-blue-50', accent: 'bg-indigo-600', level: 3 },
    { word: '山', type: 'abstract', color: 'from-green-50 to-emerald-50', accent: 'bg-green-600', level: 3 },
    { word: '西', type: 'abstract', color: 'from-yellow-50 to-orange-50', accent: 'bg-yellow-500', level: 3 },
    { word: '畫', type: 'abstract', color: 'from-purple-50 to-fuchsia-50', accent: 'bg-purple-500', level: 3 },
    { word: '口', type: 'abstract', color: 'from-red-50 to-pink-50', accent: 'bg-red-400', level: 3 },
    { word: '東', type: 'abstract', color: 'from-orange-50 to-amber-50', accent: 'bg-orange-500', level: 3 },
    { word: '跳', type: 'abstract', color: 'from-fuchsia-50 to-pink-50', accent: 'bg-fuchsia-500', level: 3 },
    { word: '衣', type: 'abstract', color: 'from-blue-50 to-cyan-50', accent: 'bg-blue-400', level: 3 },
    { word: '奶', type: 'abstract', color: 'from-slate-50 to-gray-50', accent: 'bg-slate-300', level: 3 },
    { word: '菜', type: 'abstract', color: 'from-green-50 to-emerald-50', accent: 'bg-green-600', level: 3 },
    { word: '泡', type: 'abstract', color: 'from-cyan-50 to-blue-50', accent: 'bg-cyan-400', level: 3 },
    { word: '呆', type: 'abstract', color: 'from-gray-50 to-slate-50', accent: 'bg-gray-500', level: 3 },
    
    // 熟悉度 2
    { word: '男', type: 'abstract', color: 'from-blue-50 to-indigo-50', accent: 'bg-blue-600', level: 2 },
    
    // 熟悉度 1
    { word: '有', type: 'abstract', color: 'from-fuchsia-50 to-pink-50', accent: 'bg-fuchsia-500', level: 1 },
    { word: '在', type: 'abstract', color: 'from-indigo-50 to-blue-50', accent: 'bg-indigo-500', level: 1 },
    { word: '們', type: 'abstract', color: 'from-purple-50 to-fuchsia-50', accent: 'bg-purple-500', level: 1 },
    { word: '很', type: 'abstract', color: 'from-green-50 to-teal-50', accent: 'bg-green-500', level: 1 },
    { word: '嗎', type: 'abstract', color: 'from-pink-50 to-rose-50', accent: 'bg-pink-500', level: 1 },
    { word: '歌', type: 'abstract', color: 'from-rose-50 to-pink-50', accent: 'bg-rose-500', level: 1 },
    { word: '游', type: 'abstract', color: 'from-cyan-50 to-blue-50', accent: 'bg-cyan-500', level: 1 },
    { word: '佩', type: 'abstract', color: 'from-violet-50 to-purple-50', accent: 'bg-violet-500', level: 1 },
    
    // 熟悉度 0
    { word: '來', type: 'abstract', color: 'from-cyan-50 to-teal-50', accent: 'bg-cyan-600', level: 0 },
    { word: '多', type: 'abstract', color: 'from-slate-50 to-gray-50', accent: 'bg-slate-500', level: 0 },
    { word: '點', type: 'abstract', color: 'from-amber-50 to-yellow-50', accent: 'bg-amber-500', level: 0 },
    { word: '等', type: 'abstract', color: 'from-cyan-50 to-teal-50', accent: 'bg-cyan-500', level: 0 },
    { word: '再', type: 'abstract', color: 'from-indigo-50 to-blue-50', accent: 'bg-indigo-500', level: 0 },
    { word: '少', type: 'abstract', color: 'from-rose-50 to-pink-50', accent: 'bg-rose-500', level: 0 },
    { word: '玩', type: 'abstract', color: 'from-purple-50 to-fuchsia-50', accent: 'bg-purple-500', level: 0 },
    { word: '隻', type: 'abstract', color: 'from-violet-50 to-purple-50', accent: 'bg-violet-500', level: 0 },
    { word: '笑', type: 'abstract', color: 'from-yellow-50 to-orange-50', accent: 'bg-yellow-500', level: 0 },
    { word: '建', type: 'abstract', color: 'from-blue-50 to-sky-50', accent: 'bg-blue-500', level: 0 },
    { word: '跑', type: 'abstract', color: 'from-green-50 to-emerald-50', accent: 'bg-green-500', level: 0 },
    { word: '呀', type: 'abstract', color: 'from-pink-50 to-rose-50', accent: 'bg-pink-500', level: 0 },
    { word: '遊', type: 'abstract', color: 'from-cyan-50 to-blue-50', accent: 'bg-cyan-500', level: 0 },
    { word: '腳', type: 'abstract', color: 'from-orange-50 to-red-50', accent: 'bg-orange-500', level: 0 },
    { word: '怕', type: 'abstract', color: 'from-purple-50 to-fuchsia-50', accent: 'bg-purple-500', level: 0 },
    { word: '啦', type: 'abstract', color: 'from-lime-50 to-green-50', accent: 'bg-lime-500', level: 0 },
    { word: '房', type: 'abstract', color: 'from-amber-50 to-orange-50', accent: 'bg-amber-600', level: 0 },
    { word: '吸', type: 'abstract', color: 'from-blue-50 to-cyan-50', accent: 'bg-blue-400', level: 0 },
    { word: '爺', type: 'abstract', color: 'from-slate-50 to-gray-50', accent: 'bg-slate-600', level: 0 },
    { word: '米', type: 'abstract', color: 'from-yellow-50 to-amber-50', accent: 'bg-yellow-400', level: 0 },
    { word: '姊', type: 'abstract', color: 'from-pink-50 to-rose-50', accent: 'bg-pink-600', level: 0 },
    { word: '貝', type: 'abstract', color: 'from-cyan-50 to-teal-50', accent: 'bg-cyan-400', level: 0 },
    { word: '冬', type: 'abstract', color: 'from-blue-50 to-indigo-50', accent: 'bg-blue-300', level: 0 },
    { word: '鬼', type: 'abstract', color: 'from-purple-50 to-fuchsia-50', accent: 'bg-purple-600', level: 0 },
    { word: '哭', type: 'abstract', color: 'from-slate-50 to-gray-50', accent: 'bg-slate-600', level: 0 },
    { word: '吹', type: 'abstract', color: 'from-cyan-50 to-sky-50', accent: 'bg-cyan-500', level: 0 },
    { word: '輪', type: 'abstract', color: 'from-gray-50 to-slate-50', accent: 'bg-gray-500', level: 0 },
    { word: '秋', type: 'abstract', color: 'from-orange-50 to-amber-50', accent: 'bg-orange-400', level: 0 },
    { word: '賣', type: 'abstract', color: 'from-green-50 to-emerald-50', accent: 'bg-green-600', level: 0 },
    { word: '姐', type: 'abstract', color: 'from-pink-50 to-rose-50', accent: 'bg-pink-600', level: 0 },
    { word: '巧', type: 'abstract', color: 'from-rose-50 to-pink-50', accent: 'bg-rose-400', level: 0 },
    { word: '漁', type: 'abstract', color: 'from-blue-50 to-cyan-50', accent: 'bg-blue-500', level: 0 },
    { word: '騎', type: 'abstract', color: 'from-amber-50 to-orange-50', accent: 'bg-amber-500', level: 0 },
    { word: '舅', type: 'abstract', color: 'from-indigo-50 to-blue-50', accent: 'bg-indigo-600', level: 0 },
    { word: '麵', type: 'abstract', color: 'from-yellow-50 to-amber-50', accent: 'bg-yellow-500', level: 0 },
    { word: '吵', type: 'abstract', color: 'from-red-50 to-orange-50', accent: 'bg-red-500', level: 0 },
    { word: '敲', type: 'abstract', color: 'from-slate-50 to-gray-50', accent: 'bg-slate-500', level: 0 },
    { word: '劃', type: 'abstract', color: 'from-cyan-50 to-blue-50', accent: 'bg-cyan-600', level: 0 },
    { word: '餅', type: 'abstract', color: 'from-amber-50 to-yellow-50', accent: 'bg-amber-400', level: 0 },
    { word: '尿', type: 'abstract', color: 'from-yellow-50 to-orange-50', accent: 'bg-yellow-300', level: 0 },
    { word: '趴', type: 'abstract', color: 'from-green-50 to-emerald-50', accent: 'bg-green-400', level: 0 },
    { word: '宛', type: 'abstract', color: 'from-purple-50 to-pink-50', accent: 'bg-purple-400', level: 0 },
    { word: '蓁', type: 'abstract', color: 'from-emerald-50 to-green-50', accent: 'bg-emerald-500', level: 0 },
  ];

  // 合併預設字卡和自訂字卡
  const allCards = [...defaultCards, ...customCards];

  // Firebase Auth 監聽
  useEffect(() => {
    // 檢查是否有 redirect 登入結果
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          // Redirect 登入成功，同步 localStorage 資料
          const localLevels = localStorage.getItem('cardLevels');
          const localImages = localStorage.getItem('customImages');
          const localCards = localStorage.getItem('customCards');
          
          if (localLevels) {
            await setDoc(doc(db, 'users', result.user.uid, 'data', 'cardLevels'), JSON.parse(localLevels));
          }
          if (localImages) {
            await setDoc(doc(db, 'users', result.user.uid, 'data', 'customImages'), JSON.parse(localImages));
          }
          if (localCards) {
            await setDoc(doc(db, 'users', result.user.uid, 'data', 'customCards'), { cards: JSON.parse(localCards) });
          }
        }
      } catch (error) {
        console.error('處理 redirect 結果失敗:', error);
      }
    };

    checkRedirectResult();

    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await loadUserData(currentUser.uid);
      } else {
        loadLocalData();
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 從 Firestore 載入資料
  const loadUserData = async (userId) => {
    try {
      const levelsDoc = await getDoc(doc(db, 'users', userId, 'data', 'cardLevels'));
      if (levelsDoc.exists()) {
        setCardLevels(levelsDoc.data());
      }

      const imagesDoc = await getDoc(doc(db, 'users', userId, 'data', 'customImages'));
      if (imagesDoc.exists()) {
        setCustomImages(imagesDoc.data());
      }

      const cardsDoc = await getDoc(doc(db, 'users', userId, 'data', 'customCards'));
      if (cardsDoc.exists()) {
        setCustomCards(cardsDoc.data().cards || []);
      }
    } catch (error) {
      console.error('載入使用者資料失敗:', error);
    }
  };

  // 從 localStorage 載入資料
  const loadLocalData = () => {
    const savedLevels = localStorage.getItem('cardLevels');
    if (savedLevels) {
      setCardLevels(JSON.parse(savedLevels));
    }
    const savedImages = localStorage.getItem('customImages');
    if (savedImages) {
      setCustomImages(JSON.parse(savedImages));
    }
    const savedCards = localStorage.getItem('customCards');
    if (savedCards) {
      setCustomCards(JSON.parse(savedCards));
    }
  };

  // 保存熟悉度
  const saveCardLevel = async (word, level) => {
    const newLevels = { ...cardLevels, [word]: level };
    setCardLevels(newLevels);

    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid, 'data', 'cardLevels'), newLevels);
      } catch (error) {
        console.error('儲存到 Firestore 失敗:', error);
      }
    } else {
      localStorage.setItem('cardLevels', JSON.stringify(newLevels));
    }
  };

  // Google 登入
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // 偵測是否為手機裝置
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isMobile) {
        // 手機使用 redirect 模式（更穩定）
        await signInWithRedirect(auth, provider);
        // Redirect 會自動跳轉，結果在頁面重新載入後處理
      } else {
        // 電腦使用 popup 模式
        const result = await signInWithPopup(auth, provider);
        
        const localLevels = localStorage.getItem('cardLevels');
        const localImages = localStorage.getItem('customImages');
        const localCards = localStorage.getItem('customCards');
        
        if (localLevels) {
          await setDoc(doc(db, 'users', result.user.uid, 'data', 'cardLevels'), JSON.parse(localLevels));
        }
        if (localImages) {
          await setDoc(doc(db, 'users', result.user.uid, 'data', 'customImages'), JSON.parse(localImages));
        }
        if (localCards) {
          await setDoc(doc(db, 'users', result.user.uid, 'data', 'customCards'), { cards: JSON.parse(localCards) });
        }
      }
    } catch (error) {
      console.error('登入失敗:', error);
      alert('登入失敗，請稍後再試');
    }
  };

  // 登出
  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
      setCardLevels({});
      setCustomImages({});
      loadLocalData();
    } catch (error) {
      console.error('登出失敗:', error);
    }
  };

  // 壓縮圖片
  const compressImage = (file, maxWidth = 800, maxHeight = 800, quality = 0.8) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // 計算新尺寸（保持比例）
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // 轉換為 Blob
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('圖片壓縮失敗'));
              }
            },
            'image/jpeg',
            quality
          );
        };
        img.onerror = () => reject(new Error('圖片載入失敗'));
      };
      reader.onerror = () => reject(new Error('檔案讀取失敗'));
    });
  };

  // 上傳圖片
  const handleImageUpload = async (word, file) => {
    if (!user) {
      alert('請先登入才能上傳圖片');
      return;
    }

    if (!file || !file.type.startsWith('image/')) {
      alert('請選擇有效的圖片檔案');
      return;
    }

    setUploading(true);
    try {
      // 壓縮圖片
      const compressedBlob = await compressImage(file);
      
      // 顯示壓縮資訊
      const originalSize = (file.size / 1024).toFixed(2);
      const compressedSize = (compressedBlob.size / 1024).toFixed(2);
      console.log(`原始大小: ${originalSize} KB → 壓縮後: ${compressedSize} KB`);

      const storageRef = ref(storage, `users/${user.uid}/images/${word}.jpg`);
      await uploadBytes(storageRef, compressedBlob);
      const downloadURL = await getDownloadURL(storageRef);

      const newImages = { ...customImages, [word]: downloadURL };
      setCustomImages(newImages);

      await setDoc(doc(db, 'users', user.uid, 'data', 'customImages'), newImages);

      setShowImageUpload(false);
      alert(`圖片上傳成功！\n原始: ${originalSize} KB\n壓縮後: ${compressedSize} KB`);
    } catch (error) {
      console.error('圖片上傳失敗:', error);
      alert('圖片上傳失敗，請稍後再試');
    } finally {
      setUploading(false);
    }
  };

  // 新增自訂字卡（支援批次）
  const addCustomCard = async (words, type = 'abstract') => {
    // 支援單字或多字（用空格、逗號、頓號分隔）
    const wordList = words.split(/[\s,，、]+/).filter(w => w.trim());
    
    if (wordList.length === 0) {
      alert('請輸入文字');
      return { success: false, message: '請輸入文字' };
    }

    const colors = [
      { color: 'from-violet-50 to-purple-50', accent: 'bg-violet-500' },
      { color: 'from-indigo-50 to-blue-50', accent: 'bg-indigo-500' },
      { color: 'from-sky-50 to-cyan-50', accent: 'bg-sky-500' },
      { color: 'from-blue-50 to-indigo-50', accent: 'bg-blue-500' },
      { color: 'from-pink-50 to-rose-50', accent: 'bg-pink-500' },
      { color: 'from-green-50 to-emerald-50', accent: 'bg-green-500' },
      { color: 'from-orange-50 to-amber-50', accent: 'bg-orange-500' },
    ];

    const newCards = [];
    const existingWords = [];
    const addedWords = [];

    for (const word of wordList) {
      if (allCards.some(card => card.word === word) || newCards.some(card => card.word === word)) {
        existingWords.push(word);
        continue;
      }

      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      newCards.push({
        word,
        type,
        image: type === 'image' ? '📝' : null,
        ...randomColor,
        level: 0,
        custom: true,
      });
      addedWords.push(word);
    }

    if (newCards.length === 0) {
      const message = `全部字卡已存在：${existingWords.join('、')}`;
      alert(message);
      return { success: false, message, existingWords };
    }

    const updatedCards = [...customCards, ...newCards];
    setCustomCards(updatedCards);

    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid, 'data', 'customCards'), { cards: updatedCards });
      } catch (error) {
        console.error('儲存失敗:', error);
        alert('儲存失敗，請稍後再試');
        return { success: false, message: '儲存失敗' };
      }
    } else {
      localStorage.setItem('customCards', JSON.stringify(updatedCards));
    }

    let message = `成功新增 ${addedWords.length} 張字卡：${addedWords.join('、')}`;
    if (existingWords.length > 0) {
      message += `\n\n以下字卡已存在（略過）：${existingWords.join('、')}`;
    }
    alert(message);
    return { success: true, message, addedWords, existingWords };
  };

  // 刪除自訂字卡
  const deleteCustomCard = async (word) => {
    if (!window.confirm(`確定要刪除「${word}」嗎？`)) {
      return;
    }

    const updatedCards = customCards.filter(card => card.word !== word);
    setCustomCards(updatedCards);

    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid, 'data', 'customCards'), { cards: updatedCards });
        alert('字卡已刪除！');
      } catch (error) {
        console.error('刪除失敗:', error);
        alert('刪除失敗，請稍後再試');
      }
    } else {
      localStorage.setItem('customCards', JSON.stringify(updatedCards));
      alert('字卡已刪除！');
    }
  };

  useEffect(() => {
    localStorage.setItem('fontFamily', fontFamily);
  }, [fontFamily]);

  const getFontStyle = () => {
    if (fontFamily === 'kai') {
      return { 
        fontFamily: "'Noto Serif TC', 'DFKai-SB', 'BiauKai', '標楷體', 'KaiTi', 'STKaiti', 'Kaiti SC', 'AR PL UKai CN', 'AR PL UKai HK', 'AR PL UKai TW', 'AR PL UKai TW MBE', serif",
        fontWeight: 400
      };
    }
    return {};
  };

  const playSound = (text) => {
    try {
      // 停止之前的語音
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-TW';
      utterance.rate = 0.4;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // iOS Safari 特殊處理
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // iOS 需要稍微延遲以確保語音引擎準備好
        setTimeout(() => {
          speechSynthesis.speak(utterance);
        }, 100);
      } else {
        speechSynthesis.speak(utterance);
      }
      
      // 錯誤處理
      utterance.onerror = (event) => {
        console.error('語音播放錯誤:', event);
      };
    } catch (error) {
      console.error('語音播放失敗:', error);
      // 不顯示錯誤訊息給使用者，靜默失敗
    }
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const getCardLevel = (word) => {
    if (cardLevels[word] !== undefined) {
      return cardLevels[word];
    }
    const card = allCards.find(c => c.word === word);
    return card ? card.level : 0;
  };

  const getCardImage = (card) => {
    if (customImages[card.word]) {
      return customImages[card.word];
    }
    return card.image;
  };

  const getFilteredCards = () => {
    if (filterLevel === 'all') return allCards;
    return allCards.filter(card => getCardLevel(card.word) === parseInt(filterLevel));
  };

  const startStudy = (shuffle) => {
    let filtered = getFilteredCards();
    
    if (shuffle) {
      filtered = filtered.filter(card => {
        const level = getCardLevel(card.word);
        return level !== 0 && level !== 5;
      });
    }
    
    const cards = shuffle ? shuffleArray(filtered) : filtered;
    setShuffledCards(cards);
    setCurrentCard(0);
    setIsFlipped(false);
    setMode('flashcard');
  };

  const markAsStudied = (word) => {
    setStudiedToday(prev => new Set([...prev, word]));
  };

  const handleFlip = () => {
    const card = shuffledCards[currentCard];
    if (!isFlipped) {
      markAsStudied(card.word);
      playSound(card.word);
    }
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentCard((currentCard + 1) % shuffledCards.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentCard((currentCard - 1 + shuffledCards.length) % shuffledCards.length);
  };

  const renderCardBack = (card) => {
    const stopProp = (e) => e.stopPropagation();
    const handleSound = (e) => {
      stopProp(e);
      playSound(card.word);
    };

    const handleUploadClick = (e) => {
      stopProp(e);
      setShowImageUpload(true);
    };

    const cardImage = getCardImage(card);
    const isCustomImage = customImages[card.word];

    if (card.type === 'image') {
      return (
        <>
          <div className="relative flex-1 flex items-center justify-center">
            <div className={`absolute inset-0 ${card.accent} opacity-20 blur-3xl`}></div>
            {isCustomImage ? (
              <img src={cardImage} alt={card.word} className="relative max-w-full max-h-full object-contain rounded-2xl shadow-2xl" style={{maxHeight: '350px'}} />
            ) : (
              <div className="relative drop-shadow-2xl" style={{fontSize: '280px'}}>
                {cardImage}
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button onClick={handleSound} className="flex-1 bg-white/90 backdrop-blur text-slate-700 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-3 text-xl border border-slate-200">
              <Volume2 size={28} className="text-rose-500" />
              <span>再聽一次</span>
            </button>
            {user && (
              <button onClick={handleUploadClick} className="bg-blue-500/90 backdrop-blur text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-3 text-xl">
                <Upload size={24} />
                <span>上傳圖片</span>
              </button>
            )}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="relative flex-1 flex items-center justify-center">
            <div className={`absolute inset-0 ${card.accent} opacity-20 blur-3xl`}></div>
            <div className="relative font-black text-slate-800 tracking-tight leading-none" style={{fontSize: '240px', ...getFontStyle()}}>
              {card.word}
            </div>
          </div>
          <button onClick={handleSound} className="bg-white/90 backdrop-blur text-slate-700 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-3 text-xl border border-slate-200">
            <Volume2 size={28} className="text-rose-500" />
            <span>再聽一次</span>
          </button>
        </>
      );
    }
  };

  const ImageUploadModal = () => {
    const card = shuffledCards[currentCard];
    const [selectedFile, setSelectedFile] = useState(null);

    const formatFileSize = (bytes) => {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6" onClick={() => setShowImageUpload(false)}>
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-slate-800">上傳「{card.word}」的圖片</h3>
            <button onClick={() => setShowImageUpload(false)} className="text-slate-400 hover:text-slate-600">
              <X size={24} />
            </button>
          </div>

          <div className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="text-sm text-blue-800 font-medium mb-2">📸 圖片會自動優化</div>
            <div className="text-xs text-blue-600">
              • 自動壓縮至 800x800 像素<br/>
              • 轉換為 JPEG 格式<br/>
              • 大幅減少檔案大小
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="w-full mb-4 p-3 border-2 border-slate-200 rounded-xl"
          />

          {selectedFile && (
            <div className="mb-4">
              <div className="bg-slate-50 rounded-xl p-3 mb-3">
                <div className="text-sm text-slate-600">
                  <span className="font-medium">檔案名稱：</span>{selectedFile.name}
                </div>
                <div className="text-sm text-slate-600">
                  <span className="font-medium">原始大小：</span>{formatFileSize(selectedFile.size)}
                </div>
                <div className="text-xs text-green-600 mt-1">
                  ✓ 上傳時會自動壓縮
                </div>
              </div>
              <img src={URL.createObjectURL(selectedFile)} alt="預覽" className="w-full rounded-xl border-2 border-slate-200" />
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setShowImageUpload(false)}
              className="flex-1 bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-xl hover:bg-slate-300 transition-all"
            >
              取消
            </button>
            <button
              onClick={() => selectedFile && handleImageUpload(card.word, selectedFile)}
              disabled={!selectedFile || uploading}
              className="flex-1 bg-blue-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? '壓縮並上傳中...' : '確認上傳'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CardManagerModal = () => {
    const [newWord, setNewWord] = useState('');
    const [newType, setNewType] = useState('abstract');

    const handleAddCard = () => {
      if (!newWord.trim()) {
        alert('請輸入文字');
        return;
      }
      addCustomCard(newWord.trim(), newType);
      setNewWord('');
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6 overflow-y-auto" onClick={() => setShowCardManager(false)}>
        <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl my-8" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-slate-800">字卡管理</h3>
            <button onClick={() => setShowCardManager(false)} className="text-slate-400 hover:text-slate-600">
              <X size={24} />
            </button>
          </div>

          <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="text-lg font-bold text-blue-800 mb-4">➕ 新增字卡</div>
            <div className="flex gap-3 mb-3">
              <input
                type="text"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                placeholder="輸入文字（例如：你 好 嗎）"
                className="flex-1 p-3 border-2 border-slate-200 rounded-xl"
              />
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="p-3 border-2 border-slate-200 rounded-xl"
              >
                <option value="abstract">抽象字</option>
                <option value="image">圖片字</option>
              </select>
              <button
                onClick={handleAddCard}
                className="bg-blue-500 text-white font-bold px-6 rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2"
              >
                <Plus size={20} />
                新增
              </button>
            </div>
            <div className="text-xs text-blue-600">
              💡 <strong>批次新增：</strong>可用空格、逗號分隔多個字，例如：「你 好 嗎」或「你,好,嗎」<br/>
              💡 系統會自動檢查重複，已存在的字卡會被略過<br/>
              💡 圖片字可以在複習時上傳圖片
            </div>
          </div>

          <div className="mb-4 p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="text-sm text-green-800">
              <span className="font-bold">預設字卡：</span>{defaultCards.length} 張
            </div>
            <div className="text-sm text-green-800">
              <span className="font-bold">自訂字卡：</span>{customCards.length} 張
            </div>
            <div className="text-sm text-green-700 font-bold">
              <span>總計：</span>{allCards.length} 張
            </div>
          </div>

          {customCards.length > 0 && (
            <div className="mb-4">
              <div className="text-lg font-bold text-slate-800 mb-3">📝 你的自訂字卡</div>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {customCards.map((card) => (
                  <div key={card.word} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className={`text-3xl font-bold bg-gradient-to-br ${card.color} px-4 py-2 rounded-xl`}>
                        {card.word}
                      </div>
                      <div className="text-sm text-slate-600">
                        {card.type === 'image' ? '🖼️ 圖片字' : '📄 抽象字'}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteCustomCard(card.word)}
                      className="bg-red-100 hover:bg-red-200 text-red-600 font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-2"
                    >
                      <Trash2 size={16} />
                      刪除
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {customCards.length === 0 && (
            <div className="text-center text-slate-400 py-8">
              還沒有自訂字卡，快新增第一張吧！
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setShowCardManager(false)}
              className="flex-1 bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-xl hover:bg-slate-300 transition-all"
            >
              關閉
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-2xl font-bold text-slate-600">載入中...</div>
      </div>
    );
  }

  if (mode === 'menu') {
    const todayCount = studiedToday.size;
    const levelCounts = [0, 1, 2, 3, 4, 5].map(level => 
      allCards.filter(card => getCardLevel(card.word) === level).length
    );
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center p-6">
        {showCardManager && <CardManagerModal />}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 max-w-lg w-full">
          <div className="mb-6 flex justify-between items-center">
            {user ? (
              <div className="flex items-center gap-3">
                <img src={user.photoURL} alt="Avatar" className="w-12 h-12 rounded-full border-2 border-rose-300" />
                <div>
                  <div className="font-bold text-slate-800">{user.displayName}</div>
                  <div className="text-sm text-slate-500">已登入</div>
                </div>
              </div>
            ) : (
              <div className="text-slate-600 font-medium">未登入（使用本機資料）</div>
            )}
            
            {user ? (
              <button onClick={handleSignOut} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-full transition-all flex items-center gap-2">
                <LogOut size={18} />
                <span>登出</span>
              </button>
            ) : (
              <button onClick={handleGoogleSignIn} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-all flex items-center gap-2">
                <LogIn size={18} />
                <span>Google 登入</span>
              </button>
            )}
          </div>

          <div className="text-center mb-8">
            <div className="text-7xl mb-4">📖</div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-3">中文字卡</h1>
            <p className="text-lg text-slate-500 font-medium">開始你的學習之旅</p>
          </div>

          <div className="mb-6">
            <div className="text-sm font-semibold text-slate-700 mb-3">熟悉度統計</div>
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2, 3, 4, 5].map(level => (
                <div key={level} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-3 text-center border border-blue-100">
                  <div className="text-xs text-slate-600 font-medium">Level {level}</div>
                  <div className="text-2xl font-black text-blue-600">{levelCounts[level]}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 text-center border border-green-100 mb-6">
            <div className="text-3xl font-black text-green-600">{todayCount}</div>
            <div className="text-sm text-slate-600 font-medium">今日已複習</div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <Filter size={18} />
              選擇複習範圍
            </label>
            <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-lg font-medium text-slate-700 focus:outline-none focus:border-rose-400 transition-colors">
              <option value="all">全部字卡 ({allCards.length})</option>
              <option value="0">熟悉度 0 - 未學習 ({levelCounts[0]})</option>
              <option value="1">熟悉度 1 - 剛認識 ({levelCounts[1]})</option>
              <option value="2">熟悉度 2 - 不穩定 ({levelCounts[2]})</option>
              <option value="3">熟悉度 3 - 反應慢 ({levelCounts[3]})</option>
              <option value="4">熟悉度 4 - 需想一下 ({levelCounts[4]})</option>
              <option value="5">熟悉度 5 - 非常熟悉 ({levelCounts[5]})</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-3">字體選擇</label>
            <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-lg font-medium text-slate-700 focus:outline-none focus:border-rose-400 transition-colors">
              <option value="default">預設字體</option>
              <option value="kai">標楷體</option>
            </select>
          </div>

          <div className="mb-6">
            <button 
              onClick={() => setShowCardManager(true)}
              className="w-full bg-gradient-to-r from-purple-400 to-fuchsia-400 hover:from-purple-500 hover:to-fuchsia-500 text-white text-lg font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-3"
            >
              <Settings size={24} />
              <span>管理字卡</span>
            </button>
          </div>

          <div className="space-y-3">
            <button onClick={() => startStudy(false)} className="w-full bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white text-xl font-bold py-5 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-3">
              <span className="text-2xl">📚</span>
              <span>順序複習</span>
            </button>
            
            <button onClick={() => startStudy(true)} className="w-full bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-500 hover:to-indigo-500 text-white text-xl font-bold py-5 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-3">
              <RotateCw size={24} />
              <span>隨機複習（排除0和5）</span>
            </button>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-rose-100 px-6 py-3 rounded-full">
              <span className="text-slate-600 font-medium">當前範圍</span>
              <span className="text-2xl font-bold text-rose-500">{getFilteredCards().length}</span>
              <span className="text-slate-600 font-medium">張</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'flashcard' && shuffledCards.length > 0) {
    const card = shuffledCards[currentCard];
    const currentLevel = getCardLevel(card.word);
    const isStudiedToday = studiedToday.has(card.word);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center p-6">
        {showImageUpload && <ImageUploadModal />}
        {showCardManager && <CardManagerModal />}
        
        <div className="max-w-3xl w-full">
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setMode('menu')} className="bg-white/80 backdrop-blur-xl text-slate-700 font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all border border-slate-200 flex items-center gap-2">
              <span>←</span>
              <span>返回選單</span>
            </button>

            <div className="flex gap-2">
              {[0, 1, 2, 3, 4, 5].map(level => (
                <button 
                  key={level} 
                  onClick={() => saveCardLevel(card.word, level)} 
                  className={`font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all border-2 ${currentLevel === level ? 'bg-rose-500 text-white border-rose-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-10">
            <div className="flex justify-between items-center mb-8">
              <div className="inline-flex items-center gap-3 bg-rose-100 px-6 py-3 rounded-full">
                <span className="text-slate-600 font-medium">字卡</span>
                <span className="text-xl font-bold text-rose-500">{currentCard + 1}</span>
                <span className="text-slate-400">/</span>
                <span className="text-slate-600">{shuffledCards.length}</span>
              </div>

              <div className="flex items-center gap-3">
                {isStudiedToday && (
                  <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
                    <CheckCircle size={18} className="text-green-600" />
                    <span className="text-sm font-medium text-green-700">今日已複習</span>
                  </div>
                )}
                <div className="bg-blue-100 px-4 py-2 rounded-full">
                  <span className="text-sm font-medium text-blue-700">熟悉度: {currentLevel}</span>
                </div>
              </div>
            </div>
            
            <div onClick={handleFlip} className="relative h-[500px] cursor-pointer group mb-8">
              <div className="absolute w-full h-full">
                {!isFlipped ? (
                  <div className={`w-full h-full bg-gradient-to-br ${card.color} rounded-3xl shadow-xl border-2 border-white/50 flex flex-col items-center justify-center transition-transform group-hover:scale-[1.01]`}>
                    <div className="relative">
                      <div className={`absolute inset-0 ${card.accent} opacity-10 blur-3xl rounded-full`}></div>
                      <div className="relative font-black text-slate-800 tracking-tight leading-none" style={{fontSize: '240px', ...getFontStyle()}}>
                        {card.word}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${card.color} rounded-3xl shadow-xl border-2 border-white/50 flex flex-col items-center justify-center gap-8 p-10`}>
                    {renderCardBack(card)}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-between gap-4">
              <button onClick={prevCard} className="flex-1 bg-gradient-to-r from-slate-400 to-slate-500 hover:from-slate-500 hover:to-slate-600 text-white text-xl font-semibold py-5 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all">
                ← 上一張
              </button>
              
              <button onClick={nextCard} className="flex-1 bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white text-xl font-semibold py-5 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all">
                下一張 →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ChineseFlashcard;
