import { useState } from 'react'
import './index.scss'

const Content = (props) => {
    const {topstyle} = props
    const [srotindex, setSortindex] = useState(0)

    return (
        <div className="contentcomponent">
            {
                topstyle === 0 ?
                <div className="contentinfos">
                    <div className="imgbox"></div>
                        <div></div>
                    <div className="infobox">
                        <div className="titleline"></div>
                        <div className="introline"></div>
                        <div className="controlline"></div>
                    </div>
                </div>
                :
                <div className="contentinfo2">
                    <div className="titleline">123</div>
                    <div className="infoline">
                        <span>321个</span>
                    </div>
                </div>
            }
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
                123
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
    )
}

export default Content