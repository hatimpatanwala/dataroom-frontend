import { Button, Form, Input, Spin,message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userLoginInfo } from '../../../Models/Models'
import "./Login.css"

interface Iprops{

}
interface userinfo {
    email:string,
    password:string
}
const Login = (props:any) => {
    const [isLoading,setIsLoading]=useState<boolean>(false)
    let history = useNavigate()
    // useEffect(()=>{
    //     setIsLoading(true)
    //     const info = localStorage.getItem("user")
    //     if(info){
    //         axios.post("http://localhost:5000/api/V1/admin/login",{},{headers:{
    //             Authorization:info
    //         }})
    //     }
    //     setIsLoading(false)
        
    // },[])
    const onfinish=(evt:userLoginInfo)=>{
        
setIsLoading(true)
        axios.post(`${process.env.SERVER_URL}/api/V1/admin/login`,evt).then((res)=>{
            const {data}=res
            data.token = "Bearer "+data.token
            localStorage.setItem("user",JSON.stringify(data))
            props.updateUserInfo(data)
            setIsLoading(false)
        }).catch((err)=>{
            console.log(err)
            message.error(err)
            setIsLoading(false)
        })
console.log(evt)

// history("files")


    }
  return (<>
  {/* <div> */}
      <Spin spinning={isLoading} tip="Loading..." className='spinner'/>
  {/* </div> */}
    <div className={`login-container ${isLoading && "spinning"}`} style={{backgroundImage:"url(/assets/images/login_bg1.png)"}}>
        <img   className='login-img' src={process.env.PUBLIC_URL+"/assets/images/login_cloud.png"} />
        {/* <img className='login-arrow' src={process.env.PUBLIC_URL+"/assets/images/login_arrow.png"} /> */}
        <div className="login-input-container" >
            <Form wrapperCol={{span:6}} labelCol={{span:10}} className='form-container' onFinish={onfinish}>
                <Form.Item  required={true} label="Email" name="emailid" rules={[{required:true}]}>
                    <Input type="email"/>
                </Form.Item>
                <Form.Item label="Password" name={"password"} rules={[{required:true}]}>
                    <Input.Password/>
                </Form.Item>
                <Button className='login-button' type='primary' htmlType='submit'> submit</Button>
            </Form>
            </div>
    </div>
    
    </>
  )
}

export default Login