import React, {  useState } from 'react'
import "./SuperAdminLogin.css"
import { Button, Form, Input, Layout, Spin } from 'antd'
import { userLoginInfo } from '../../../Models/Models'
import axios from "axios"

const SuperAdminLogin =( props:any) => {
  const [isLoading,setIsLoading]=useState<boolean>(false)
 
const onLogin = (values:userLoginInfo)=>{
  setIsLoading(true)
axios.post(`${process.env.SERVER_URL}/api/v1/superadmin/login`,values).then((res)=>{
  console.log(res)
  if(res.data.role==="superadmin"){
    props.updateUserInfo(res.data)
  }

}).catch((err)=>{
  console.log(err)
  setIsLoading(false)
})
}
  return (
    <Layout className='superadmin-login'>
        <Spin spinning={isLoading} tip={"Loading..."} style={{width:"100%"}}>
        <div className='su-login-container'>
          <Form
           labelCol={{ span: 8 }}
           wrapperCol={{ span: 16 }}
           className='su-form-container'
           onFinish={onLogin}
           initialValues={{
             emailid:"",
             password:"",
           }}
           >
            <Form.Item label="Email id"name="emailid" rules={[{required:true,message:"please enter email id"}]}>
              <Input type={"email"} />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{required:true,message:"Password is required"}]}>
              <Input.Password/>
            </Form.Item>
            
              <Button className='submit-btn' htmlType='submit' type='primary' size='large'>Login</Button>
          </Form>
        </div>
        </Spin>
    </Layout>
  )
}

export default SuperAdminLogin