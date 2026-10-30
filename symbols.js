/**
 * Gaming Symbols Database
 * A curated collection of symbols widely supported across PUBG, Free Fire, COD, etc.
 */

const SYMBOLS_DATA = [
  {
    category: "أسلحة وسيوف (Weapons)",
    id: "weapons",
    symbols: [
      "︻╦̵̵͇̿̿̿̿╤──", "▄︻̷̿┻̿═━一", "╾━╤デ╦︻", "︻デ═一", "⌐╦╦═─",
      "⚔️", "⚔", "🗡️", "🏹", "🛡️", "☠️", "☠", "𖣘", "𖤍", "⚚"
    ]
  },
  {
    category: "أجنحة وإطارات أساطير (Wings & Frames)",
    id: "wings",
    symbols: [
      "꧁", "꧂", "༺", "༻", "亗", "〆", "彡", "☬", "༒", "⫷", "⫸",
      "『", "』", "【", "】", "〖", "〗", "《", "》", "〔", "〕",
      "𓆩", "𓆪", "𓊈", "𓊉", "‹", "›", "«", "»", "⟨", "⟩"
    ]
  },
  {
    category: "تيجان وملوك (Crowns & VIP)",
    id: "crowns",
    symbols: [
      "👑", "♔", "♕", "♚", "♛", "𓅓", "𓆩👑𓆪", "亗", "☬", "⚜️",
      "⚜", "🏆", "🎖️", "🎗️", "🎩"
    ]
  },
  {
    category: "رموز يابانية وصينية (Asian & Kanji)",
    id: "asian",
    symbols: [
      "气", "王", "父", "个", "乄", "乡", "々", "ゞ", "〄", "神",
      "鬼", "龍", "死", "魔", "影", "虎", "狼", "忍", "侍", "月"
    ]
  },
  {
    category: "نجوم وبرق وطاقة (Stars & Lightning)",
    id: "stars",
    symbols: [
      "★", "☆", "✦", "✧", "✪", "✯", "✰", "⚡", "☄", "☀️",
      "🌙", "⭐", "💫", "✨", "🔥", "💥", "☢️", "☣️", "⚙️", "❂"
    ]
  },
  {
    category: "أرقام ورموز فخمة (Numbers & Aesthetics)",
    id: "aesthetic",
    symbols: [
      "①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩",
      "❶", "❷", "❸", "❹", "❺", "❻", "❼", "❽", "❾", "❿",
      "ⅰ", "ⅱ", "ⅲ", "ⅳ", "ⅴ", "ⅵ", "ⅶ", "ⅷ", "ⅸ", "ⅹ",
      "Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ", "Ⅹ"
    ]
  },
  {
    category: "قلوب وزهور ورموز خاصة (Hearts & Florals)",
    id: "hearts",
    symbols: [
      "🖤", "🤍", "💔", "❤️‍🔥", "❦", "❧", "✿", "❀", "❁", "❃",
      "✾", "✤", "✥", "✦", "✓", "✗", "∞", "☯", "", "☕"
    ]
  }
];

// Invisible space characters (Hangul Filler U+3164 is famous for Free Fire / PUBG)
const INVISIBLE_SPACES = {
  hangulFiller: "\u3164",       // Free Fire standard
  zeroWidthSpace: "\u200B",     // Zero width space
  zeroWidthNonJoiner: "\u200C", // ZWNJ
  brailleBlank: "\u2800"        // Braille blank space
};
