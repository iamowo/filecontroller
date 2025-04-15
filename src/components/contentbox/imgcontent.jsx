import { memo, useState, useEffect } from "react";
import "./scss/imgcontent.scss";
import ImgWatcher from "../imgWatcher/imgwatcher";
import CategorizedCom from "../categorized/categorizedCom";

const ImgContent = memo((props) => {
  const { data } = props;
  const [detailflag, setDetailflag] = useState(false);
  const [classifyflag, setClassifyflag] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();

      switch (key) {
        case "escape":
          break;
        // 全屏切换
        case "f":
          e.preventDefault();
          break;

        // 空格键播放/暂停
        case "e":
          e.preventDefault(); // 防止页面滚动
          if (classifyflag === false) {
            setClassifyflag(true);
          }
          break;
        default:
          break;
      }
    };

    // 添加事件监听，使用capture阶段捕获 注意第三个参数true
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeClassify = () => {
    setClassifyflag(false);
  };
  return (
    <div className="imgcontentcom">
      {classifyflag && (
        <CategorizedCom showtype={0} closeClassify={closeClassify} uptype={0} />
      )}
      {detailflag && (
        <ImgWatcher src={data.path} setDetailflag={setDetailflag} />
      )}
      <div className="imgbox">
        <img src={data.path} alt="" onClick={() => setDetailflag(true)} />
      </div>
    </div>
  );
});

export default ImgContent;
