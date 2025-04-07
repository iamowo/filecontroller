// Notice.tsx
import React, { useState, useEffect } from "react";
import "./Notice.css";

export type NoticeType = "info" | "success" | "warning" | "error";

interface NoticeProps {
  content: React.ReactNode;
  duration?: number;
  type?: NoticeType;
  onClose?: () => void;
}

const Notice: React.FC<NoticeProps> = ({
  content,
  duration = 3000,
  type = "info",
  onClose,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 进场动画
    setVisible(true);

    // 设置自动关闭定时器
    const timer = setTimeout(() => {
      setVisible(false);
      // 留出动画时间
      setTimeout(() => {
        onClose?.();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`notice ${type} ${visible ? "notice-enter" : "notice-leave"}`}
    >
      <div className="notice-content">{content}</div>
    </div>
  );
};

export default Notice;
