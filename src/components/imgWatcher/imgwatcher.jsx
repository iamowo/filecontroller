import "./imgwatcher.scss";

const ImgWatcher = (props) => {
  const { src, setDetailflag } = props;

  return (
    <div className="imgwatcherview">
      <div className="imgclose" onClick={() => setDetailflag(false)}></div>
      <div className="watchbox">
        <img src={src} alt="" />
      </div>
      <div className="controlbox"></div>
    </div>
  );
};

export default ImgWatcher;
