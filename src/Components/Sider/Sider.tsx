import React, { useEffect, useState } from 'react'
import {Layout} from "antd"
import {Menu} from"antd"
import {Button} from "antd"
import "./Sider.css"
import {Link, useNavigate,useLocation} from "react-router-dom"

const {Sider:AntdSider} = Layout
const Sider = (props:any) => {
  const [current,setCurrent]=useState<string>("/files")
  let location = useLocation()
  let history = useNavigate()
    const newRequest = (evt:React.MouseEvent<HTMLButtonElement>)=>{
//   const button :HTMLButtonElement = evt?.currentTarget
evt.currentTarget.blur()
history("new-request")

    }
    useEffect(()=>{})
  return (
    <AntdSider>
        <Menu  defaultSelectedKeys={[location.pathname]} style={{borderRight:"none",padding:"5px"}}>
            <Menu.Item key={"/new-request"} className="new-request-menu"><Button onClick={newRequest} size='large' className="new-request-btn" >New Request</Button></Menu.Item>
            <Menu.Item key={"/pending-request"}><Link to={"pending-request"} >My request</Link></Menu.Item>
            <Menu.Item key={"/files"}><Link to={"files"}>Files </Link></Menu.Item>
        </Menu>
    </AntdSider>
  )
}

export default Sider