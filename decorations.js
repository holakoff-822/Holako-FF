/**
 * Gaming Nickname Decoration Engine
 * Handles font mapping, Arabic embellishments, gaming borders/frames, and presets.
 */

// Mapping dictionaries for English Unicode fonts
const FONT_MAPS = {
  gothicBold: {
    name: "قوطي عريض (Gothic Bold)",
    map: {
      'A': '𝕬', 'B': '𝕭', 'C': '𝕮', 'D': '𝕯', 'E': '𝕰', 'F': '𝕱', 'G': '𝕲', 'H': '𝕳', 'I': '𝕴',
      'J': '𝕵', 'K': '𝕶', 'L': '𝕷', 'M': '𝕸', 'N': '𝕹', 'O': '𝕺', 'P': '𝕻', 'Q': '𝕼', 'R': '𝕽',
      'S': '𝕾', 'T': '𝕿', 'U': '𝖀', 'V': '𝖁', 'W': '𝖂', 'X': '𝖃', 'Y': '𝖄', 'Z': '𝖅',
      'a': '𝖆', 'b': '𝖇', 'c': '𝖈', 'd': '𝖉', 'e': '𝖊', 'f': '𝖋', 'g': '𝖌', 'h': '𝖍', 'i': '𝖎',
      'j': '𝖏', 'k': '𝖐', 'l': '𝖑', 'm': '𝖒', 'n': '𝖓', 'o': '𝖔', 'p': '𝖕', 'q': '𝖖', 'r': '𝖗',
      's': '𝖘', 't': '𝖙', 'u': '𝖚', 'v': '𝖛', 'w': '𝖜', 'x': '𝖝', 'y': '𝖞', 'z': '𝖟',
      '0': '𝟘', '1': '𝟙', '2': '𝟚', '3': '𝟛', '4': '𝟜', '5': '𝟝', '6': '𝟞', '7': '𝟟', '8': '𝟠', '9': '𝟡'
    }
  },
  cursiveBold: {
    name: "رسمي ملكي (Cursive VIP)",
    map: {
      'A': '𝓐', 'B': '𝓑', 'C': '𝓒', 'D': '𝓓', 'E': '𝓔', 'F': '𝓕', 'G': '𝓖', 'H': '𝓗', 'I': '𝓘',
      'J': '𝓙', 'K': '𝓚', 'L': '𝓛', 'M': '𝓜', 'N': '𝓝', 'O': '𝓞', 'P': '𝓟', 'Q': '𝓠', 'R': '𝓡',
      'S': '𝓢', 'T': '𝓣', 'U': '𝓤', 'V': '𝓥', 'W': '𝓦', 'X': '𝓧', 'Y': '𝓨', 'Z': '𝓩',
      'a': '𝓪', 'b': '𝓫', 'c': '𝓬', 'd': '𝓭', 'e': '𝓮', 'f': '𝓯', 'g': '𝓰', 'h': '𝓱', 'i': '𝓲',
      'j': '𝓳', 'k': '𝓴', 'l': '𝓵', 'm': '𝓶', 'n': '𝓷', 'o': '𝓸', 'p': '𝓹', 'q': '𝓺', 'r': '𝓻',
      's': '𝓼', 't': '𝓽', 'u': '𝓾', 'v': '𝓿', 'w': '𝔀', 'x': '𝔁', 'y': '𝔂', 'z': '𝔃'
    }
  },
  doubleStruck: {
    name: "مزدوج مجوف (Double-Struck)",
    map: {
      'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽', 'G': '𝔾', 'H': 'ℍ', 'I': '𝕀',
      'J': '𝕁', 'K': '𝕂', 'L': '𝕃', 'M': '𝕄', 'N': 'ℕ', 'O': '𝕆', 'P': 'ℙ', 'Q': 'ℚ', 'R': 'ℝ',
      'S': '𝕊', 'T': '𝕋', 'U': '𝕌', 'V': '𝕍', 'W': '𝕎', 'X': '𝕏', 'Y': '𝕐', 'Z': 'ℤ',
      'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘', 'h': '𝕙', 'i': '𝕚',
      'j': '𝕛', 'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟', 'o': '𝕠', 'p': '𝕡', 'q': '𝕢', 'r': '𝕣',
      's': '𝕤', 't': '𝕥', 'u': '𝕦', 'v': '𝕧', 'w': '𝕨', 'x': '𝕩', 'y': '𝕪', 'z': '𝕫',
      '0': '𝟘', '1': '𝟙', '2': '𝟚', '3': '𝟛', '4': '𝟜', '5': '𝟝', '6': '𝟞', '7': '𝟟', '8': '𝟠', '9': '𝟡'
    }
  },
  boldSans: {
    name: "عريض حديث (Bold Gaming)",
    map: {
      'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜',
      'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥',
      'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
      'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶',
      'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿',
      's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
      '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
    }
  },
  smallCaps: {
    name: "حروف كابتل مصغرة (Small Caps)",
    map: {
      'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ꜰ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ',
      'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ',
      's': 's', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ',
      'A': 'ᴀ', 'B': 'ʙ', 'C': 'ᴄ', 'D': 'ᴅ', 'E': 'ᴇ', 'F': 'ꜰ', 'G': 'ɢ', 'H': 'ʜ', 'I': 'ɪ',
      'J': 'ᴊ', 'K': 'ᴋ', 'L': 'ʟ', 'M': 'ᴍ', 'N': 'ɴ', 'O': 'ᴏ', 'P': 'ᴘ', 'Q': 'ǫ', 'R': 'ʀ',
      'S': 's', 'T': 'ᴛ', 'U': 'ᴜ', 'V': 'ᴠ', 'W': 'ᴡ', 'X': 'x', 'Y': 'ʏ', 'Z': 'ᴢ'
    }
  },
  bubble: {
    name: "دوائر وفقاعات (Circled)",
    map: {
      'A': 'Ⓐ', 'B': 'Ⓑ', 'C': 'Ⓒ', 'D': 'Ⓓ', 'E': 'Ⓔ', 'F': 'Ⓕ', 'G': 'Ⓖ', 'H': 'Ⓗ', 'I': 'Ⓘ',
      'J': 'Ⓙ', 'K': 'Ⓚ', 'L': 'Ⓛ', 'M': 'Ⓜ', 'N': 'Ⓝ', 'O': 'Ⓞ', 'P': 'Ⓟ', 'Q': 'Ⓠ', 'R': 'Ⓡ',
      'S': 'Ⓢ', 'T': 'Ⓣ', 'U': 'Ⓤ', 'V': 'Ⓥ', 'W': 'Ⓦ', 'X': 'Ⓧ', 'Y': 'Ⓨ', 'Z': 'Ⓩ',
      'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ',
      'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ',
      's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ',
      '0': '⓪', '1': '①', '2': '②', '3': '③', '4': '④', '5': '⑤', '6': '⑥', '7': '⑦', '8': '⑧', '9': '⑨'
    }
  },
  vaporwave: {
    name: "متباعد عريض (Wide / Aesthetic)",
    map: {
      'A': 'Ａ', 'B': 'Ｂ', 'C': 'Ｃ', 'D': 'Ｄ', 'E': 'Ｅ', 'F': 'Ｆ', 'G': 'Ｇ', 'H': 'Ｈ', 'I': 'Ｉ',
      'J': 'Ｊ', 'K': 'Ｋ', 'L': 'Ｌ', 'M': 'Ｍ', 'N': 'Ｎ', 'O': 'Ｏ', 'P': 'Ｐ', 'Q': 'Ｑ', 'R': 'Ｒ',
      'S': 'Ｓ', 'T': 'Ｔ', 'U': 'Ｕ', 'V': 'Ｖ', 'W': 'Ｗ', 'X': 'Ｘ', 'Y': 'Ｙ', 'Z': 'Ｚ',
      'a': 'ａ', 'b': 'ｂ', 'c': 'ｃ', 'd': 'ｄ', 'e': 'ｅ', 'f': 'ｆ', 'g': 'ｇ', 'h': 'ｈ', 'i': 'ｉ',
      'j': 'ｊ', 'k': 'ｋ', 'l': 'ｌ', 'm': 'ｍ', 'n': 'ｎ', 'o': 'ｏ', 'p': 'ｐ', 'q': 'ｑ', 'r': 'ｒ',
      's': 'ｓ', 't': 'ｔ', 'u': 'ｕ', 'v': 'ｖ', 'w': 'ｗ', 'x': 'ｘ', 'y': 'ｙ', 'z': 'ｚ',
      '0': '０', '1': '１', '2': '２', '3': '３', '4': '４', '5': '５', '6': '６', '7': '７', '8': '８', '9': '９'
    }
  },
  monospace: {
    name: "آلة كاتبة (Monospace)",
    map: {
      'A': '𝙰', 'B': '𝙱', 'C': '𝙲', 'D': '𝙳', 'E': '𝙴', 'F': '𝙵', 'G': '𝙶', 'H': '𝙷', 'I': '𝙸',
      'J': '𝙹', 'K': '𝙺', 'L': '𝙻', 'M': '𝙼', 'N': '𝙽', 'O': '𝙾', 'P': '𝙿', 'Q': '𝚀', 'R': '𝚁',
      'S': '𝚂', 'T': '𝚃', 'U': '𝚄', 'V': '𝚅', 'W': '𝚆', 'X': '𝚇', 'Y': '𝚈', 'Z': '𝚉',
      'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑', 'i': '𝚒',
      'j': '𝚓', 'k': '𝚔', 'l': '𝚕', 'm': '𝚖', 'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛',
      's': '𝚜', 't': '𝚝', 'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡', 'y': '𝚢', 'z': '𝚣'
    }
  }
};

