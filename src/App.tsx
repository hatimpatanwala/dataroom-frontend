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
import Login from './Pages/Login/Login';


const {  Footer, Content } = Layout;

interface userinfo{
  email:string,
  password:string,
}
type userinfoupdate=(value:userinfo)=>void
function App(props:any) {
  
  const [rightSider,setRightSider] =useState<boolean>(false)
  const [infoPanelIcon,setInfoPanelIcon] = useState<boolean>(false)
  const [userInfo,setUserInfo]=useState<userinfo|null>(null)
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
if(user){
  setUserInfo(JSON.parse(user))
}
setIsLoading(false)
},[location])
  const primaryRoutes = PrimaryRoutes()
  const rightSiderVisible = ()=>{
    setRightSider(!rightSider)
  }
  const updateUserInfo:userinfoupdate =(values)=>{
setUserInfo(values)
  }
  return (<>{isLoading?<Spin className='loading-spin' tip="Loading..." />:<Layout className='main-container' >
  {!userInfo && <Routes>
    <Route path='/login' element = {<Login updateUserInfo={updateUserInfo}/>}/>
    <Route path='/*' element={<Navigate to={"login"}/>} />
    </Routes>}
   {userInfo &&<> <Header userInfo={userInfo}  />
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
      <div style={{overflowX:"auto"}}>
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
