import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes,useNavigate } from 'react-router-dom'
import SuperAdminLogin from './Login/SuperAdminLogin'
import { userLoginInfo } from '../../Models/Models'
import { Register } from './Register/Register'
import { Layout } from 'antd'
 
const SuperAdmin = () => {
    const [userInfo,setUserInfo] =useState<null|userLoginInfo>(null)
    const history =useNavigate()
    useEffect(()=>{
        const Info=window.localStorage.getItem("superAdminUser")
        if(Info){
            setUserInfo(JSON.parse(Info))
        } 
          },[])
    const updateUserInfo = (values:userLoginInfo)=>{
        values.token = "Bearer "+ values.token
        setUserInfo(values)
        window.localStorage.setItem("superAdminUser",JSON.stringify(values))
        history("/superadmin/register")
    }

  return (
  <Layout >
      <Routes>
  {
         !userInfo &&
         <>
         <Route path="/login" element={<SuperAdminLogin updateUserInfo={updateUserInfo}/>}/>
         <Route path ="/*" element={<Navigate to={"login"}/>}/>
         </>
      }
      {userInfo &&
       <>
       <Route path='register/*' element={<Register userInfo={userInfo}/>}/>
       <Route path ="/*" element={<Navigate to={"register"}/>}/>
      </>
      }
 
   </Routes>
   </Layout>
  )
}

export default SuperAdmin