// Transform English characters through a given map
function applyFontMap(text, mapKey) {
  const font = FONT_MAPS[mapKey];
  if (!font) return text;
  return text.split('').map(char => font.map[char] || char).join('');
}

// Arabic Character Decorations and Variations
const ARABIC_DECORATORS = [
  {
    name: "تشكيل فخم مع حركات",
    apply: (text) => {
      const marks = ['َ', 'ُ', 'ِ', 'ّ', 'ْ', 'ً', 'ٌ', 'ٍ', 'ٰ'];
      return text.split('').map((char, i) => {
        if (/[\u0600-\u06FF]/.test(char) && char !== ' ') {
          return char + marks[i % marks.length];
        }
        return char;
      }).join('');
    }
  },
  {
    name: "تطويل ومدات الحروف (كـ ـشـ ـخـ ـة)",
    apply: (text) => {
      return text.split('').map(char => {
        if (/[\u0600-\u06FF]/.test(char) && char !== ' ') {
          return char + 'ـ';
        }
        return char;
      }).join('');
    }
  },
  {
    name: "تباعد فخم متناسق",
    apply: (text) => {
      return text.split('').join(' ');
    }
  },
  {
    name: "استبدال حروف نادرة (فولكنو)",
    apply: (text) => {
      const rep = {
        'ا': 'ﺂ', 'أ': 'ٲ', 'إ': 'إ', 'ل': 'لہ', 'ي': 'يِ', 'ى': 'ێ', 'ه': 'ھ',
        'م': 'مـہ', 'ن': 'نـہ', 'ت': 'تـہ', 'ك': 'ڪ', 'و': 'وُ', 'ر': 'رّ'
      };
      return text.split('').map(c => rep[c] || c).join('');
    }
  },
  {
    name: "نقوش وزخرفة سفلية",
    apply: (text) => {
      return text.split('').map(char => {
        if (/[\u0600-\u06FF]/.test(char) && char !== ' ') {
          return char + 'ـہ';
        }
        return char;
      }).join('');
    }
  },
  {
    name: "مزيج حروف كردية ومغاربية فخمة",
    apply: (text) => {
      const kurd = {
        'ك': 'ڬ', 'ف': 'ڥ', 'ب': 'پ', 'ج': 'چ', 'ز': 'ژ', 'ق': 'ڨ'
      };
      return text.split('').map(c => kurd[c] || c).join('');
    }
  }
];

