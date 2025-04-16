import "./scss/mangacontent.scss";

const MangaContent = (props) => {
  const { data } = props;

  return (
    <div className="mangabox">
      <div className="imgbox">
        <img src={data?.coverpath} alt="" />
      </div>
      <div className="infoline"></div>
    </div>
  );
};

export default MangaContent;
