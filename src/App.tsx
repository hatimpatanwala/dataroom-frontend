import { Divider, Layout,Spin } from 'antd';
import { useEffect } from 'react';
import { Navigate, Route, Routes,useLocation,useParams } from 'react-router-dom';
import './App.css';
import Breadcrumb from './Components/Breadcrumb/Breadcrumb';
import Header from './Components/Header/Header';
import Sider from './Components/Sider/Sider';
import PrimaryRoutes from "./Routes/PrimaryRoutes"
import {useState} from "react"
import InfoPanel from './Components/InfoPanel/InfoPanel';
import Login from './Pages/Admin/Login/Login';
import axios from 'axios';
import { userDetails, userLoginInfo } from './Models/Models';
import UserInfo from './Pages/Admin/UserInfo/UserInfo';
import Users from './Pages/Users/Users';


const {  Footer, Content } = Layout;


type userinfoupdate=(value:userLoginInfo)=>void
function App(props:any) {
  
  const [rightSider,setRightSider] =useState<boolean>(false)
  const [infoPanelIcon,setInfoPanelIcon] = useState<boolean>(false)
  const [userInfo,setUserInfo]=useState<userLoginInfo|null>(null)
  const [isLoading,setIsLoading ]=useState<boolean>(true)
let location = useLocation()
// const{id} =useParams()
// useEffect(()=>{
//  const user= window.localStorage.getItem("user")
//   if(user){
//     setUserInfo(JSON.parse(user))
//   }
// },[])
useEffect(()=>{
// console.log(location.pathname)
// console.log(id)
if(location.pathname === "/new-request"){
  // console.log("checking info panel")
  setRightSider(false)
  setInfoPanelIcon(false)
}
else{
setInfoPanelIcon(true)
}
const user = window.localStorage.getItem("user")
console.log(user)
if(user){
  const Info = JSON.parse(user)
axios.post(`${process.env.REACT_APP_SERVER_URL}/api/V1/admin/login`,{},{headers:{
  Authorization:Info.token
}}).then(res=>{
  console.log(res)
  if(res.status===200 && res.data.success ){

    setUserInfo(Info)
  }
  else{
    window.localStorage.removeItem("user")
  
  }
}).catch((err)=>{
  window.localStorage.removeItem("user")
  console.log(err)
})
}

setIsLoading(false)
},[])
// useEffect(()=>{
//   if(userInfo){
//     if(!userInfo.userDetails){
//       axios.post(`http://localhost:5000/api/V1/admin/userinfo?uid=${userInfo.user}`,{headers:{
//         Authorization:userInfo.token
//       }}).then((res)=>{
//         console.log(res)
//         console.log(res.data)
//       }).catch((err)=>{
//         console.log(err.response)
//       })
//       }
//   }
 
// },[userInfo])
  const primaryRoutes = PrimaryRoutes()
  const rightSiderVisible = ()=>{
    setRightSider(!rightSider)
  }
  const updateUserInfo:userinfoupdate =(values)=>{

setUserInfo(values)

  }
  const updateUserDetails = (values:userDetails)=>{
   let info:any ={...userInfo}
   info.userDetails={...values}
   console.log(info)
   window.localStorage.removeItem("user")
   window.localStorage.setItem("user",JSON.stringify(info))
   setUserInfo(info)

  }
  return (<>{isLoading?<Spin className='loading-spin' tip="Loading..." />:<Layout className='main-container' >
  {!userInfo && <Routes>
    <Route path='/login' element = {<Login updateUserInfo={updateUserInfo}/>}/>
    <Route path='/*' element={<Navigate to={"login"}/>} />
    </Routes>}
    {(userInfo &&!userInfo?.userDetails?.firstname && !userInfo?.userDetails?.lastname&& !userInfo?.userDetails?.position)&&
   <Routes>
   <Route path="/user-info/*" element={<UserInfo updateUserDetails={updateUserDetails} userInfo={userInfo}/>}/>
   <Route path='/*' element={<Navigate to={"user-info"}/>} />
   </Routes> 
    }
   {(userInfo && userInfo?.userDetails?.firstname && userInfo?.userDetails?.lastname&& userInfo?.userDetails?.position) &&
   <> 
   <Header userInfo={userInfo}  />
    <Layout>
      <Sider /> 
        <Content >
        <div className='breadcrumb'>  <Breadcrumb/>
    {/* <div onClick={rightSiderVisible}>info</div> */}
    
    <img  height={20} width={20} src={process.env.PUBLIC_URL+"assets/icons/info.jpg"} onClick={infoPanelIcon?rightSiderVisible:()=>{}} 
    style={{cursor: infoPanelIcon?"pointer":"auto"}}
    />
    </div>
    <Divider className='breadcrumb-divider' />
    <Layout className='content-wrapper' style={{ justifyContent:"space-between"}}>
      <div >
        <Routes>
         {primaryRoutes.map((tools)=>{
           const Component = tools.component
           return <Route path={tools.link} element={<Component userInfo={userInfo}/>}/>

         })}
         <Route path="/*" element={<Navigate to={"files"}/>}/>
         
        </Routes>
        </div>
        {rightSider&& <InfoPanel/>}
        </Layout>
      </Content>
       
      {/* </Layout> */}
      
    </Layout></>}
  </Layout>}</>)
}

export default App;
