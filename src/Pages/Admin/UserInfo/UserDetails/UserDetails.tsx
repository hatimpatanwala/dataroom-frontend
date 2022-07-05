import { Button, Form, Input, InputNumber } from 'antd'
import axios from 'axios'
import React from 'react'

const UserDetails = (props:any) => {
    const onSave = (values:any)=>{
        values.uid = props.userInfo.id
        axios.post(`${process.env.SERVER_URL}/api/V1/admin/userdetail`,values,{headers:{
            Authorization:props.userInfo.token
          }}).then((res)=>{
              if(res.status===200){
                props.updateUserDetails(values)
              }
          }).catch((err)=>{
              console.log(err)
          })
        
    }
  return (
   <Form className='user-detail-container'  labelCol={{ span: 6 }}
   wrapperCol={{ span: 16 }}
    // className='change-pass-container'
    onFinish={onSave}
    >
       <Form.Item label="First name" name={"firstname"} 
       rules={[{required:true,message:"First name is required"}]}
       >
           <Input/>
        </Form.Item>
        <Form.Item label="Last name" name={"lastname"}
        rules={[{required:true,message:"Last name is required"}]}
        
        >
           <Input/>
        </Form.Item>
        <Form.Item label="Position" name={"position"}
        rules={[{required:true,message:"Position is required"}]}
        >
           <Input/>
        </Form.Item>
        <Form.Item label="Phone No" name={"phoneno"}
        rules={[{required:true,message:"Phone No is required"}]}
        >
           <Input/>
        </Form.Item>
        <div>
        <Button htmlType='submit' type='primary' size='large' className='user-detail-btn' style={{marginLeft:"40%"}}>Save</Button>
        </div>
    </Form>
  )
}

export default UserDetails