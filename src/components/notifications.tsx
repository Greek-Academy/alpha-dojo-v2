import Link from 'next/link';
import { AccountCircleIcon } from '@/components/ui/icons';
import { Submission } from '../../lib/submissions';
import { User } from '../../lib/users';

export const Notifications = ({
    submissions,
    users,
}: {
    submissions: Submission[];
    users: Record<string, User>;
}) => {
    // 'reviewed' ステータスの通知データを作成し、reviewed日時の降順で並べ替え
    const notifications = submissions
        .filter((item) => item.status === 'reviewed')
        .map((item) => ({
            userId: item.reviewerId, // レビュアーID
            submissionId: item.id, // 提出物ID
            reviewed: item.reviewed, // レビュー日時
        }))
        .sort((a, b) => new Date(b.reviewed).getTime() - new Date(a.reviewed).getTime());

    return (
        <div className="flex flex-col gap-3">
            {notifications.map((notification) => {
                const reviewer = users[notification.userId]; // reviewerの情報を取得
                const submission = submissions.find((item) => item.id === notification.submissionId); // 提出物の情報を取得

                if (!reviewer || !submission) {
                    return (
                        <div key={notification.submissionId} className="flex gap-2 w-100 p-3 bg-gray-300 text-lg">
                            <div>エラー: 不正な通知データ</div>
                        </div>
                    );
                }

                return (
                    <div key={notification.submissionId} className="flex gap-2 w-100 p-3 bg-gray-100 text-base">
                        {/* user.iconがない場合、UserIconを表示 */}
                        {reviewer.icon ? (
                            <Link href={reviewer.link} className="relative">
                                <img src={reviewer.icon} width={30} height={30} alt={`${reviewer.name} さん`} />
                            </Link>
                        ) : (
                            <div className="relative">
                                <AccountCircleIcon size={30} className="text-gray-500" />
                            </div>
                        )}
                        <div>
                            <p>
                                <span className="text-blue-800 underline mr-1">{reviewer.name}</span>
                                さんが{' '}
                                <Link href={`/submission/${notification.submissionId}`} className="text-blue-800 underline mr-1">
                                    {submission.title}
                                </Link>
                                {' '}をレビューしました
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
