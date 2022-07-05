import React,{useEffect,useState} from 'react'
import { Form, Input, Upload,Select,Tooltip,Button,Spin,message } from 'antd'
import {useSearchParams,useNavigate} from"react-router-dom"
import axios from "axios"
import "./NewRequest.css"

const NewRequest = (props:any) => {
    const [searchParams,setSearchParams]=useSearchParams()
    const [formValues,setFormValues]=useState<any>(null)
    const [isLoading,setIsLoading]=useState<boolean>(false)
    const [form]=Form.useForm()
    let history = useNavigate()
    useEffect(()=>{
        const searchReqId = searchParams.get("requestid")
        if(searchReqId){
            setIsLoading(true)

        } 
    },[])
    const onSubmit = (values:any)=>{
        values.id = "id" + Math.random().toString(16).slice(2)
        values.uid = props.userInfo.id
        values.sender_emailid = props.userInfo.emailid
        // console.log(values)
        axios.post(`${process.env.SERVER_URL}/api/V1/request/create`,values,{headers:{
            Authorization:props.userInfo.token
        }}).then(res=>{
            console.log(res)
            if(res.status===201){
message.success("successfully created request")
history("/new-request")
            }

        }).catch((err)=>{console.log(err)})
    }
    const fieldConstants = {
        
    }
  return (
 <>
 {isLoading?<Spin tip="Loading..."/>: <Form 
  labelCol={{ span: 3}}
  wrapperCol={{ span: 8 }}
  className="new-req-form"
  onFinish={onSubmit}
  form={form}
  initialValues={formValues}
  >
     <Form.Item label="Form label" name="label" rules={[
         {required:true,message:"Label is required"},
         ]}
         >
         <Input placeholder = "Type name for your reference" disabled={formValues?true:false}/>
     </Form.Item>
     <Form.Item label="Email id" name="receiver_emailid" rules={[
         {required:true,message:"email id is required"},
         {type:"email",message:'Invalid email'}
     ]}>
         <Input placeholder='Email id whom want to ask for informations' disabled={formValues?true:false} />
     </Form.Item>
     <Form.Item label="financial" >
     <Tooltip title="Not editable coming soon...">
         <Input.Group compact>
             <Form.Item>
             <Select disabled defaultValue={"financial"}>
             <Select.Option value="financial">Financials Info</Select.Option>
         </Select>
             </Form.Item>
             <Form.Item>
             <Input placeholder='5 years' disabled/>
             </Form.Item>
         </Input.Group>
         </Tooltip>
     </Form.Item>
     <Form.Item label="Debitors ageing" >
     <Tooltip title="Not editable coming soon...">
         <Input.Group compact>
             <Form.Item>
             <Select disabled defaultValue={"debitors"}>
             <Select.Option value="debitors">Debitors ageing Info</Select.Option>
         </Select>
             </Form.Item>
             <Form.Item>
             <Input placeholder='3 years' disabled/>
             </Form.Item>
         </Input.Group>
         </Tooltip>
     </Form.Item>
     <Form.Item label="Creditors ageing" >
     <Tooltip title="Not editable coming soon...">
         <Input.Group compact>
             <Form.Item>
             <Select disabled defaultValue={"creditors"}>
             <Select.Option value="creditors">Creditors ageing Info</Select.Option>
         </Select>
             </Form.Item>
             <Form.Item>
             <Input placeholder='3 years' disabled/>
             </Form.Item>
         </Input.Group>
         </Tooltip>
     </Form.Item>
     <Button htmlType='submit' type='primary' size='large' style={{marginLeft:"25%"}}>Submit</Button>
</Form>}
 
 </>
  )
}

export default NewRequest