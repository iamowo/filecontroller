import './index.scss'

const Menus = (props) => {
    const {menulist, setMenulist, menuindex, setMenuindex, addflag , suitflag} = props
    console.log(props);
    
    return (
        <div className="menusbox">
            {
            addflag &&
            <div className="oneline">
                <div className='addvid'>
                    <span className="iocnfont">+</span>
                    <span className="text">新增收藏夹</span>
                </div>
            </div>
            }
            {
                menulist.map(item =>
                    <div className={menuindex === item.index ? "oneline oneline-active" : "oneline"}
                        key={item.index}
                        onClick={() => setMenuindex(item.index)}
                    >
                        <span className="text">{item.text}</span>
                        {
                            suitflag &&
                            <span className="iconfont">...</span>
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Menus