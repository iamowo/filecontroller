import { memo } from "react";
import "./scss/imgcontent.scss";
import ImgWatcher from "../imgWatcher/imgwatcher";

const ImgContent = memo((props) => {
  const { data } = props;
  console.log(data);

  return (
    <div className="imgcontentcom">
      <ImgWatcher />
      <img src={data.path} alt="" />
    </div>
  );
});

export default ImgContent;
