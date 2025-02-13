import { useState, useEffect, useCallback } from "react";
import {
  FaRegClock,
  FaUserCircle,
  FaReply,
  FaPaperPlane,
} from "react-icons/fa";
import { formatRelativeTime } from "@/utils/formatters";

/**
 * 질문/답변 메시지 아이템 컴포넌트
 * @param {Object} message - 메시지 데이터 객체
 * @param {boolean} isReply - 답글 여부
 * @param {Function} onReply - 답글 작성 시 호출되는 함수
 * @param {Object} replyingTo - 현재 답글 작성 중인 메시지 정보
 * @param {Function} handleSubmit - 답글 제출 시 호출되는 함수
 */
export default function MessageItem({
  message,
  isReply = false,
  onReply,
  replyingTo,
  handleSubmit,
}) {
  // 상대적 시간 표시를 위한 상태
  const [formattedTime, setFormattedTime] = useState("");

  // 시간 업데이트 로직
  const updateTime = useCallback(() => {
    if (!message?.timestamp) return;
    setFormattedTime(formatRelativeTime(message.timestamp));
  }, [message?.timestamp]);

  // 30초마다 시간 업데이트
  useEffect(() => {
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, [updateTime]);

  return (
    // 메시지 컨테이너 (답글일 경우 왼쪽 패딩 추가)
    <div className={`flex gap-3 items-start ${isReply ? "pl-8" : ""}`}>
      {/* 사용자 아바타 */}
      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 text-gray-400">
        <FaUserCircle size={32} />
      </div>

      {/* 메시지 내용 영역 */}
      <div className="flex-1">
        {/* 메시지 텍스트 박스 (강사일 경우 파란색 배경) */}
        <div
          className={`p-4 rounded-lg border ${
            message.user.isInstructor
              ? "bg-blue-500/10 border-blue-500/20"
              : "bg-gray-700/30 border-gray-700/50"
          }`}
        >
          <p className="text-sm">{message.text}</p>
        </div>

        {/* 메시지 메타 정보 (시간, 강사 표시, 답글 버튼) */}
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
          <FaRegClock size={10} />
          <span>{formattedTime}</span>
          {message.user.isInstructor && (
            <span className="text-blue-400">Instructor</span>
          )}
          {!isReply && (
            <button
              onClick={() => onReply(message.id)}
              className="ml-2 text-gray-400 hover:text-blue-400 flex items-center gap-1"
            >
              <FaReply size={10} />
              <span>Reply</span>
            </button>
          )}
        </div>

        {/* 답글 작성 폼 (답글 작성 중일 때만 표시) */}
        {replyingTo?.id === message.id && (
          <form
            onSubmit={(e) => handleSubmit(e, message.id)}
            className="mt-2 flex gap-2"
          >
            <input
              type="text"
              value={replyingTo.text}
              onChange={(e) =>
                onReply({ id: message.id, text: e.target.value })
              }
              placeholder="Write a reply..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
              autoFocus
            />
            <button
              type="submit"
              className="p-2 text-blue-400 hover:text-blue-300 disabled:text-gray-600"
              disabled={!replyingTo.text?.trim()}
            >
              <FaPaperPlane size={16} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
