import { useState } from 'react'
import './categorized.scss'

const CategorizedCom = (props) => {
    const { showtype, closeClassify } = props
    const [keywordlist, setKeywordList] = useState([])
    const [titleinpt, setTitleinp] = useState(""),
          [introinp, setIntroinp] = useState(""),
          [keyinp, setKeyinp] = useState("")
    
    const handleKeyDown = (e) => {        
        if (e.key === 'Enter' && keyinp.trim()) {
            setKeywordList([...keywordlist, keyinp])
            setKeyinp('');
        } else if (e.key.toLowerCase() === 'backspace') {
            // 输入框为空的时候， 删除最后一个
            setKeywordList(keywordlist.slice(0, -1))
        }
    }

    const deleteOne = (ind) => {
        setKeywordList(keywordlist.filter((_, index) => index !== ind))
    }
    return (
        <div className="categorizedbox">
            <div className="topline">
                <span className="midtext">分类</span>
                <span className="iconfont"
                    onClick={() => closeClassify()}
                >&#xe66a;</span>
            </div>
            {
                showtype === 0 &&
                <div className="tpye1">
                    <div className="one-line1">
                        <div className="tptext">标题</div>
                        <input type="text" className="inp1" />
                    </div>
                    <div className="one-line1">
                        <div className="tptext">简介</div>
                        <textarea className='inp2'></textarea>
                    </div>
                    <div className="one-line1">
                        <div className="tptext">标签</div>
                        <div className="showlist">
                            {
                                keywordlist.map((item, index) =>
                                    <div className="onekeyword"
                                        key={index}
                                    >
                                        <soan className="iconfont"
                                            onClick={() => deleteOne(index)}
                                        >&#xe640;</soan>
                                        <span>{item}</span>
                                    </div>
                                )
                            }
                        </div>
                        <input type="text" className="inp1" 
                            value={keyinp}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => {
                                setKeyinp(e.target.value)
                            }}
                        />
                    </div>
                    <div className="btnline">
                        <div className="btn"
                            onClick={() => closeClassify()}
                        >取消</div>
                        <div className="btn okbtn">确定</div>
                    </div>
                </div>
            }
        </div>
    )
}

export default CategorizedCom