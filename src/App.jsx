const allCards = [
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
  ];import React, { useState } from 'react';
import { Volume2, Filter, RotateCw, CheckCircle } from 'lucide-react';

const ChineseFlashcard = () => {
  const [mode, setMode] = useState('menu');
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [filterLevel, setFilterLevel] = useState('all');
  const [studiedToday, setStudiedToday] = useState(new Set());
  const [fontFamily, setFontFamily] = useState('default');
  const [cardLevels, setCardLevels] = useState({});
  
  const allCards = [
    { word: '貓', type: 'image', image: '🐱', color: 'from-amber-50 to-orange-50', accent: 'bg-amber-500', level: 5 },
    { word: '狗', type: 'image', image: '🐶', color: 'from-blue-50 to-cyan-50', accent: 'bg-blue-500', level: 3 },
    { word: '魚', type: 'image', image: '🐟', color: 'from-cyan-50 to-teal-50', accent: 'bg-cyan-500', level: 5 },
    { word: '鳥', type: 'image', image: '🐦', color: 'from-sky-50 to-indigo-50', accent: 'bg-sky-500', level: 5 },
    { word: '雞', type: 'image', image: '🐔', color: 'from-yellow-50 to-amber-50', accent: 'bg-yellow-500', level: 3 },
    { word: '鴨', type: 'image', image: '🦆', color: 'from-blue-50 to-sky-50', accent: 'bg-blue-400', level: 5 },
    { word: '豬', type: 'image', image: '🐷', color: 'from-pink-50 to-rose-50', accent: 'bg-pink-400', level: 5 },
    { word: '牛', type: 'image', image: '🐮', color: 'from-amber-50 to-yellow-50', accent: 'bg-amber-600', level: 5 },
    { word: '馬', type: 'image', image: '🐴', color: 'from-orange-50 to-amber-50', accent: 'bg-orange-500', level: 3 },
    { word: '羊', type: 'image', image: '🐑', color: 'from-slate-50 to-gray-50', accent: 'bg-slate-400', level: 5 },
    { word: '熊', type: 'image', image: '🐻', color: 'from-amber-50 to-orange-50', accent: 'bg-amber-700', level: 5 },
    { word: '虎', type: 'image', image: '🐯', color: 'from-orange-50 to-red-50', accent: 'bg-orange-600', level: 5 },
    { word: '獅', type: 'image', image: '🦁', color: 'from-yellow-50 to-orange-50', accent: 'bg-yellow-600', level: 5 },
    { word: '象', type: 'image', image: '🐘', color: 'from-gray-50 to-slate-50', accent: 'bg-gray-500', level: 5 },
    { word: '猴', type: 'image', image: '🐵', color: 'from-amber-50 to-yellow-50', accent: 'bg-amber-500', level: 5 },
    { word: '鹿', type: 'image', image: '🦌', color: 'from-orange-50 to-amber-50', accent: 'bg-orange-400', level: 5 },
    { word: '兔', type: 'image', image: '🐰', color: 'from-pink-50 to-rose-50', accent: 'bg-pink-400', level: 5 },
    { word: '蛇', type: 'image', image: '🐍', color: 'from-green-50 to-emerald-50', accent: 'bg-green-600', level: 5 },
    { word: '龜', type: 'image', image: '🐢', color: 'from-emerald-50 to-teal-50', accent: 'bg-emerald-600', level: 5 },
    { word: '蝴', type: 'image', image: '🦋', color: 'from-purple-50 to-pink-50', accent: 'bg-purple-400', level: 5 },
    { word: '蟲', type: 'image', image: '🐛', color: 'from-green-50 to-lime-50', accent: 'bg-green-500', level: 5 },
    { word: '鵝', type: 'image', image: '🦢', color: 'from-slate-50 to-blue-50', accent: 'bg-slate-300', level: 5 },
    { word: '蝦', type: 'image', image: '🦐', color: 'from-red-50 to-orange-50', accent: 'bg-red-400', level: 5 },
    { word: '花', type: 'image', image: '🌸', color: 'from-pink-50 to-rose-50', accent: 'bg-pink-500', level: 2 },
    { word: '樹', type: 'image', image: '🌳', color: 'from-emerald-50 to-green-50', accent: 'bg-emerald-500', level: 5 },
    { word: '草', type: 'image', image: '🌿', color: 'from-green-50 to-emerald-50', accent: 'bg-green-500', level: 3 },
    { word: '木', type: 'image', image: '🪵', color: 'from-amber-50 to-orange-50', accent: 'bg-amber-700', level: 3 },
    { word: '書', type: 'image', image: '📚', color: 'from-blue-50 to-indigo-50', accent: 'bg-blue-500', level: 5 },
    { word: '車', type: 'image', image: '🚗', color: 'from-blue-50 to-cyan-50', accent: 'bg-blue-500', level: 3 },
    { word: '門', type: 'image', image: '🚪', color: 'from-amber-50 to-orange-50', accent: 'bg-amber-600', level: 3 },
    { word: '船', type: 'image', image: '⛵', color: 'from-sky-50 to-blue-50', accent: 'bg-sky-500', level: 3 },
    { word: '手', type: 'image', image: '✋', color: 'from-orange-50 to-amber-50', accent: 'bg-orange-400', level: 3 },
    { word: '星', type: 'image', image: '⭐', color: 'from-yellow-50 to-amber-50', accent: 'bg-yellow-500', level: 3 },
    { word: '一', type: 'abstract', color: 'from-violet-50 to-purple-50', accent: 'bg-violet-500', level: 5 },
    { word: '二', type: 'abstract', color: 'from-indigo-50 to-blue-50', accent: 'bg-indigo-500', level: 2 },
    { word: '大', type: 'abstract', color: 'from-indigo-50 to-blue-50', accent: 'bg-indigo-500', level: 5 },
    { word: '上', type: 'abstract', color: 'from-sky-50 to-cyan-50', accent: 'bg-sky-500', level: 5 },
    { word: '天', type: 'abstract', color: 'from-blue-50 to-indigo-50', accent: 'bg-blue-500', level: 5 },
    { word: '好', type: 'abstract', color: 'from-pink-50 to-rose-50', accent: 'bg-pink-500', level: 5 },
    { word: '可', type: 'abstract', color: 'from-purple-50 to-fuchsia-50', accent: 'bg-purple-500', level: 5 },
    { word: '看', type: 'abstract', color: 'from-cyan-50 to-teal-50', accent: 'bg-cyan-500', level: 5 },
    { word: '家', type: 'abstract', color: 'from-orange-50 to-amber-50', accent: 'bg-orange-500', level: 5 },
    { word: '下', type: 'abstract', color: 'from-emerald-50 to-green-50', accent: 'bg-emerald-500', level: 5 },
    { word: '得', type: 'abstract', color: 'from-rose-50 to-pink-50', accent: 'bg-rose-500', level: 5 },
    { word: '用', type: 'abstract', color: 'from-teal-50 to-cyan-50', accent: 'bg-teal-500', level: 5 },
    { word: '成', type: 'abstract', color: 'from-amber-50 to-yellow-50', accent: 'bg-amber-500', level: 5 },
    { word: '回', type: 'abstract', color: 'from-lime-50 to-green-50', accent: 'bg-lime-500', level: 5 },
    { word: '開', type: 'abstract', color: 'from-fuchsia-50 to-pink-50', accent: 'bg-fuchsia-500', level: 5 },
    { word: '做', type: 'abstract', color: 'from-violet-50 to-purple-50', accent: 'bg-violet-500', level: 5 },
    { word: '媽', type: 'abstract', color: 'from-pink-50 to-rose-50', accent: 'bg-pink-500', level: 5 },
    { word: '什', type: 'abstract', color: 'from-cyan-50 to-sky-50', accent: 'bg-cyan-500', level: 5 },
    { word: '面', type: 'abstract', color: 'from-yellow-50 to-amber-50', accent: 'bg-yellow-500', level: 5 },
    { word: '想', type: 'abstract', color: 'from-indigo-50 to-violet-50', accent: 'bg-indigo-500', level: 5 },
    { word: '自', type: 'abstract', color: 'from-green-50 to-emerald-50', accent: 'bg-green-500', level: 5 },
    { word: '美', type: 'abstract', color: 'from-rose-50 to-pink-50', accent: 'bg-rose-500', level: 5 },
    { word: '爸', type: 'abstract', color: 'from-blue-50 to-cyan-50', accent: 'bg-blue-500', level: 5 },
    { word: '沒', type: 'abstract', color: 'from-slate-50 to-gray-50', accent: 'bg-slate-500', level: 5 },
    { word: '小', type: 'abstract', color: 'from-purple-50 to-fuchsia-50', accent: 'bg-purple-500', level: 5 },
    { word: '愛', type: 'abstract', color: 'from-pink-50 to-red-50', accent: 'bg-pink-600', level: 5 },
    { word: '吃', type: 'abstract', color: 'from-orange-50 to-red-50', accent: 'bg-orange-500', level: 5 },
    { word: '難', type: 'abstract', color: 'from-gray-50 to-slate-50', accent: 'bg-gray-500', level: 5 },
    { word: '的', type: 'abstract', color: 'from-violet-50 to-purple-50', accent: 'bg-violet-500', level: 4 },
    { word: '地', type: 'abstract', color: 'from-amber-50 to-orange-50', accent: 'bg-amber-600', level: 4 },
    { word: '年', type: 'abstract', color: 'from-red-50 to-orange-50', accent: 'bg-red-500', level: 4 },
    { word: '會', type: 'abstract', color: 'from-blue-50 to-indigo-50', accent: 'bg-blue-500', level: 4 },
    { word: '很', type: 'abstract', color: 'from-green-50 to-teal-50', accent: 'bg-green-500', level: 4 },
    { word: '以', type: 'abstract', color: 'from-purple-50 to-pink-50', accent: 'bg-purple-500', level: 4 },
    { word: '說', type: 'abstract', color: 'from-cyan-50 to-blue-50', accent: 'bg-cyan-500', level: 4 },
    { word: '這', type: 'abstract', color: 'from-rose-50 to-pink-50', accent: 'bg-rose-500', level: 4 },
    { word: '那', type: 'abstract', color: 'from-indigo-50 to-purple-50', accent: 'bg-indigo-500', level: 4 },
    { word: '東', type: 'abstract', color: 'from-orange-50 to-amber-50', accent: 'bg-orange-500', level: 4 },
    { word: '西', type: 'abstract', color: 'from-yellow-50 to-orange-50', accent: 'bg-yellow-500', level: 4 },
    { word: '高', type: 'abstract', color: 'from-sky-50 to-blue-50', accent: 'bg-sky-500', level: 4 },
    { word: '現', type: 'abstract', color: 'from-teal-50 to-cyan-50', accent: 'bg-teal-500', level: 4 },
    { word: '睡', type: 'abstract', color: 'from-indigo-50 to-blue-50', accent: 'bg-indigo-600', level: 4 },
    { word: '課', type: 'abstract', color: 'from-emerald-50 to-green-50', accent: 'bg-emerald-500', level: 4 },
    { word: '起', type: 'abstract', color: 'from-lime-50 to-green-50', accent: 'bg-lime-600', level: 4 },
    { word: '飯', type: 'abstract', color: 'from-orange-50 to-red-50', accent: 'bg-orange-600', level: 4 },
    { word: '菜', type: 'abstract', color: 'from-green-50 to-emerald-50', accent: 'bg-green-600', level: 4 },
    { word: '湯', type: 'abstract', color: 'from-amber-50 to-yellow-50', accent: 'bg-amber-500', level: 4 },
    { word: '早', type: 'abstract', color: 'from-yellow-50 to-orange-50', accent: 'bg-yellow-600', level: 4 },
    { word: '不', type: 'abstract', color: 'from-red-50 to-rose-50', accent: 'bg-red-500', level: 3 },
    { word: '國', type: 'abstract', color: 'from-red-50 to-orange-50', accent: 'bg-red-600', level: 3 },
    { word: '要', type: 'abstract', color: 'from-purple-50 to-fuchsia-50', accent: 'bg-purple-600', level: 3 },
    { word: '出', type: 'abstract', color: 'from-blue-50 to-sky-50', accent: 'bg-blue-600', level: 3 },
    { word: '生', type: 'abstract', color: 'from-green-50 to-emerald-50', accent: 'bg-green-600', level: 3 },
    { word: '來', type: 'abstract', color: 'from-cyan-50 to-teal-50', accent: 'bg-cyan-600', level: 3 },
    { word: '班', type: 'abstract', color: 'from-indigo-50 to-blue-50', accent: 'bg-indigo-600', level: 3 },
    { word: '姐', type: 'abstract', color: 'from-pink-50 to-rose-50', accent: 'bg-pink-600', level: 3 },
    { word: '哥', type: 'abstract', color: 'from-blue-50 to-indigo-50', accent: 'bg-blue-700', level: 3 },
    { word: '哭', type: 'abstract', color: 'from-slate-50 to-gray-50', accent: 'bg-slate-600', level: 3 },
    { word: '肚', type: 'abstract', color: 'from-orange-50 to-amber-50', accent: 'bg-orange-600', level: 3 },
    { word: '了', type: 'abstract', color: 'from-violet-50 to-purple-50', accent: 'bg-violet-500', level: 1 },
    { word: '他', type: 'abstract', color: 'from-blue-50 to-cyan-50', accent: 'bg-blue-500', level: 1 },
    { word: '她', type: 'abstract', color: 'from-pink-50 to-rose-50', accent: 'bg-pink-500', level: 1 },
    { word: '哪', type: 'abstract', color: 'from-orange-50 to-amber-50', accent: 'bg-orange-500', level: 1 },
    { word: '去', type: 'abstract', color: 'from-green-50 to-emerald-50', accent: 'bg-green-500', level: 1 },
    { word: '玩', type: 'abstract', color: 'from-purple-50 to-fuchsia-50', accent: 'bg-purple-500', level: 1 },
    { word: '多', type: 'abstract', color: 'from-slate-50 to-gray-50', accent: 'bg-slate-500', level: 0 },
    { word: '點', type: 'abstract', color: 'from-amber-50 to-yellow-50', accent: 'bg-amber-500', level: 0 },
    { word: '等', type: 'abstract', color: 'from-cyan-50 to-teal-50', accent: 'bg-cyan-500', level: 0 },
    { word: '再', type: 'abstract', color: 'from-indigo-50 to-blue-50', accent: 'bg-indigo-500', level: 0 },
    { word: '少', type: 'abstract', color: 'from-rose-50 to-pink-50', accent: 'bg-rose-500', level: 0 },
    { word: '隻', type: 'abstract', color: 'from-violet-50 to-purple-50', accent: 'bg-violet-500', level: 0 },
    { word: '笑', type: 'abstract', color: 'from-yellow-50 to-orange-50', accent: 'bg-yellow-500', level: 0 },
    { word: '建', type: 'abstract', color: 'from-blue-50 to-sky-50', accent: 'bg-blue-500', level: 0 },
    { word: '跑', type: 'abstract', color: 'from-green-50 to-emerald-50', accent: 'bg-green-500', level: 0 },
    { word: '呀', type: 'abstract', color: 'from-pink-50 to-rose-50', accent: 'bg-pink-500', level: 0 },
    { word: '遊', type: 'abstract', color: 'from-cyan-50 to-blue-50', accent: 'bg-cyan-500', level: 0 },
    { word: '腳', type: 'abstract', color: 'from-orange-50 to-red-50', accent: 'bg-orange-500', level: 0 },
    { word: '怕', type: 'abstract', color: 'from-purple-50 to-fuchsia-50', accent: 'bg-purple-500', level: 0 },
    { word: '啦', type: 'abstract', color: 'from-lime-50 to-green-50', accent: 'bg-lime-500', level: 0 },
    { word: '閃', type: 'abstract', color: 'from-yellow-50 to-amber-50', accent: 'bg-yellow-600', level: 0 },
    { word: '連', type: 'abstract', color: 'from-teal-50 to-cyan-50', accent: 'bg-teal-500', level: 0 },
    { word: '都', type: 'abstract', color: 'from-indigo-50 to-purple-50', accent: 'bg-indigo-600', level: 0 },
    { word: '找', type: 'abstract', color: 'from-emerald-50 to-green-50', accent: 'bg-emerald-500', level: 0 },
    { word: '叫', type: 'abstract', color: 'from-red-50 to-orange-50', accent: 'bg-red-500', level: 0 },
    { word: '跳', type: 'abstract', color: 'from-fuchsia-50 to-pink-50', accent: 'bg-fuchsia-500', level: 0 },
  ];

  const getFontStyle = () => {
    if (fontFamily === 'kai') {
      return { fontFamily: 'DFKai-SB, BiauKai, "標楷體", KaiTi, STKaiti, "AR PL UKai CN", "AR PL UKai HK", "AR PL UKai TW", "AR PL UKai TW MBE", serif' };
    }
    return {};
  };

  const playSound = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-TW';
    utterance.rate = 0.4;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    speechSynthesis.speak(utterance);
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
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

  const setCardLevel = (word, level) => {
    setCardLevels(prev => ({
      ...prev,
      [word]: level
    }));
  };

  const getFilteredCards = () => {
    if (filterLevel === 'all') return allCards;
    return allCards.filter(card => getCardLevel(card.word) === parseInt(filterLevel));
  };

  const startStudy = (shuffle) => {
    let filtered = getFilteredCards();
    
    // 如果是隨機複習，排除熟悉度0和5
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
    const newSet = new Set(studiedToday);
    newSet.add(word);
    setStudiedToday(newSet);
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

    if (card.type === 'image') {
      return (
        <>
          <div className="relative flex-1 flex items-center justify-center">
            <div className={`absolute inset-0 ${card.accent} opacity-20 blur-3xl`}></div>
            <div className="relative drop-shadow-2xl" style={{fontSize: '280px'}}>
              {card.image}
            </div>
          </div>
          <button onClick={handleSound} className="bg-white/90 backdrop-blur text-slate-700 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-3 text-xl border border-slate-200">
            <Volume2 size={28} className="text-rose-500" />
            <span>再聽一次</span>
          </button>
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

  if (mode === 'menu') {
    const todayCount = studiedToday.size;
    const levelCounts = [0, 1, 2, 3, 4, 5].map(level => 
      allCards.filter(card => getCardLevel(card.word) === level).length
    );
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center p-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 max-w-lg w-full">
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
        <div className="max-w-3xl w-full">
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setMode('menu')} className="bg-white/80 backdrop-blur-xl text-slate-700 font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all border border-slate-200 flex items-center gap-2">
              <span>←</span>
              <span>返回選單</span>
            </button>

            <div className="flex gap-2">
              {[0, 1, 2, 3, 4, 5].map(level => (
                <button key={level} onClick={() => setCardLevel(card.word, level)} className={`font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all border-2 ${currentLevel === level ? 'bg-rose-500 text-white border-rose-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>
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
