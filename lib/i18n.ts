// 対応言語
export const languages = ["en", "ja"] as const;
export type Language = (typeof languages)[number];

// 言語表示名
export const languageNames: Record<Language, string> = {
  en: "English",
  ja: "日本語",
};

// 各言語のナビゲーション項目
export const navigation: Record<Language, Record<string, string>> = {
  en: {
    home: "Home",
    about: "About",
    contact: "Contact",
  },
  ja: {
    home: "Home",
    about: "About",
    contact: "Contact",
  },
};

// 翻訳用辞書
export const dictionary: Record<Language, Record<string, string>> = {
  en: {
    greeting: "Hi! I am Leo.",
    bio: "I am a software engineer with a passion for building web applications.",
    contactTitle: "Contact Me",
    workTitle: "My Work",
    notFound: "This page does not exist...",
    returnHome: "Return to Home",
    returnBack: "Return",
    footerCopyright: "© 2023 Your Company. All rights reserved.",
  },
  ja: {
    greeting: "こんにちは！Leoです。",
    bio: "Webアプリケーション制作に情熱を持つソフトウェアエンジニアです。",
    contactTitle: "お問い合わせ",
    workTitle: "制作物",
    notFound: "このページは存在しません...",
    returnHome: "ホームに戻る",
    returnBack: "戻る",
    footerCopyright: "© 2023 あなたの会社. All rights reserved.",
  },
};

// 言語コードからディクショナリを取得する関数
export function getDictionary(locale: Language | string) {
  // 対応言語でない場合はデフォルト言語(英語)を返す
  if (!languages.includes(locale as Language)) {
    return dictionary[languages[0]];
  }
  return dictionary[locale as Language];
}
