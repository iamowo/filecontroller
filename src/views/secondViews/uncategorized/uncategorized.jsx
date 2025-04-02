import "./index.scss";
import getAllUncategorized from "../../../api/file";
import Menus from "../../../components/menus/menus";
import Content from "../../../components/content/content";
import { useEffect, useState } from "react";

const UnCategorized = () => {
  const menulist = [
      { index: 0, text: "视频", url: "/uncategorized/video" },
      { index: 1, text: "图片", url: "/uncategorized/img" },
      { index: 2, text: "漫画", url: "/uncategorized/manga" },
      { index: 3, text: "音乐", url: "/uncategorized/music" },
    ],
    [menuindex, setMenuindex] = useState(0);
  const [videolist, setVideolist] = useState([]),
    [imglist, setImglist] = useState([]),
    [musiclist, setMusiclist] = useState([]),
    [mangalist, setMangalist] = useState([]);
  const [datalist, setDatalist] = useState({
    flag: 0,
    list: [],
  });

  useEffect(() => {
    const getData = async () => {
      const res = await getAllUncategorized();
      console.log("未分类: ", res);

      setVideolist(res.videos);
      setMusiclist(res.musics);
      setImglist(res.imgs);
      setMangalist(res.mangas);
      setDatalist({
        ...datalist,
        flag: 0,
        list: res.videos,
      });
    };
    getData();
  }, []);

  useEffect(() => {
    if (menuindex === 0) {
      setDatalist({
        ...datalist,
        flag: 0,
        list: videolist,
      });
    } else if (menuindex === 1) {
      setDatalist({
        ...datalist,
        flag: 1,
        list: imglist,
      });
    } else if (menuindex === 2) {
      setDatalist({
        ...datalist,
        flag: 2,
        list: mangalist,
      });
    } else if (menuindex === 3) {
      setDatalist({
        ...datalist,
        flag: 3,
        list: musiclist,
      });
    }
  }, [menuindex]);
  return (
    <div className="unclassifyview">
      <div className="leffmenu">
        <Menus
          addflag={false}
          suitflag={false}
          menulist={menulist}
          setMenulist={null}
          menuindex={menuindex}
          setMenuindex={setMenuindex}
        />
      </div>
      <div className="rightcontent">
        <Content topstyle={1} datalist={datalist} />
      </div>
    </div>
  );
};

export default UnCategorized;
