import { useRef, useState, useEffect, memo } from "react";
import "./categorized.scss";
import { debounce } from "../../util/utils";
import { matchingTags } from "../../api/tag";
import { getOneType, addOneFolder } from "../../api/favoritesfloder";
import { useLocation } from "react-router-dom";
import { cateorizeOneFile } from "../../api/file";

const OneInput = memo((props) => {
  const {
    type,
    titleinpt,
    setTitleinp,
    introinp,
    setIntroinp,
    keywordlist,
    setKeywordList,
    keyinp,
    setKeyinp,
  } = props;
  const [matchingkey, setMatchingkey] = useState([]); // 搜索到的关键词

  const containerRef = useRef(),
    inputRef = useRef();

  // 搜索关键词
  const serarchkeyword = async (key) => {
    console.log(key);

    if (key.trim().length > 0) {
      const res = await matchingTags(key);
      if (res.length > 0) {
        setMatchingkey(res);
      } else {
        setMatchingkey([]);
      }
    } else {
      setMatchingkey([]);
    }
  };

  const debounceSearch = debounce(serarchkeyword, 500);

  const handleKeyword = async (e) => {
    const key = e.target.value;
    setKeyinp(key);
    debounceSearch(key);
  };

  // 点击容器聚焦输入框
  const handleContainerClick = () => {
    inputRef.current.focus();
  };

  // 添加标签
  const addTag = (tag) => {
    if (tag.trim() && !keywordlist.includes(tag.trim())) {
      const keywordlistNew = [...keywordlist, tag.trim()];
      setKeywordList(keywordlistNew);
      setKeyinp("");
    }
  };

  // 删除标签
  const removeTag = (index) => {
    const keywordlistNew = keywordlist.filter((_, i) => i !== index);
    setKeywordList(keywordlistNew);
  };

  // 回车输入
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && keyinp.trim()) {
      e.preventDefault();
      addTag(keyinp);
    } else if (e.key === "Backspace" && !keyinp && keywordlist.length > 0) {
      // 删除最后一个标签
      removeTag(keywordlist.length - 1);
    }
  };

  // 选择匹配关键词
  const selectKey = (k) => {
    addTag(k.tag);
    setMatchingkey([]);
  };

  return (
    <div>
      {type === 0 && (
        <div className="one-line1">
          <div className="tptext">标题</div>
          <input
            type="text"
            className="inp1"
            value={titleinpt}
            onChange={(e) => setTitleinp(e.target.value)}
          />
        </div>
      )}
      {type === 1 && (
        <div className="one-line1">
          <div className="tptext">简介</div>
          <textarea
            className="inp2"
            value={introinp}
            onChange={(e) => setIntroinp(e.target.value)}
          ></textarea>
        </div>
      )}
      {type === 2 && (
        <div
          className="one-line1"
          ref={containerRef}
          onClick={handleContainerClick}
        >
          <div className="tptext">标签</div>
          <div className="taginput-container">
            {keywordlist.length === 0 && keyinp.length === 0 && (
              <span className="tishi"
                style={{color: "#e3e5e7"}}
              >回车生成tag</span>
            )}
            {keywordlist.map((item, index) => (
              <div
                className="onekeyword"
                key={index}
                onClick={() => removeTag(index)}
              >
                <soan className="iconfont">&#xe66a;</soan>
                <span>{item}</span>
              </div>
            ))}
            <input
              type="text"
              className="inp3"
              ref={inputRef}
              value={keyinp}
              onKeyDown={handleKeyDown}
              onChange={handleKeyword}
            />
          </div>
          {matchingkey.length > 0 && (
            <div className="matchingkeybox">
              {matchingkey.map((item) => (
                <div
                  className="onematch"
                  key={item.id}
                  onClick={() => selectKey(item)}
                >
                  {item.tag}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

const CategorizedCom = (props) => {
  const { showtype, closeClassify, uptype } = props;
  const location = useLocation();

  const [next, setNext] = useState(0);

  const [keywordlist, setKeywordList] = useState([]), // 输入关键词列表
    [keyinp, setKeyinp] = useState("");

  const [titleinpt, setTitleinp] = useState(""),
    [introinp, setIntroinp] = useState("");

  const [favoriteindex, setFavoriteindex] = useState(-1),
    [favoritelist, setFavoritelist] = useState([]),
    [newFavTitle, setNewFavTitle] = useState("");

  useEffect(() => {
    const getData = async () => {
      // 0视频 1图片 2漫画 3音乐
      const res = await getOneType(uptype);
      console.log(res);
      setFavoritelist(res);
    };
    getData();
  }, []);

  const createNewFolder = async () => {
    if (newFavTitle.trim().length > 0 && newFavTitle.trim() !== "") {
      const data = {
        title: newFavTitle,
        type: 0,
      };
      const res = await addOneFolder(data);
      if (res) {
        setNewFavTitle("");
        const res2 = await getOneType(uptype);
        setFavoriteindex(res2.length - 1);
        setFavoritelist(res2);
      }
    } else {
      alert("title is empty");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && newFavTitle.trim()) {
      e.preventDefault();
      createNewFolder();
    }
  };

  // 分类一个
  const categorizeFnc = async () => {
    const data = {
      title: "1",
      filename: 123,
      intro: introinp,
      tags: keywordlist,
      type: uptype,
      ffid: 0,
      // 未分类的地址
      ucpath: "",
    };
    const res = await cateorizeOneFile(data);
    if (res) {
      console.log("收藏成功");
    }
  };
  return (
    <div>
      {next === 0 && (
        <div className="categorizedbox">
          <div className="topline">
            <span className="midtext">分类</span>
            <span className="iconfont" onClick={() => closeClassify()}>
              &#xe66a;
            </span>
          </div>
          {showtype === 0 && (
            <div className="tpye1">
              <OneInput
                type={0}
                titleinpt={titleinpt}
                setTitleinp={setTitleinp}
              />
              <OneInput
                type={1}
                introinp={introinp}
                setIntroinp={setIntroinp}
              />
              <OneInput
                type={2}
                keyinp={keyinp}
                setKeyinp={setKeyinp}
                keywordlist={keywordlist}
                setKeywordList={setKeywordList}
              />
            </div>
          )}
          <div className="btnline">
            <div className="btn" onClick={() => closeClassify()}>
              取消
            </div>
            <div className="btn okbtn" onClick={() => setNext(1)}>
              确定
            </div>
          </div>
        </div>
      )}
      {next === 1 && (
        <div className="categorizedbox">
          <div className="topline">
            <span className="midtext">添加收藏</span>
            <span
              className="iconfont"
              onClick={() => {
                setNewFavTitle("");
                setFavoriteindex(-1);
                setNext(0);
              }}
            >
              &#xe66a;
            </span>
          </div>
          <div className="collectbox">
            {newFavTitle.length > 0 && <div className="canntdo"></div>}
            {favoritelist.map((item, index) => (
              <div
                className={`oneline ${
                  favoriteindex === index ? "onelineactive" : ""
                }`}
                onClick={() => {
                  if (favoriteindex !== index) {
                    setFavoriteindex(index);
                  } else {
                    setFavoriteindex(-1);
                  }
                }}
              >
                <div className="leftsp">
                  <span>{item.title}</span>
                </div>
                <span className="rightnum">{item.nums}</span>
              </div>
            ))}
          </div>
          <div
            className={`addone ${
              newFavTitle.length > 0 ? "addone-active" : ""
            }`}
          >
            <input
              type="text"
              className="newone"
              value={newFavTitle}
              onChange={(e) => setNewFavTitle(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="createbtn" onClick={createNewFolder}>
              新建
            </div>
          </div>
          <div className="spacebox"></div>
          <div className="btnline">
            <div className="btn okbtn" onClick={categorizeFnc}>
              确定
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorizedCom;
