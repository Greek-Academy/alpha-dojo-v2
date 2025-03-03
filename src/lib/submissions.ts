import { users } from './users';

// 提出物情報
// 要確認: published(どういう状態をpublishedと定義する?),status(ブランクはどういう状態を表す？時系列は submitted→reviewed→published？)
export type Submission = {
  id: number; // 提出物のID
  title: string; // 提出物のタイトル
  difficulty: 1 | 2 | 3; // 提出物の難易度（1: Easy, 2: Normal, 3: Hard）
  authorId: string; // 作成者のID
  authorName: string; // 作成者の名前
  reviewerId: string; // レビュアーのID
  reviewerName: string; // レビュアーの名前
  submitted: string; // 提出日
  reviewed: string; // レビュー日
  published: string; // 公開日
  status: '' | 'submitted' | 'reviewed'; // 提出物の状態
};

export const submissions: Submission[] = [
  {
    id: 1,
    title: 'Sum of Digits',
    difficulty: 1,
    authorId: 'user-1',
    authorName: users['user-1'].name,
    reviewerId: '',
    reviewerName: '',
    submitted: '',
    reviewed: '',
    published: '2025-01-05T10:00:00',
    status: '',
  },
  {
    id: 2,
    title: '最大公約数',
    difficulty: 1,
    authorId: 'user-3',
    authorName: users['user-3'].name,
    reviewerId: '',
    reviewerName: '',
    submitted: '2025-01-05T10:00:00',
    reviewed: '',
    published: '2025-01-06T10:00:00',
    status: 'submitted',
  },
  {
    id: 3,
    title: '最大の連続和',
    difficulty: 2,
    authorId: 'user-4',
    authorName: users['user-4'].name,
    reviewerId: 'user-5',
    reviewerName: users['user-5'].name,
    submitted: '2025-01-05T10:00:00',
    reviewed: '2025-01-06T15:00:00',
    published: '2025-01-06T16:00:00',
    status: 'reviewed',
  },
  {
    id: 4,
    title: 'Reverse String',
    difficulty: 1,
    authorId: 'user-1',
    authorName: users['user-1'].name,
    reviewerId: 'user-6',
    reviewerName: users['user-6'].name,
    submitted: '2025-01-06T10:00:00',
    reviewed: '2025-01-06T20:00:00',
    published: '',
    status: 'reviewed',
  },
  {
    id: 5,
    title: 'N-クイーン問題',
    difficulty: 2,
    authorId: 'user-7',
    authorName: users['user-7'].name,
    reviewerId: '',
    reviewerName: '',
    submitted: '2025-01-17T10:00:00',
    reviewed: '',
    published: '',
    status: 'submitted',
  },
  {
    id: 6,
    title: '最短経路問題（ダイクストラ法）',
    difficulty: 3,
    authorId: 'user-8',
    authorName: users['user-8'].name,
    reviewerId: '',
    reviewerName: '',
    submitted: '2025-01-18T10:00:00',
    reviewed: '',
    published: '',
    status: 'submitted',
  },
  {
    id: 7,
    title: 'FizzBuzz',
    difficulty: 1,
    authorId: 'user-3',
    authorName: users['user-3'].name,
    reviewerId: '',
    reviewerName: '',
    submitted: '2025-01-18T15:00:00',
    reviewed: '',
    published: '',
    status: 'submitted',
  },
  {
    id: 8,
    title: '動的計画法によるナップサック問題',
    difficulty: 3,
    authorId: 'user-4',
    authorName: users['user-4'].name,
    reviewerId: '',
    reviewerName: '',
    submitted: '2025-01-25T10:00:00',
    reviewed: '',
    published: '',
    status: 'submitted',
  },
];
