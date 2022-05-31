import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ChangePassword from './ChangePassword/ChangePassword'
import UserDetails from './UserDetails/UserDetails'
import "./UserInfo.css"
interface IProps{
    updateUserInfo :()=>void
}
const UserInfo = (props:any) => {
  return (
    <div className='info-container' style={{backgroundImage:"url(/assets/images/login_bg1.png)"}}>
        <div className='form-wrapper'>
            <Routes>
                <Route path='/change-pass' element={<ChangePassword userInfo={props.userInfo}/>}/>
                <Route path='/user-details' element={<UserDetails updateUserDetails={props.updateUserDetails} userInfo={props.userInfo}/>}/>
                <Route path="/*" element={<Navigate to={"change-pass"}/>}/>

            </Routes>
        </div>
    </div>
  )
}

export default UserInfo