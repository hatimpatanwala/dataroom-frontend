import { Form, Input } from "antd"
import axios from "axios"
import {useState,useEffect} from "react"
import { Route, Routes, useNavigate,useSearchParams } from "react-router-dom"
import AuthCheck from "./AuthCheck/AuthCheck"
import InvalidPage from "./InvalidPage/InvalidPage"
import UserForm from "./UserForm/UserForm"

const Users =()=>{
    // const [searchParams,setSearchParams]=useSearchParams()
    const [reqData,setReqData]=useState<any>(null)
    const history=useNavigate()
//     useEffect(()=>{
//         console.log(reqData)
//         if(reqData){
//             axios.get(`${process.env.REACT_APP_SERVER_URL}/api/V1/request/user?id=idf8d2bcf844d41`).then((res)=>{
// console.log(res.data)
//             }).catch((err)=>{
//                 console.log(err)
//             })
//         }
//     },[reqData])
    const updateReqData:any = (values:any)=>{
        setReqData(values)
    }
    // useEffect(()=>{

    //     window.addEventListener("onload",e=>{
    //         console.log("loading")
    //         alert("onloading")
    //     })
    //     window.addEventListener("onunload",e=>{
    //         console.log("before onloading")
    //         alert("beforeunloading")
    //         // window.onunload=(evt)=>{
                
    //         // }
    //     })
    // },[])
    return <>
    <Routes>
        <Route path="/authcheck" element={<AuthCheck updateReqData ={updateReqData}/>}/>
        <Route path="/form/*" element={<UserForm reqData={reqData}/>}/>
        <Route path="/invalid" element={<InvalidPage/>}/>
    </Routes>
    </>
}
export default Users