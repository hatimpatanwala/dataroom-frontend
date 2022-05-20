import { Button, Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Login.css"

interface Iprops{

}
interface userinfo {
    email:string,
    password:string
}
const Login = (props:any) => {
    let history = useNavigate()
    useEffect(()=>{
        const info = localStorage.getItem("user")
        if(info){
            props.updateUserInfo(JSON.parse(info))
        }
        
    },[])
    const onfinish=(evt:FormDataEvent)=>{
console.log(evt)
localStorage.setItem("user",JSON.stringify(evt))
// history("files")


    }
  return (
    <div className='login-container' style={{backgroundImage:"url(/assets/images/login_bg1.png)"}}>
        <img   className='login-img' src={process.env.PUBLIC_URL+"/assets/images/login_cloud.png"} />
        {/* <img className='login-arrow' src={process.env.PUBLIC_URL+"/assets/images/login_arrow.png"} /> */}
        <div className="login-input-container" >
            <Form wrapperCol={{span:6}} labelCol={{span:10}} className='form-container' onFinish={onfinish}>
                <Form.Item  required={true} label="Email" name="email" rules={[{required:true}]}>
                    <Input type="email"/>
                </Form.Item>
                <Form.Item label="Password" name={"password"} rules={[{required:true}]}>
                    <Input.Password/>
                </Form.Item>
                <Button className='login-button' type='primary' htmlType='submit'> submit</Button>
            </Form>
            </div>
    </div>
  )
}

export default Login