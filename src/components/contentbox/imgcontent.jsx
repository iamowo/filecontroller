import { memo } from "react";
import "./scss/imgcontent.scss";

const ImgContent = memo((props) => {
  const { data } = props;
  console.log(data);

  return (
    <div className="imgcontentcom">
      <img src={data.path} alt="" />
    </div>
  );
});

export default ImgContent;
