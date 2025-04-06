import "./index.scss";
import getUncategorizedVideo from "../../../api/file";
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
    [menuindex, setMenuindex] = useState(0); // 列表指针

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
        <Content 
          topstyle={1} 
          categorized = {false}
          menuindex={menuindex}
        />
      </div>
    </div>
  );
};

export default UnCategorized;
