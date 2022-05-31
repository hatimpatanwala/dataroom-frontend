import { Button, Form, Input } from 'antd'
import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./ChangePassword.css"

interface passChange{
    oldpassword:string;
    newpassword:string;
    confirmpassword:string;
    id:string;
}
const ChangePassword = (props:any) => {
  let history = useNavigate()
    const onChange = (values:passChange)=>{
      values.id = props.userInfo.id
      console.log(values)
      console.log(props.userInfo.token)
      const headers = {
        header:{
          Authorization:props.userInfo.token
        }
      }
      axios.post("http://localhost:5000/api/V1/admin/changepassword",values,{headers:{
        Authorization:props.userInfo.token
      }}).then((res)=>{
        console.log(res)
        if(res.status===200){
           history("/user-info/user-details")
        }
      }).catch((err)=>{
        console.log(err)
      })
    }
  return (
   <Form
    labelCol={{ span: 9 }}
   wrapperCol={{ span: 16 }}
    className='change-pass-container'
    onFinish={onChange}
    >
       <Form.Item label="Current password"
       name="oldpassword" 
       rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
     >
           <Input.Password/>
       </Form.Item>
       <Form.Item label="New password" name="newpassword" rules={[{
           required:true,message:"Please input your new passowed"
       },
       {
           min:8,message:"Minimum 8 characters required"
       }
       ]}
       hasFeedback>
           <Input.Password/>
       </Form.Item>
       <Form.Item label="Confirm password" 
       name="confirmpassword"
       hasFeedback
       dependencies={['newpassword']}
       rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newpassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}>
           <Input.Password/>
       </Form.Item>
       <div className="pass-btn-wrapper" >
           <Button htmlType='button' className='pass-btn' type='primary' size='large' onClick={()=>{
             history("/user-info/user-details")
           }} >Skip</Button>
           <Button htmlType='submit' className='pass-btn' type='primary' size='large' >Change</Button>
       </div>
       
   </Form>
  )
}

export default ChangePassword