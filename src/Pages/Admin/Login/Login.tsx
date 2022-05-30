import { Button, Form, Input, Spin } from 'antd'
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
    useEffect(()=>{
        const info = localStorage.getItem("user")
        if(info){
            props.updateUserInfo(JSON.parse(info))
        }
        
    },[])
    const onfinish=(evt:userLoginInfo)=>{
        
setIsLoading(true)
        axios.post("http://localhost:5000/api/V1/admin/login",evt).then((res)=>{
            const {data}=res
            data.token = "Bearer "+data.token
            localStorage.setItem("user",JSON.stringify(data))
            props.updateUserInfo(data)
            setIsLoading(false)
        }).catch((err)=>{
            console.log(err)
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