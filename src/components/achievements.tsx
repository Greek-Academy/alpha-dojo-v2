'use client';

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ChartData,
  Tooltip,
  ArcElement,
  Filler,
  Legend,
  Title,
} from 'chart.js/auto';

ChartJS.register(ArcElement, Tooltip, Legend, Title, Filler);

interface AchievementData {
  difficulty: number; // 難易度 (1: Easy, 2: Normal, 3: Hard)
  status: 'submitted' | 'reviewed' | '';
}

export const Achievements: React.FC<{ data: AchievementData[] }> = ({
  data,
}) => {
  // 進捗度
  const easyCount = data.filter(
    (item) =>
      item.difficulty === 1 &&
      (item.status === 'submitted' || item.status === 'reviewed')
  ).length;
  const normalCount = data.filter(
    (item) =>
      item.difficulty === 2 &&
      (item.status === 'submitted' || item.status === 'reviewed')
  ).length;
  const hardCount = data.filter(
    (item) =>
      item.difficulty === 3 &&
      (item.status === 'submitted' || item.status === 'reviewed')
  ).length;

  const max_easy = data.filter((item) => item.difficulty === 1).length;
  const max_normal = data.filter((item) => item.difficulty === 2).length;
  const max_hard = data.filter((item) => item.difficulty === 3).length;

  const max_all = data.length;
  const totalCount = easyCount + normalCount + hardCount;
  const rest = max_all - totalCount;

  // 円グラフのデータ
  const dataForChart: ChartData<'doughnut', number[], string> = {
    labels: ['Easy', 'Normal', 'Hard'],
    datasets: [
      {
        data: [easyCount, normalCount, hardCount, rest],
        backgroundColor: ['#14baa7', '#f3b516', '#dd2a4e', '#b3b3b3'], // 緑、黄、赤、灰色
      },
    ],
  };

  return (
    <div className="flex justify-between items-center w-full h-auto">
      <div className="flex justify-center items-center relative w-1/3 h-full">
        {/* 円グラフ */}
        <Doughnut
          data={dataForChart}
          style={{ width: '100%', height: '100%' }}
          options={{
            responsive: true,
            plugins: {
              tooltip: {
                enabled: false,
              },
              legend: {
                display: false,
              },
            },
            interaction: {
              mode: 'nearest',
              intersect: false,
            },
            animation: {
              duration: 0,
              easing: 'linear',
            },
            cutout: '96%',
            elements: {
              arc: {
                borderWidth: 0,
              },
            },
          }}
        />
        {/* 円の中心に進捗数と最大数を表示 */}
        <div className="absolute flex flex-col w-full h-full items-center justify-center">
          <p className="text-3xl">{easyCount + normalCount + hardCount}</p>
          <p className="text-lg text-gray-500">{max_all}</p>
        </div>
      </div>

      {/* 右側に進捗を示す文字を配置 */}
      <div className="flex flex-col items-start gap-2 w-3/5">
        <div className="flex justify-between w-full">
          <p className="text-lg text-difficulty-easy">Easy</p>
          <p className="text-right">
            <span className="text-xl">{easyCount}</span>
            <span className="text-lg text-gray-500"> /{max_easy}</span>
          </p>
        </div>
        <div className="flex justify-between w-full">
          <p className="text-lg text-difficulty-medium">Normal</p>
          <p className="text-right">
            <span className="text-xl">{normalCount}</span>
            <span className="text-lg text-gray-500"> /{max_normal}</span>
          </p>
        </div>
        <div className="flex justify-between w-full">
          <p className="text-lg text-difficulty-hard">Hard</p>
          <p className="text-right">
            <span className="text-xl">{hardCount}</span>
            <span className="text-lg text-gray-500"> /{max_hard}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
