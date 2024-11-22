import Image from "next/image"
import Link from "next/link"
import Markdown from 'react-markdown'

// 要件が決まったら、ユーザー情報取得ライブラリを作成
function getUserInfo(userId: string) {
    return {
        name: "sumiredc",
        icon: "",
        link: "",
    }
}

interface NotificataionProps {
    userId:  string,
    content: string,
}

export const Notification = ({
    notifications
}: {
    notifications: NotificataionProps[]
}) => {
    return (
        <div className="flex flex-col gap-2 w-fit h-fit p-4 rounded-xl bg-slate-100 border-border border-2">
            <h1 className="text-xl font-medium">Notifications</h1>
            {
                notifications.map((notification) => {
                    const user = getUserInfo(notification.userId)
                    return (
                        <div className="flex gap-2 w-80 p-3 bg-slate-200">
                            {/* 実際に使う際には、信用する URL を next.config.ts に追加する必要がある */}
                            <Link
                                href={user.link}
                                className="relative"
                            >
                                <Image
                                    key={`user-${notification.userId}`}
                                    src={user.icon}
                                    width={24}
                                    height={24}
                                    fill
                                    alt={`${user.name} さん`}
                                />
                            </Link>
                            <Markdown>{notification.content}</Markdown>
                        </div>
                    )
                })
            }
        </div>
    )
}
