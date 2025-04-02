import { memo } from "react";
import "./index.scss";
import { Link } from "react-router-dom";

const Menus = memo((props) => {
  const { menulist, setMenulist, menuindex, setMenuindex, addflag, suitflag } =
    props;
  console.log(props);

  return (
    <div className="menusbox">
      {addflag && (
        <div className="oneline">
          <div className="addvid">
            <span className="iocnfont">+</span>
            <span className="text">新增收藏夹</span>
          </div>
        </div>
      )}
      {menulist.map((item) => (
        <Link
          to={item.url}
          key={item.index}
          onClick={() => {
            // 设置 index
            setMenuindex(item.index);
            // 地址转化
          }}
        >
          <div
            className={
              menuindex === item.index ? "oneline oneline-active" : "oneline"
            }
          >
            <span className="text">{item.text}</span>
            {suitflag && <span className="iconfont">...</span>}
          </div>
        </Link>
      ))}
    </div>
  );
});

export default Menus;
