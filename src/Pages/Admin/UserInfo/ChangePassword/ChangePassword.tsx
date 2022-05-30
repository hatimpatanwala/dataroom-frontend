import { Button, Form, Input } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./ChangePassword.css"


const ChangePassword = () => {
  return (
   <Form labelCol={{ span: 8 }}
   wrapperCol={{ span: 16 }}
    className='change-pass-container'>
       <Form.Item label="Current password" >
           <Input/>
       </Form.Item>
       <Form.Item label="New password">
           <Input/>
       </Form.Item>
       <Form.Item label="Confirm password">
           <Input/>
       </Form.Item>
       <div className="pass-btn-wrapper" >
           <Button type='primary' size='large' >Skip</Button>
       </div>
       
   </Form>
  )
}

export default ChangePassword