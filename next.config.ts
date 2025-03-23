import { HOST } from '@/constants/paths';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // オンライン開発環境 (Project IDX 等) では、プレビューをする際に外部からアクセスするため、この設定が必要
  allowedDevOrigins: [HOST],
};

export default nextConfig;
