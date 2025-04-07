// NoticeContainer.tsx
import React, { useState } from "react";
import Notice, { NoticeType } from "./Notice";

interface NoticeItem {
  id: number;
  content: React.ReactNode;
  duration: number;
  type: NoticeType;
}

let idCounter = 0;

const NoticeContainer: React.FC = () => {
  const [notices, setNotices] = useState<NoticeItem[]>([]);

  const addNotice = (
    content: React.ReactNode,
    duration: number = 3000,
    type: NoticeType = "info"
  ) => {
    const id = idCounter++;
    setNotices((prev) => [...prev, { id, content, duration, type }]);
    return id;
  };

  const removeNotice = (id: number) => {
    setNotices((prev) => prev.filter((notice) => notice.id !== id));
  };

  // 暴露API给外部使用
  React.useEffect(() => {
    (window as any).notice = {
      info: (content: React.ReactNode, duration?: number) =>
        addNotice(content, duration, "info"),
      success: (content: React.ReactNode, duration?: number) =>
        addNotice(content, duration, "success"),
      warning: (content: React.ReactNode, duration?: number) =>
        addNotice(content, duration, "warning"),
      error: (content: React.ReactNode, duration?: number) =>
        addNotice(content, duration, "error"),
      async: async (
        promise: Promise<any>,
        {
          loading,
          success,
          error,
          duration = 3000,
        }: {
          loading?: React.ReactNode;
          success?: React.ReactNode;
          error?: React.ReactNode;
          duration?: number;
        }
      ) => {
        let id: number | null = null;
        if (loading) {
          id = addNotice(loading, duration, "info");
        }

        try {
          const result = await promise;
          if (id !== null) removeNotice(id);
          if (success) {
            addNotice(
              typeof success === "function" ? success(result) : success,
              duration,
              "success"
            );
          }
          return result;
        } catch (err) {
          if (id !== null) removeNotice(id);
          if (error) {
            addNotice(
              typeof error === "function" ? error(err) : error,
              duration,
              "error"
            );
          }
          throw err;
        }
      },
    };
  }, []);

  return (
    <div className="notice-container">
      {notices.map((notice) => (
        <Notice
          key={notice.id}
          content={notice.content}
          duration={notice.duration}
          type={notice.type}
          onClose={() => removeNotice(notice.id)}
        />
      ))}
    </div>
  );
};

export default NoticeContainer;
