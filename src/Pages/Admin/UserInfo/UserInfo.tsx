import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ChangePassword from './ChangePassword/ChangePassword'
import "./UserInfo.css"
interface IProps{
    updateUserInfo :()=>void
}
const UserInfo = (props:any) => {
  return (
    <div className='info-container' style={{backgroundImage:"url(/assets/images/login_bg1.png)"}}>
        <div className='form-wrapper'>
            <Routes>
                <Route path='/change-pass' element={<ChangePassword/>}/>
            </Routes>
        </div>
    </div>
  )
}

export default UserInfo