// Gaming Wrappers and Badges (Borders, Wings, Signs)
const GAMING_FRAMES = [
  // PUBG Mobile Favorites
  { prefix: "꧁༺ ", suffix: " ༻꧂", tag: "pubg", styleName: "أجنحة الأساطير" },
  { prefix: "亗 『", suffix: "』 亗", tag: "pubg", styleName: "تاج الزعيم (亗)" },
  { prefix: "〆", suffix: "〆", tag: "pubg", styleName: "شارة القناص (〆)" },
  { prefix: "彡", suffix: "彡", tag: "pubg", styleName: "ريشة السرعة (彡)" },
  { prefix: "☬", suffix: "☬", tag: "pubg", styleName: "رمز الغورو (☬)" },
  { prefix: "༒", suffix: "༒", tag: "pubg", styleName: "مقدس الأساطير (༒)" },
  { prefix: "『V凸P』", suffix: "", tag: "pubg", styleName: "علامة VIP الهجومية" },
  { prefix: "王 ", suffix: " 王", tag: "pubg", styleName: "ملك الكانجي (王)" },
  { prefix: "气 ", suffix: " 气", tag: "pubg", styleName: "طاقة التشي (气)" },
  { prefix: "父 ", suffix: " 父", tag: "pubg", styleName: "الأب الروحي (父)" },
  { prefix: "个 ", suffix: " 个", tag: "pubg", styleName: "المحارب المنفرد" },
  { prefix: "乡 ", suffix: " 乡", tag: "pubg", styleName: "قبيلة الأبطال (乡)" },
  { prefix: "★彡 ", suffix: " 彡★", tag: "pubg", styleName: "نجمة السرعة" },
  { prefix: "︻╦╤─ ", suffix: " ─╤╦︻", tag: "pubg", styleName: "سلاح AWM المزدوج" },
  { prefix: "꧁༒☬", suffix: "☬༒꧂", tag: "pubg", styleName: "إكليل الفراعنة" },

  // Free Fire Favorites
  { prefix: "×͜× ", suffix: "", tag: "freefire", styleName: "ابتسامة الجوكر (×͜×)" },
  { prefix: "𓆩 ", suffix: " 𓆪", tag: "freefire", styleName: "أجنحة الصقر" },
  { prefix: "OP ᭄ ", suffix: "", tag: "freefire", styleName: "بادئة القوة (OP)" },
  { prefix: "✿ ᴍ ʀ ᭄ ", suffix: "", tag: "freefire", styleName: "مستر المحترف" },
  { prefix: "⚡ ", suffix: " ⚡", tag: "freefire", styleName: "صاعقة الرعد" },
  { prefix: " ", suffix: " ", tag: "freefire", styleName: "تفاحة آبل النادرة" },
  { prefix: "⫷ ", suffix: " ⫸", tag: "freefire", styleName: "أقواس الوحش" },
  { prefix: "『T͟X͟』", suffix: "", tag: "freefire", styleName: "عشيرة التاكسون" },
  { prefix: "", suffix: " 亗", tag: "freefire", styleName: "ختم الزعامة" },
  { prefix: "🖤 ", suffix: " 🖤", tag: "freefire", styleName: "القلب الأسود الغامض" },
  { prefix: "ɪɴᴅ・", suffix: "", tag: "freefire", styleName: "شارة البطولات" },

  // Luxury / VIP
  { prefix: "👑 ", suffix: " 👑", tag: "luxury", styleName: "التاج الذهبي الملكي" },
  { prefix: "𓆩👑𓆪 ", suffix: "", tag: "luxury", styleName: "تاج الصقر الإمبراطوري" },
  { prefix: "⚜️ ", suffix: " ⚜️", tag: "luxury", styleName: "الزنبقة الفرنسية الملكية" },
  { prefix: "『VIP』", suffix: "★", tag: "luxury", styleName: "كبار الشخصيات VIP" },
  { prefix: "『MR』", suffix: "™", tag: "luxury", styleName: "لقب السيد الاحترافي" },
  { prefix: "〖", suffix: "〗", tag: "luxury", styleName: "أقواس مذهبة" },

  // Aggressive & Dark / Scary
  { prefix: "☠️ ", suffix: " ☠️", tag: "dark", styleName: "شعار الجمجمة المرعبة" },
  { prefix: "⚔️ ", suffix: " ⚔️", tag: "dark", styleName: "سيوف الانتقام" },
  { prefix: "▄︻̷̿┻̿═━一 ", suffix: "", tag: "dark", styleName: "قناص الباريت" },
  { prefix: "☣️ ", suffix: " ☣️", tag: "dark", styleName: "الخطر البيولوجي" },
  { prefix: "『DEATH』", suffix: "", tag: "dark", styleName: "ملك الموت" },
  { prefix: "🩸 ", suffix: " 🩸", tag: "dark", styleName: "دماء المعركة" }
];

