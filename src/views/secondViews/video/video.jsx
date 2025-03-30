import './index.scss'
import Menus from '../../../components/menus/menus';
import Content from '../../../components/content/content';
import { useState } from 'react';

const VideoView = () => {

    const [menulist, setMenulist] = useState([
        {index: 0, text: 'one'},
        {index: 1, text: 'two'},
        {index: 2, text: 'three'},
        {index: 3, text: 'one'}
    ]),
        [menuindex, setMenuindex] = useState(0)
    return (
        <div className="videoview">
            <div className="leffmenu">
                <Menus
                    addflag = {true}
                    suitflag = {true}
                    menulist = {menulist}
                    setMenulist = {setMenulist}
                    menuindex = {menuindex}
                    setMenuindex = {setMenuindex}
                />
            </div>
            <div className="rightcontent">
                <Content
                    topstyle = {0}
                />
            </div>
        </div>
    )
}

export default VideoView;