import { useEffect, useState } from "react";
import "./index.scss";
import VideoContent from "../contentbox/videocontent";
import ImgContent from "../contentbox/imgcontent";

const Content = (props) => {
  const { topstyle, datalist } = props;
  const [srotindex, setSortindex] = useState(0);
  useEffect(() => {
    if (datalist.flag !== 0) {
      console.log(datalist);
    }
  }, [datalist]);
  return (
    <div className="contentcomponent">
      {topstyle === 0 ? (
        <div className="contentinfos">
          <div className="imgbox"></div>
          <div></div>
          <div className="infobox">
            <div className="titleline"></div>
            <div className="introline"></div>
            <div className="controlline"></div>
          </div>
        </div>
      ) : (
        <div className="contentinfo2">
          <div className="titleline">
            {datalist?.flag === 0 && <span>视频</span>}
            {datalist?.flag === 1 && <span>图片</span>}
            {datalist?.flag === 2 && <span>漫画</span>}
            {datalist?.flag === 3 && <span>音乐</span>}
          </div>
          <div className="infoline">
            <span>{datalist?.list.length} 个未分类</span>
          </div>
        </div>
      )}
      <div className="content-conline">
        <div className="ccleft">
          <div className="sortbox">按照时间</div>
          <div className="sortbox">观看次数</div>
        </div>
        <div className="ccright">
          <input type="text" className="contentsearch" />
          <div className="iconbox">
            <span className="iconfont">?</span>
          </div>
        </div>
      </div>
      <div className="rea-content">
        {datalist?.flag === 0 && (
          <div className="viceocontentstyle">
            {datalist?.list.map((item) => (
              <VideoContent data={item} />
            ))}
          </div>
        )}
        {datalist?.flag === 1 && (
          <div className="imgcontentstyle">
            {datalist?.list.map((item) => (
              <ImgContent data={item} />
            ))}
          </div>
        )}
      </div>
      <div className="pagte-box">
        <div className="pagepart">
          <div className="onepage onepageb">上一页</div>
          <div className="onepage">1</div>
          <div className="onepage onepageb">下一页</div>
        </div>
        <div className="pageinfo">
          <span>共100页，跳转至</span>
          <div className="changepage"></div>
          <span>页</span>
        </div>
      </div>
    </div>
  );
};

export default Content;
