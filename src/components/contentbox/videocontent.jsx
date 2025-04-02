import { memo } from "react";
import "./scss//videocontent.scss";

const VideoContent = memo((props) => {
  const { data } = props;
  return (
    <div className="videocontentcom">
      <div className="videopart">
        <img src={data.cover} alt="" className="videocover" />
        <div className="videoface">
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
