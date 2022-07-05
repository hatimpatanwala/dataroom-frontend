import React,{useEffect} from 'react'
import {Avatar, Image, Layout, Row} from "antd"
import { UserOutlined } from '@ant-design/icons';

import "./Header.css"
import { userInfo } from 'os';
const {Header:AntdHeader} =Layout
interface Iprops{
  userInfo:{
    email?:string,
    password?:string
  }
}
interface userinfo{
  userInfo:{
    email?:string,
    password?:string
  }
}
const Header = (props:any) => {
  const{userInfo} = props

  return (
    <AntdHeader>
        <div className='header-content'>
          <div className='company-details'>
            <img src={process.env.PUBLIC_URL+"assets/images/temp_logo.png"} height={50} width={60} />
           <div className='company-name'> 
           <span  >Data Room</span></div>

            </div>
             <div>
            <Row style={{padding:"6px",lineHeight:"20px"}}>
              <div className='user-info'>
                <div style={{textAlign:"center"}}>{userInfo.emailid}</div>
                <div style={{textAlign:"center"}}>{userInfo?.userDetails?.firstname} {userInfo.userDetails.lastname}</div>
                <div style={{textAlign:"center"}}>{userInfo?.userDetails?.position} </div>
                
               {/* <div style={{textAlign:"center"}}>{"Hatim Patanwala"}</div>  */}
              </div>
              <Avatar size={50} icon={<UserOutlined/>} />
            </Row>
              
            </div>
            
        </div>
    </AntdHeader>
  )
}

export default Header