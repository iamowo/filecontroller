import { useEffect, useState } from "react";
import "./home.scss";
import { Link, Outlet } from "react-router-dom";

const Home = () => {
  const toplist = [
    { index: 0, text: "主页", icon: "/", url: "/main" },
    { index: 1, text: "视频", icon: "/", url: "/videos" },
    { index: 2, text: "漫画", icon: "/", url: "/mangas" },
    { index: 3, text: "图片", icon: "/", url: "/imgs" },
    { index: 4, text: "音乐", icon: "/", url: "/musics" },
    { index: 5, text: "设置", icon: "/", url: "/setting" },
  ];
  const [activeindex, setActiveindex] = useState(0);

  useEffect(() => {
    document.title = "FC";
  }, []);
  return (
    <div className="homeview">
      <div className="topimgbox"></div>
      <div className="wallpercontent">
        <div className="contentbox">
          <div className="topline">
            <div className="topleft">
              {toplist.map((item) => (
                <Link
                  key={item.index}
                  to={item.url}
                  onClick={() => setActiveindex(item.index)}
                >
                  <div
                    className={
                      activeindex === item.index
                        ? "topbox topbox-active"
                        : "topbox"
                    }
                  >
                    <div className="lefticonbox iconfont">{item.icon}</div>
                    <div className="rightcontent">{item.text}</div>
                  </div>
                </Link>
              ))}
              <div className="topsearch">
                <div className="searchbox">
                  <input type="text" className="inpbox" />
                  <div className="iconbox">
                    <span className="iconfont">?</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="topright">
              <Link
                to={"/uncategorized/video"}
                onClick={() => setActiveindex(-1)}
              >
                <div
                  className={
                    activeindex === -1
                      ? "toprightbox toprightbox-active"
                      : "toprightbox"
                  }
                >
                  <span className="icon">1</span>
                  <span className="text">未分类</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="contentbox">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
