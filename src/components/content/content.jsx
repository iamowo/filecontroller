import { useEffect, useState } from "react";
import "./index.scss";
import {
  getLength,
  getUncategorizedVideo,
  getUncategorizedImg,
  getUncategorizedManga,
  getUncategorizedMusic,
} from "../../api/file";
import VideoContent from "../contentbox/videocontent";
import ImgContent from "../contentbox/imgcontent";
import Page from "../page/page";

const Content = (props) => {
  const { topstyle, menuindex, categorized } = props;
  const [datalist, setDatalist] = useState([]),
    [nums, setNums] = useState(0), // 一共未分类个数
    [nowpage, setNowpage] = useState(0), // 当前页数
    [allpage, setAllpage] = useState([]), // 页数
    pagenum = 40; // 一页个数
  const [srotindex, setSortindex] = useState(0);

  useEffect(() => {
    console.log("1111");

    const getData = async () => {
      if (categorized) {
        // 已经分类
      } else {
        // 未分类
        console.log(menuindex, nowpage);
        if (menuindex === 0) {
          const res = await Promise.all([
            getUncategorizedVideo(nowpage, pagenum),
            getLength("video"),
          ]);
          setDatalist(res[0]);
          setNums(res[1]);
          // let arr = []
          // for (let i = 0; i < Math.ceil(res[1] / pagenum); i++) {
          //   arr.push(i)
          // }
          // setPagelist(arr)
          setAllpage(Math.ceil(res[1] / pagenum));
        } else if (menuindex === 1) {
          const res = await Promise.all([
            getUncategorizedImg(0, 50),
            getLength("video"),
          ]);
          setDatalist(res[0]);
          setNums(res[1]);
        } else if (menuindex === 2) {
          const res = await getUncategorizedManga(0, 50);
          setDatalist(res);
        } else if (menuindex === 3) {
          const res = await getUncategorizedMusic(0, 50);
          setDatalist(res);
        }
      }
    };
    getData();
  }, [menuindex, nowpage]);

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
            {menuindex === 0 && <span>视频</span>}
            {menuindex === 1 && <span>图片</span>}
            {menuindex === 2 && <span>漫画</span>}
            {menuindex === 3 && <span>音乐</span>}
          </div>
          <div className="infoline">
            <span>{nums} 个未分类</span>
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
        {menuindex === 0 && (
          <div className="viceocontentstyle">
            {datalist?.map((item) => (
              <VideoContent key={item.id} data={item} />
            ))}
          </div>
        )}
        {menuindex === 1 && (
          <div className="imgcontentstyle">
            {datalist?.map((item) => (
              <ImgContent data={item} />
            ))}
          </div>
        )}
      </div>
      <Page allpage={allpage} nowpage={nowpage} setNowpage={setNowpage} />
    </div>
  );
};

export default Content;
