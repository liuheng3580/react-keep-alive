import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Button } from 'antd'


const Home = () => {
    const [text, setText] = useState('我是主页')
    const handleUpdateText = useCallback(() => {
        setText(text + 'ha')
    }, [text])
    return (
        <div>
            {text}
            <Button onClick={handleUpdateText}>修改</Button>
        </div>
    )
}

export default Home