// Random Gamer Names for quick inspiration
const RANDOM_NAMES = {
  ar: [
    "الـصـقـر الـجـارح",
    "شـبـح الـلـيـل",
    "عـاصـفـة الـمـوت",
    "الـذئـب الـمـنـفـرد",
    "مـلـك الـسـاحـة",
    "الـجـلاد",
    "قـاهـر الـظـلام",
    "سـيـف الـعـدالـة",
    "بـركـان الـغـضـب",
    "صـائـد الـرؤوس",
    "الـكـوبـرا الـسـامـة",
    "الـجـنـرال",
    "إمـبـراطـور الـرعـب",
    "الـمـحـارب الأخـيـر",
    "الـقـائـد الـصـامـت",
    "قـنـاص الـهـيـدشـوت",
    "الـنـمـر الأسـود",
    "وحـش الـبـطـولـة"
  ],
  en: [
    "Shadow Hunter",
    "Ghost Killer",
    "Venom Sniper",
    "Death King",
    "Silent Assassin",
    "Apex Predator",
    "Cyber Ninja",
    "Doom Slayer",
    "Savage Beast",
    "Frost Bite",
    "Thunder Storm",
    "Iron Fist",
    "Dark Lord",
    "Headshot God",
    "Night Stalker",
    "Blood Thirsty",
    "Toxic Player",
    "Alpha Wolf"
  ]
};

/**
 * Generator function that takes input name and returns a rich list of decorated variants
 */
