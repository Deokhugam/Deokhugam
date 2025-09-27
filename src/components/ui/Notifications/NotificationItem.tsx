"use client";

import Image from "next/image";
import { Notification as NotificationType } from "@/api/notifications";

interface NotificationItemProps {
  notification: NotificationType;
  onNotificationClick: (notification: NotificationType) => void;
}

export default function NotificationItem({
  notification,
  onNotificationClick
}: NotificationItemProps) {
  const getNotificationIcon = (content: string) => {
    if (content.includes("좋아요") || content.includes("좋아")) {
      return "/images/icon/ic_heart_red.svg";
    } else if (content.includes("댓글")) {
      return "/images/icon/ic_comment.svg";
    } else if (content.includes("인기") || content.includes("상")) {
      return "/images/icon/ic_award.svg";
    }
    return "/images/icon/ic_heart_red.svg";
  };

  const getNotificationAlt = (content: string) => {
    if (content.includes("좋아요") || content.includes("좋아")) {
      return "좋아요";
    } else if (content.includes("댓글")) {
      return "댓글";
    } else if (content.includes("인기") || content.includes("상")) {
      return "인기 리뷰";
    }
    return "알림";
  };

  return (
    <div
      className={`p-[24px_12px] rounded-lg cursor-pointer transition-colors duration-200 ${
        notification.confirmed ? "border-t border-gray-100" : "bg-gray-50"
      }`}
      onClick={() => onNotificationClick(notification)}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-[10px]">
          <div className="w-8 h-8 bg-gray-100 rounded-[6px] flex items-center justify-center flex-shrink-0">
            <Image
              src={getNotificationIcon(notification.content)}
              alt={getNotificationAlt(notification.content)}
              width={20}
              height={20}
            />
          </div>

          <div className="flex flex-col gap-[8px]">
            <p className="text-body2 font-medium text-gray-800">
              {notification.content.split("\n")[0]}
            </p>
            <p className="text-body3 font-medium text-gray-500">
              {notification.content.includes("\n")
                ? notification.content.split("\n")[1]
                : notification.reviewTitle}
            </p>
          </div>
        </div>

        {!notification.confirmed && (
          <div className="w-[6px] h-[6px] bg-red-500 rounded-full flex-shrink-0 ml-[3px]"></div>
        )}
      </div>
    </div>
  );
}
