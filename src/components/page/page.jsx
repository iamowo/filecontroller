import { memo, useState } from 'react'
import './page.scss'

const Page = memo((props) => {
    const {nowpage, allpage, setNowpage} = props
    const [value, setValue] = useState('');
    const handleChange = (e) => {
        setValue(e.target.value.replace(/\D/g, ''));
    };

    const totop = () => {
        window.scrollTo(0, 0);
    }

    const topage = (page) => {
        const p = +page - 1
        if (p >= allpage) {
            alert('no')
            return
        }
        setNowpage(p)
        setValue('')
        totop()
    }

    return (
        <div className="pagte-box">
        <div className="pagepart">
            {
                nowpage > 0 &&
                <div className="onepage onepageb"
                    onClick={() => {
                        setNowpage(nowpage - 1)
                        totop()
                    }}
                >上一页</div>
            }
            {
                Array.from({ length: allpage }, (_, index) => (
                <div className={`onepage ${nowpage === index ? "active" : ""}`}
                    key={index}
                    onClick={() => {
                        setNowpage(index)
                        totop()
                    }}
                >{index + 1}</div>
                ))
            }
            {
                nowpage < allpage - 1 &&
                <div className="onepage onepageb"
                    onClick={() => {
                        setNowpage(nowpage + 1)
                        totop()
                    }}
                >下一页</div>
            }
        </div>
        <div className="pageinfo">
          <span>共{allpage}页，跳转至</span>
          <div className="changepage">
            <input
                 className='inpnum'
                value={value}
                onChange={handleChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        topage(value)
                    }
                }}
            />
          </div>
          <span>页</span>
        </div>
      </div>
    )
})

export default Page