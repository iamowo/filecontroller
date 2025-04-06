import { memo, useState } from "react";
import "./scss//videocontent.scss";

import VideoPlayer from "../videoplayer/videoplayer";

const VideoContent = memo((props) => {
  const { data } = props;
  const [src, setSrc] = useState() // 资源路径
  const [showflag, setShowflag] = useState(false)

  // 关闭详情页面
  const closeDetail = () => {
    setShowflag(false)
    setSrc("")
  }
  return (
    <div className="videocontentcom">
      {
        showflag &&
        <VideoPlayer 
          src = {src}
          closeDetail = {closeDetail}
          filename = {data.filename}
        />
      }
      <div className="videopart">
        <div className="bgbox">
          <img src={data.cover} alt="" className="videocover" />
        </div>
        <div className="videoface"
          onClick={() => {
            setShowflag(true)
            setSrc(data.path)
          }}
        >
          <div className="info-line">
            <span>{data.duration}</span>
          </div>
        </div>
      </div>
      <div className="infopart">
        <div className="title-line">{data.filename}</div>
        <div className="timeline">{data.time}</div>
      </div>
    </div>
  );
});

export default VideoContent;
