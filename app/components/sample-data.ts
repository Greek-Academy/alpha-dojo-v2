// ユーザーデータの型定義
export type User = {
    id: string; // ユーザーID
    name: string; // ユーザー名
    link: string; // ユーザー情報へのリンク
    icon: string; // ユーザーアイコンのURL
  };
  
  // ユーザー情報のサンプルデータ
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
  
  // 提出物データの型定義
  export type Submission = {
    id: number; // 提出物のID 
    title: string; // 提出物のタイトル
    difficulty: 1 | 2 | 3; // 提出物の難易度（1: Easy, 2: Normal, 3: Hard）
    authorId: string; // 作成者のID
    published: string; // 提出物の公開日
    reviewerId: string; // レビュアーのID（レビュアーがいない場合は空）
    reviewed: string; // レビュー日（レビュアーがいない場合は空）
    status: '' | 'submitted' | 'reviewed'; // 提出物の状態
  };
  
  // 提出物のサンプルデータ
  export const submissions: Submission[] = [
    {
      id: 1,
      
      title: 'Sum of Digits',
      difficulty: 1,
      authorId: 'user-1',
      published: '2025-01-04T10:00:00',
      reviewerId: '',
      reviewed: '',
      status: 'submitted',
    },
    {
      id: 2,
      status: '',
      title: '最大公約数',
      difficulty: 1,
      authorId: 'user-3',
      published: '2025-01-05T10:00:00',
      reviewerId: '',
      reviewed: '',
    },
    {
      id: 3,
      status: 'reviewed',
      title: '最大の連続和',
      difficulty: 2,
      authorId: 'user-4',
      published: '2025-01-05T10:00:00',
      reviewerId: 'user-5',
      reviewed: '2025-01-06T15:00:00',
    },
    {
      id: 4,
      status: 'reviewed',
      title: 'Reverse String',
      difficulty: 1,
      authorId: 'user-1',
      published: '2025-01-06T10:00:00',
      reviewerId: 'user-6',
      reviewed: '2025-01-06T20:00:00',
    },
    {
      id: 5,
      status: 'submitted',
      title: 'N-クイーン問題',
      difficulty: 2,
      authorId: 'user-7',
      published: '2025-01-17T10:00:00',
      reviewerId: '',
      reviewed: '',
    },
    {
      id: 6,
      status: 'submitted',
      title: '最短経路問題（ダイクストラ法）',
      difficulty: 3,
      authorId: 'user-8',
      published: '2025-01-18T10:00:00',
      reviewerId: '',
      reviewed: '',
    },
    {
      id: 7,
      status: 'submitted',
      title: 'FizzBuzz',
      difficulty: 1,
      authorId: 'user-3',
      published: '2025-01-18T15:00:00',
      reviewerId: '',
      reviewed: '',
    },
    {
      id: 8,
      status: 'submitted',
      title: '動的計画法によるナップサック問題',
      difficulty: 3,
      authorId: 'user-4',
      published: '2025-01-25T10:00:00',
      reviewerId: '',
      reviewed: '',
    },
  ];
  