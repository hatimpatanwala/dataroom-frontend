import React,{ useState} from 'react'
import {Form,Upload,Button,Input, Select, TreeSelect,message, Spin } from "antd"
import { UploadTypes } from '../../../Constants/Constants'
import "./DebitorsForm.css"
import axios from 'axios'
interface debitorsInfoProp {
  id:string|null,
   FileList:Array<any>,
}

const DebitorsForm = (props:any) => {
  const[debitors1,setDebitors1]=useState<debitorsInfoProp>({
    id:null,
    FileList:[]
  })
  const[debitors2,setDebitors2]=useState<debitorsInfoProp>({
    id:null,
    FileList:[]
  })
  const[debitors3,setDebitors3]=useState<debitorsInfoProp>({
    id:null,
    FileList:[]
  })
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const [form] =Form.useForm()
    const yearCalc = ()=>{
      var max = new Date().getFullYear()
      var min = max - 100
      var years = []
    
      for (var i = max; i >= min; i--) {
        years.push(i)
      }
      return years
    }
    const years = yearCalc()
    const onfinish=(value:any)=>{
const idList:any = []

      setIsLoading(true)
console.log(debitors1,debitors2,debitors3)
if(debitors1.id === null || !debitors1.FileList.length){
  message.error("All fields are required ")
  setIsLoading(false)
  return
}
if(debitors1.id !==null||debitors1.FileList.length){
  idList.push(debitors1.id)
  }
  if(debitors2.id !==null||debitors2.FileList.length){
    
    idList.push(debitors2.id)
    }
    if(debitors3.id !==null||debitors3.FileList.length){
      idList.push(debitors3.id)
      }
// if(debitors2.id === null || !debitors2.FileList.length){
//   message.error("All fields are required ")
//   setIsLoading(false)
//   return
// }
// if(debitors3.id === null || !debitors3.FileList.length){
//   message.error("All fields are required ")
//   setIsLoading(false)
//   return
// }

const payload ={
  
    type:UploadTypes.debitors,
    id:props.values.id,
  debitors:JSON.stringify(idList)
}
       axios.post(`${process.env.SERVER_URL}/api/V1/request/updaterequest`,payload).then((res)=>{
          console.log(res)
          const {type,...update} =payload
       console.log(update)
       props.updateValues(update)
       setIsLoading(false)
          console.log(props.values)
      }).catch((err)=>{
          console.log(err)
          setIsLoading(false)
          message.error("Something went wrong while update company info please try again")
      })
  }
  const beforeUpload=(event:any,id:string)=>{
     let result :boolean =false
      switch(id){
        case "1":{
          const yearValue = form.getFieldValue("year1")
          if( !yearValue || yearValue === ""){
            message.error("Corresponding year is required")
            result =false
           }
           else{
            result =true
           }
           break;
          }
          case "2":{
            const yearValue = form.getFieldValue("year2")
            if( !yearValue || yearValue === ""){
              message.error("Corresponding year is required")
              result =false
             }
             else{
              result =true
             }
             break;
            }
            case "3":{
              const yearValue = form.getFieldValue("year3")
              if( !yearValue || yearValue === ""){
                message.error("Corresponding year is required")
                result =false
               }
               else{
                result =true
               }
               break;
              }
      }
      
    
     return result

    
  }
  const onchange = (info:any)=>{
console.log(info)
setIsLoading(true)
// if()
switch (info.file.status){
  case "uploading":
      console.log("uploading")
      break;
  case "done":
      console.log("done")
      setIsLoading(false)
      console.log(debitors1)
      break;
  default :
  info.fileList=[]
  info.file={}
  setIsLoading(false)

  console.log(info)
  // return 
  break;
}
return false
  }
  const request=(event:any,id:string)=>{
     const formData = new FormData()
     let yearValue:string|null =null
    //  let optionValue:string|null=null

      switch (id) {
        case "1":{
           yearValue=form.getFieldValue("year1")
          //  optionValue=form.getFieldValue("option1")
           break;
        }
        case "2":{
          yearValue=form.getFieldValue("year2")
          // optionValue=form.getFieldValue("option2")
          break;
       }
       case "3":{
        yearValue=form.getFieldValue("year3")
        // optionValue=form.getFieldValue("option3")
        break;
     }
      }
      if(!yearValue || yearValue===""){
        console.log(event)
      event.onError("No corresponding year provided")
      return 
      }
      // if(!optionValue || optionValue===""){
      //   console.log(event)
      // event.onError("No corresponding option provided")
      // return 
      // }
      // console.log(optionValue)
formData.append("type",UploadTypes.debitors)
formData.append("parentId",props.values.id)
formData.append("year",yearValue)
// formData.append("option",optionValue)
formData.append("upload",event.file)
axios.post(`${process.env.SERVER_URL}/api/V1/request/upload`,formData).then((res)=>{
          console.log(res)
          if(res.status === 201){

              const valueId = res.data.id
              const file = []
              file.push(event.file)
              switch (id){
                case "1":{
                  console.log("inside 1")
                  console.log(valueId,file)
                  setDebitors1({
                    id:valueId,
                    FileList:file,
                  })
                  break;}
                case "2":
                    setDebitors2({
                      id:valueId,
                      FileList:file,
                    })
                    break
                case "3":
                      setDebitors3({
                        id:valueId,
                        FileList:file,
                      })
                      break; 
              }
              message.success("File successsfully uploaded")
      setIsLoading(false)

              event.onSuccess("ok")
          }
      }).catch((err)=>{
        setIsLoading(false)
          console.log(err)
          message.error("File not uploaded try again")
          switch (id){
            case "1":
              setDebitors1({
                id:null,
                FileList:[],
              })
              break;
            case "2":
                setDebitors2({
                  id:null,
                  FileList:[],
                })
                break
            case "3":
                  setDebitors3({
                    id:null,
                    FileList:[],
                  })
                  break

          }
          })
  }
  const onRemove=(event:any,id:string)=>{
    switch (id){
      case "1":
        setDebitors1({
          id:null,
          FileList:[],
        })
        break;
      case "2":
          setDebitors2({
            id:null,
            FileList:[],
          })
          break
      case "3":
            setDebitors3({
              id:null,
              FileList:[],
            })
            break
    }
  }
  return (
    <Spin spinning={isLoading} tip="Loading...">
    <div className='debitors-title'><h1>debitors information</h1></div>
    <Form className='debitors-form' form={form} onFinish={onfinish} >
    <Form.Item name="creditor1">
      <div className='debitors-fields'>

         <Form.Item label="year"  name={"year1"} className="debitors-year"
         rules={[{required:true,message:"Field required"}]}
         >
           <TreeSelect 
           showSearch
           style={{ width: '100%' }}
           // value={value}
           dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
           placeholder="Please select"
           allowClear
           treeDefaultExpandAll>
             {years.map((y)=>{
               return <TreeSelect.TreeNode key={y} value={y} title={y} />
             })}
           </TreeSelect>
         </Form.Item>
         <Form.Item 
         rules={[{required:true,message:"Field required"}]}
         >
           <Upload
           maxCount={1} name="upload"
           beforeUpload={(event)=>beforeUpload(event,"1")}
          onChange={(event)=>onchange(event)}
          customRequest={(file:any)=>request(file,"1")}
          onRemove={(event)=>{onRemove(event,"1")}}
       // //    showUploadList={false}
       fileList={debitors1.FileList}
          >
             <Button>Upload</Button>
           </Upload>
         </Form.Item>
      </div>
     </Form.Item>
     <Form.Item name="creditor2">
      <div className='debitors-fields'>

         <Form.Item label="year"  name={"year2"} className="debitors-year"
         // rules={[{required:true,message:"Field required"}]}
         >
           <TreeSelect 
           showSearch
           style={{ width: '100%' }}
           // value={value}
           dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
           placeholder="Please select"
           allowClear
           treeDefaultExpandAll>
             {years.map((y)=>{
               return <TreeSelect.TreeNode key={y} value={y} title={y} />
             })}
           </TreeSelect>
         </Form.Item>
         <Form.Item 
         // rules={[{required:true,message:"Field required"}]}
         >
           <Upload
           maxCount={1} name="upload"
           beforeUpload={(event)=>beforeUpload(event,"2")}
          onChange={(event)=>onchange(event)}
          customRequest={(file:any)=>request(file,"2")}
          onRemove={(event)=>{onRemove(event,"2")}}
       // //    showUploadList={false}
       fileList={debitors2.FileList}
          >
             <Button>Upload</Button>
           </Upload>
         </Form.Item>
      </div>
     </Form.Item>
     <Form.Item name="creditor3">
      <div className='debitors-fields'>

         <Form.Item label="year"  name={"year3"} className="debitors-year"
         // rules={[{required:true,message:"Field required"}]}
         >
           <TreeSelect 
           showSearch
           style={{ width: '100%' }}
           // value={value}
           dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
           placeholder="Please select"
           allowClear
           treeDefaultExpandAll>
             {years.map((y)=>{
               return <TreeSelect.TreeNode key={y} value={y} title={y} />
             })}
           </TreeSelect>
         </Form.Item>
         <Form.Item 
         // rules={[{required:true,message:"Field required"}]}
         >
           <Upload
           maxCount={1} name="upload"
           beforeUpload={(event)=>beforeUpload(event,"3")}
          onChange={(event)=>onchange(event)}
          customRequest={(file:any)=>request(file,"3")}
          onRemove={(event)=>{onRemove(event,"3")}}
       // //    showUploadList={false}
       fileList={debitors3.FileList}
          >
             <Button>Upload</Button>
           </Upload>
         </Form.Item>
      </div>
     </Form.Item>
     <Button htmlType='submit' type='primary' size='large' className='debitors-sub-btn'>
       Proceed
     </Button>
    </Form>

 </Spin>
)
}

export default DebitorsForm