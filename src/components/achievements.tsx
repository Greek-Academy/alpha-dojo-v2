'use client'; // クライアントコンポーネントであることを指定

import React from 'react';
import { Doughnut } from 'react-chartjs-2'; // react-chartjs-2 を使った円グラフ
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';

// Chart.js の設定
ChartJS.register(ArcElement, Tooltip, Legend);

// データ型の定義
interface AchievementData {
    difficulty: number; // 難易度 (1: Easy, 2: Normal, 3: Hard)
    status: 'submitted' | 'reviewed' | ''; // 提出物の状態
}

export const Achievements: React.FC<{ data: AchievementData[] }> = ({ data }) => {
    // 各難易度ごとの提出物の数をカウント
    const easyCount = data.filter((item) => item.difficulty === 1 && (item.status === 'submitted' || item.status === 'reviewed')).length;
    const normalCount = data.filter((item) => item.difficulty === 2 && (item.status === 'submitted' || item.status === 'reviewed')).length;
    const hardCount = data.filter((item) => item.difficulty === 3 && (item.status === 'submitted' || item.status === 'reviewed')).length;

    const max_all = 50; // 全体の問題数（仮に50で設定）
    const max_easy = 10; // 全体の問題数（仮に50で設定）
    const max_normal = 10; // 全体の問題数（仮に50で設定）
    const max_hard = 10; // 全体の問題数（仮に50で設定）

    // 全体の進捗
    const totalCount = easyCount + normalCount + hardCount;
    const rest = max_all - totalCount;

    // 円グラフのデータ
    const dataForChart: ChartData<"doughnut", number[], string> = {

        labels: ['Easy', 'Normal', 'Hard'], // ラベル
        datasets: [
            {
                data: [easyCount, normalCount, hardCount, rest], // 各難易度の進捗度
                backgroundColor: ['#14baa7', '#f3b516', '#dd2a4e', '#b3b3b3'], // 各難易度の色
            },
        ],
    };

    return (
        // <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" height="300px">
        <div className='flex justify-between items-center w-full h-auto'>
            {/* 左側に円グラフを配置 */}
            {/* <div display="flex" justifyContent="center" alignItems="center" position="relative" width="50%" height="100%"> */}
            <div className='flex justify-center items-center relative w-1/3 h-full'>
                {/* 円グラフ */}
                <Doughnut
                    data={dataForChart}
                    width={300}
                    height={300}
                    options={{
                        responsive: true,
                        plugins: {
                            tooltip: {
                                enabled: false, // ツールチップを無効化
                            },
                            legend: {
                                display: false, // 凡例を表示しない
                            },
                        },
                        interaction: {
                            mode: 'nearest', // ホバー時に最も近いデータポイントに反応
                            intersect: false, // グラフエレメント上でホバーしなくても反応
                        },
                        animation: {
                            duration: 0, // アニメーションを無効化
                            easing: 'linear', // 線形のイージング（スムーズな動き）
                        },
                        cutout: '96%', // ドーナツを細くする
                        elements: {
                            arc: {
                                borderWidth: 0, // 枠線の幅を0にしてラベル間を詰める
                            },
                        },
                    }}
                />
                {/* 円の中心に進捗数と最大数を表示 */}
                <div className='absolute flex flex-col w-full h-full items-center justify-center'>
                    <p className='text-2xl'>{easyCount + normalCount + hardCount}</p>
                    <p className='text-md text-gray-500'>{max_all}</p>
                </div>
            </div>

            {/* 右側に進捗を示す文字を配置 */}
            <div className='flex flex-col items-start gap-2 w-3/5'>
                <div className='flex justify-between w-full'>
                    <p className='text-difficulty-easy'>Easy</p>
                    <p className='text-right'>
                        <span className='text-xl'>{easyCount}</span>
                        <span className='text-gray-500'> /{max_easy}</span>
                    </p>
                </div>
                <div className='flex justify-between w-full'>
                    <p className='text-difficulty-medium'>Normal</p>
                    <p className='text-right'>
                        <span className='text-xl'>{normalCount}</span>
                        <span className='text-gray-500'> /{max_normal}</span>
                    </p>
                </div>
                <div className='flex justify-between w-full'>
                    <p className='text-difficulty-hard'>Hard</p>
                    <p className='text-right'>
                        <span className='text-xl'>{hardCount}</span>
                        <span className='text-gray-500'> /{max_hard}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};
