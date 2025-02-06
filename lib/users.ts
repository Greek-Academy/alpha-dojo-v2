// ユーザー情報
export type User = {
  id: string; // ユーザーID
  name: string; // ユーザー名
  link: string; // ユーザー情報へのリンク
  icon: string; // ユーザーアイコンのURL
};

export const users: Record<string, User> = {
  'user-1': { id: 'user-1', name: 'Suzuki', link: '', icon: '' },
  'user-2': { id: 'user-2', name: 'Aoki', link: '', icon: '' },
  'user-3': { id: 'user-3', name: 'Satou', link: '', icon: '' },
  'user-4': { id: 'user-4', name: 'Takahashi', link: '', icon: '' },
  'user-5': { id: 'user-5', name: 'Yamada', link: '', icon: '' },
  'user-6': { id: 'user-6', name: 'Satou', link: '', icon: '' },
  'user-7': { id: 'user-7', name: 'Itou', link: '', icon: '' },
  'user-8': { id: 'user-8', name: 'Tanaka', link: '', icon: '' },
};