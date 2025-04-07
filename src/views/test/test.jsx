import "./index.scss";
import React, { useState, useRef, useEffect } from "react";

const TagInput = ({ onTagsChange }) => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // 添加标签
  const addTag = (tag) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      const newTags = [...tags, tag.trim()];
      setTags(newTags);
      onTagsChange(newTags);
      setInputValue("");
    }
  };

  // 删除标签
  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onTagsChange(newTags);
  };

  // 处理键盘事件
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      // 删除最后一个标签
      removeTag(tags.length - 1);
    }
  };

  // 点击容器聚焦输入框
  const handleContainerClick = () => {
    inputRef.current.focus();
  };

  // 外部点击时也聚焦输入框
  // useEffect(() => {
  //   const handleOutsideClick = (e) => {
  //     if (containerRef.current && !containerRef.current.contains(e.target)) {
  //       inputRef.current.focus();
  //     }
  //   };

  //   document.addEventListener('click', handleOutsideClick);
  //   return () => {
  //     document.removeEventListener('click', handleOutsideClick);
  //   };
  // }, []);

  return (
    <div
      className="tag-input-container"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="tags-wrapper">
        {tags.map((tag, index) => (
          <div key={index} className="tag">
            {tag}
            <button
              className="tag-remove"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(index);
              }}
            >
              ×
            </button>
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          className="tag-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? "添加标签，按回车确认" : ""}
        />
      </div>
    </div>
  );
};

const Test = () => {
  const [tagchange, onTagsChange] = useState([]);
  return (
    <div className="viewtest">
      1231123
      <div className="box1">
        <TagInput onTagsChange={onTagsChange} />
      </div>
    </div>
  );
};

export default Test;
