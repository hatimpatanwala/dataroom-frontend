import { Button, Form, Input, Layout, Select, Spin } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { generatePassword } from '../../../Common_Utils/passwordGenerator'
import { userLoginInfo } from '../../../Models/Models'
import "./Register.css"
interface IProps {
     userInfo:userLoginInfo
}
export const Register = (props:IProps) => {
    const [isLoading,setIsLoading]=useState<boolean>(false)
    const [userInfor,setUserInfor]=useState<userLoginInfo|null>(null)
    const onRegister=(values:userLoginInfo)=>{
if(values){
    console.log(props.userInfo.token)
    console.log(values)
    setIsLoading(true)
    values.password=generatePassword()
    axios.post(`${process.env.SERVER_URL}/api/V1/superadmin/register`,values,{headers:{
        "Authorization":props.userInfo.token
    }}).then((res)=>{
       const {data}=res
       console.log(data)
       setUserInfor(data)
       setIsLoading(false)
    }).catch((err)=>{
        setIsLoading(false)
        console.log(err)
    })
}
    }
  return (
    <Layout className='admin-register'>
    <Spin spinning={isLoading} tip={"Loading..."} style={{width:"100%"}}>
    <div className='admin-register-container'>
      {
          !userInfor?(<Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            className='register-form-container'
            onFinish={onRegister}
            initialValues={{
              emailid:"",
              password:"",
              role:"admin"
            }}
            >
             <Form.Item label="Email id" name="emailid" rules={[{required:true,message:"please enter email id"}]}>
               <Input type={"email"} />
             </Form.Item>
             <Form.Item label="Role" name="role" rules={[{required:true,message:"role is required"}]}>
                 <Select disabled>
                     <Select.Option value="admin">Admin</Select.Option>
                 </Select>
             </Form.Item>
             
               <Button className='submit-btn' htmlType='submit' type='primary' size='large'>Login</Button>
           </Form>):
           <div>
               <p>Share details with respective employee</p>
               <p>Email Id : {userInfor?.emailid}</p>
               <p>Password : {userInfor?.password}</p>
               <p>Role :{userInfor?.role}</p>
           </div> 
      }
    </div>
    </Spin>
</Layout>
  )
}
