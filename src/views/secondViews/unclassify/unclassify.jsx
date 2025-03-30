import './index.scss'

import Menus from '../../../components/menus/menus'
import Content from '../../../components/content/content'
import { useState } from 'react'

const UnClassify = () => {
    const menulist = [
        {index: 0, text: '视频'},
        {index: 1, text: '图片'},
        {index: 2, text: '漫画'},
        {index: 3, text: '音乐'}
    ],
        [menuindex, setMenuindex] = useState(0)
    return (
        <div className="unclassifyview">
            <div className="leffmenu">
                <Menus
                    addflag = {false}
                    suitflag = {false}
                    menulist = {menulist}
                    setMenulist = {null}
                    menuindex = {menuindex}
                    setMenuindex = {setMenuindex}
                />
            </div>
            <div className="rightcontent">
                <Content 
                    topstyle = {1}
                />
            </div>
        </div>
    )
}

export default UnClassify