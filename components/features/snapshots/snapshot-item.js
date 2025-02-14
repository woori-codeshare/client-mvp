import { useState, useEffect, useCallback } from "react";
import { formatRelativeTime, truncateText } from "@/utils/formatters";

/**
 * 개별 스냅샷 항목을 표시하는 컴포넌트
 * @param {Object} props
 * @param {Object} props.snapshot - 스냅샷 데이터 객체 (제목, 설명, 타임스탬프 포함)
 * @param {boolean} props.isActive - 현재 선택된 스냅샷 여부
 * @param {Function} props.onClick - 스냅샷 클릭 시 실행될 핸들러 함수
 */
export default function SnapshotItem({ snapshot, isActive, onClick }) {
  // 포맷팅된 시간을 저장하는 상태
  const [formattedTime, setFormattedTime] = useState("");

  /**
   * 타임스탬프를 상대적 시간으로 포맷팅하는 함수
   * 스냅샷의 타임스탬프가 변경될 때마다 새로운 함수 생성 방지를 위해 useCallback 사용
   */
  const updateTime = useCallback(() => {
    if (!snapshot?.timestamp) return;
    setFormattedTime(formatRelativeTime(snapshot.timestamp));
  }, [snapshot?.timestamp]);

  /**
   * 컴포넌트 마운트 시 시간 포맷팅 시작
   * 30초마다 시간 표시 업데이트
   * 컴포넌트 언마운트 시 타이머 정리
   */
  useEffect(() => {
    updateTime();
    const timer = setInterval(updateTime, 30000); // 30초마다 업데이트
    return () => clearInterval(timer);
  }, [updateTime]);

  return (
    <div
      onClick={onClick}
      className={`
        p-2 rounded-lg cursor-pointer whitespace-nowrap
        ${
          isActive
            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
            : "hover:bg-gray-800 border border-transparent"
        }
      `}
    >
      {/* 스냅샷 제목 */}
      <div className="font-medium text-sm">{snapshot.title}</div>

      {/* 스냅샷 설명 (존재하는 경우에만 표시) */}
      {snapshot.description && (
        <div className="text-xs text-gray-400 mt-1 whitespace-normal">
          {truncateText(snapshot.description)}
        </div>
      )}

      {/* 상대적 시간 표시 (예: "5분 전") */}
      <div className="text-xs text-gray-500 mt-1">{formattedTime}</div>
    </div>
  );
}
