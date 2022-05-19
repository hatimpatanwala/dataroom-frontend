import React from 'react'
import {Layout} from "antd"
import "./Header.css"
const {Header:AntdHeader} =Layout

const Header = () => {
  return (
    <AntdHeader>
        <div className='header-content'><span>Data Room</span></div>
    </AntdHeader>
  )
}

export default Header