import { Button, Form, Input } from 'antd'
import React from 'react'
import "./Login.css"

const Login = () => {
    const onfinish=(evt:FormDataEvent)=>{
console.log(evt)
    }
  return (
    <div className='login-container' style={{backgroundImage:"url(/assets/images/login_bg1.png)"}}>
        <img   className='login-img' src={process.env.PUBLIC_URL+"/assets/images/login_cloud.png"} />
        <img className='login-arrow' src={process.env.PUBLIC_URL+"/assets/images/login_arrow.png"} />
        <div className="login-input-container" >
            <Form wrapperCol={{span:6}} labelCol={{span:10}} className='form-container' onFinish={onfinish}>
                <Form.Item required label="Email" name="email">
                    <Input/>
                </Form.Item>
                <Form.Item required label="password" name={"password"}>
                    <Input/>
                </Form.Item>
                <Button htmlType='submit'> submit</Button>
            </Form>
            </div>
    </div>
  )
}

export default Login