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
import { Submission } from '@/lib/submissions';

ChartJS.register(ArcElement, Tooltip, Legend, Title, Filler);

// TODO: domain 確定時に修正する
interface AchievementData {
  difficulty: Submission['difficulty'];
  status: Submission['status'];
}

export const Achievements: React.FC<{ data: AchievementData[] }> = ({
  data,
}) => {
  type DifficultyNumber = Record<Submission['difficulty'], number>;
  // 進捗度
  const problemCount: DifficultyNumber = {
    1: 0,
    2: 0,
    3: 0,
  };
  const finishedProblemCount: DifficultyNumber = {
    1: 0,
    2: 0,
    3: 0,
  };
  data.forEach((problem) => {
    const difficulty = problem.difficulty as 1 | 2 | 3;
    problemCount[difficulty] += 1;
    if (problem.status === 'submitted' || problem.status === 'reviewed') {
      finishedProblemCount[difficulty] += 1;
    }
  });

  const maxAll = data.length;
  const totalCount = finishedProblemCount[1] + finishedProblemCount[2] + finishedProblemCount[3];
  const rest = maxAll - totalCount;

  // 円グラフのデータ
  const dataForChart: ChartData<'doughnut', number[], string> = {
    labels: ['Easy', 'Normal', 'Hard'],
    datasets: [
      {
        data: [finishedProblemCount[1], finishedProblemCount[2], finishedProblemCount[3], rest],
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
          <p className="text-3xl">{totalCount}</p>
          <p className="text-lg text-gray-500">{maxAll}</p>
        </div>
      </div>

      {/* 右側に進捗を示す文字を配置 */}
      <div className="flex flex-col items-start gap-2 w-3/5">
        <div className="flex justify-between w-full">
          <p className="text-lg text-difficulty-easy">Easy</p>
          <p className="text-right">
            <span className="text-xl">{finishedProblemCount[1]}</span>
            <span className="text-lg text-gray-500"> /{problemCount[1]}</span>
          </p>
        </div>
        <div className="flex justify-between w-full">
          <p className="text-lg text-difficulty-medium">Normal</p>
          <p className="text-right">
            <span className="text-xl">{finishedProblemCount[2]}</span>
            <span className="text-lg text-gray-500"> /{problemCount[2]}</span>
          </p>
        </div>
        <div className="flex justify-between w-full">
          <p className="text-lg text-difficulty-hard">Hard</p>
          <p className="text-right">
            <span className="text-xl">{finishedProblemCount[3]}</span>
            <span className="text-lg text-gray-500"> /{problemCount[3]}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