function generateDecorations(rawName) {
  const name = rawName.trim();
  if (!name) return [];

  const results = [];
  let id = 1;

  const isArabic = /[\u0600-\u06FF]/.test(name);
  const isEnglish = /[a-zA-Z]/.test(name);

  // 1. English Font Variations (if contains English letters)
  if (isEnglish) {
    Object.keys(FONT_MAPS).forEach(mapKey => {
      const font = FONT_MAPS[mapKey];
      const converted = applyFontMap(name, mapKey);
      results.push({
        id: id++,
        text: converted,
        title: font.name,
        tag: "english",
        badge: "خط إنجليزي"
      });

      // Combine with popular frames
      results.push({
        id: id++,
        text: `꧁༺ ${converted} ༻꧂`,
        title: `${font.name} + أجنحة الأساطير`,
        tag: "pubg",
        badge: "ببجي / Free Fire"
      });
      results.push({
        id: id++,
        text: `亗 『${converted}』 亗`,
        title: `${font.name} + تاج الزعامة`,
        tag: "luxury",
        badge: "فخمة"
      });
      results.push({
        id: id++,
        text: `×͜× ${converted}`,
        title: `${font.name} + جوكر`,
        tag: "freefire",
        badge: "فري فاير"
      });
    });
  }

  // 2. Arabic Decorated Variations (if contains Arabic)
  if (isArabic) {
    ARABIC_DECORATORS.forEach(dec => {
      const decorated = dec.apply(name);
      results.push({
        id: id++,
        text: decorated,
        title: dec.name,
        tag: "arabic",
        badge: "عربي مزخرف"
      });

      // Combine with popular frames
      results.push({
        id: id++,
        text: `꧁༺ ${decorated} ༻꧂`,
        title: `${dec.name} + أجنحة`,
        tag: "pubg",
        badge: "ببجي"
      });
      results.push({
        id: id++,
        text: `亗 『${decorated}』 亗`,
        title: `${dec.name} + تاج الزعيم`,
        tag: "luxury",
        badge: "ملكي"
      });
      results.push({
        id: id++,
        text: `𓆩 ${decorated} 𓆪`,
        title: `${dec.name} + صقر`,
        tag: "freefire",
        badge: "فري فاير"
      });
    });
  }

  // 3. Gaming Frames for the Raw / Stylized Name
  GAMING_FRAMES.forEach(frame => {
    // If it's English, try gothic or bold version inside frame too
    const styledInside = isEnglish ? applyFontMap(name, 'boldSans') : name;
    results.push({
      id: id++,
      text: `${frame.prefix}${styledInside}${frame.suffix}`,
      title: frame.styleName,
      tag: frame.tag,
      badge: frame.tag.toUpperCase()
    });
  });

  // 4. Special Creative Hybrid Combinations
  results.push(
    {
      id: id++,
      text: `☬【${name}】☬`,
      title: "قناع الإمبراطور المحصن",
      tag: "pubg",
      badge: "ببجي"
    },
    {
      id: id++,
      text: `★ᴾᴿᴼ★ ${name} ⚡`,
      title: "شارة اللاعب المحترف Pro",
      tag: "freefire",
      badge: "فري فاير"
    },
    {
      id: id++,
      text: `▄︻̷̿┻̿═━一 ${name} ☠️`,
      title: "قناص الموت السريع",
      tag: "dark",
      badge: "مرعبة"
    },
    {
      id: id++,
      text: `『LeGeNd』${name}`,
      title: "أسطورة البطولات",
      tag: "luxury",
      badge: "VIP"
    },
    {
      id: id++,
      text: ` ${name} `,
      title: "تفاحة أبل الفخمة",
      tag: "luxury",
      badge: "نادرة"
    },
    {
      id: id++,
      text: `༒『${name}』༒`,
      title: "محارب النخبة الأسطوري",
      tag: "pubg",
      badge: "ببجي"
    },
    {
      id: id++,
      text: `×͜× ${name} 亗`,
      title: "جوكر الزعامة المزدوج",
      tag: "freefire",
      badge: "فري فاير"
    },
    {
      id: id++,
      text: `⚔️〖${name}〗⚔️`,
      title: "فرسان المعركة",
      tag: "dark",
      badge: "قتالية"
    },
    {
      id: id++,
      text: `👑『${name}』👑`,
      title: "الملك المتوج VIP",
      tag: "luxury",
      badge: "VIP"
    },
    {
      id: id++,
      text: `★彡[ ${name} ]彡★`,
      title: "نجم الفيكتوري",
      tag: "pubg",
      badge: "ببجي"
    }
  );

  return results;
}
