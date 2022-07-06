import { Button, Form, Input, Layout, Spin } from 'antd'
import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useSearchParams,useNavigate } from 'react-router-dom'
import "./AuthCheck.css"
const AuthCheck = (props:any) => {
    const [searchParams,setSearchParams]=useSearchParams()
    const [otpData,setOtpData] =useState<any>(null)
    const[isLoading,setIsLoading] =useState<boolean>(true)
    const history = useNavigate()
useEffect(()=>{
    const id = searchParams.get("id")
    console.log("inside authcheck")
    console.log(id)
    if(id){
axios.get(`${process.env.REACT_APP_SERVER_URL}/api/V1/request/user?id=${id}`).then((res)=>{
    console.log(res)
    if(res.status===200){
        setOtpData(res.data)
        setIsLoading(false)
    }

}).catch((err)=>{
    console.log(err)
    history("/users/invalid")
})
    }
    else{
        history("/users/invalid")
    }

},[])
const onSubmit=(values:any)=>{
    const id = searchParams.get("id")
    values.id=id
    values.otp = parseInt(values.otp)
    console.log(values)
    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/V1/request/authcheck`,values).then((res)=>{
        const {data} =res
        console.log(data)
        if(res.status===200){
            props.updateReqData(data)
            history("/users/form")
        }
    }).catch((err)=>{
        console.log(err)
        alert(err.message)
    })
}
  return ( <Layout className='auth-check-container'>
 {isLoading?<Spin tip="Loading..."/>:<div className='auth-check-form'>
 <h1>Otp sent on {otpData.emailid}</h1>
  <Form initialValues={otpData}  labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }} onFinish={onSubmit} >
      <Form.Item label="Email id" name="emailid">
          <Input disabled/>
      </Form.Item>
      <Form.Item label="otp" name="otp" rules={[{required:true,message:"otp is required"}]}>
          <Input/>
      </Form.Item>
      <Button htmlType='submit' type='primary'size='large' style={{marginLeft:"50%"}}>Verify</Button>
  </Form>
 </div>}
</Layout>
   
  )
}

export default AuthCheck