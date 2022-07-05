import React,{ useState} from 'react'
import {Form,Upload,Button,Input, Select, TreeSelect,message, Spin } from "antd"
import { UploadTypes } from '../../../Constants/Constants'
import "./FinancialForm.css"
import axios from 'axios'
interface financialInfoProp {
  id:string|null,
    FileList:Array<any>,
}
const FinancialForm = (props:any) => {  
  const [financial1,setFinancial1] = useState<financialInfoProp>({
    id:null,
    FileList:[],
  })
  const [financial2,setFinancial2] = useState<financialInfoProp>({
    id:null,
    FileList:[],
  })
  const [financial3,setFinancial3] = useState<financialInfoProp>({
    id:null,
    FileList:[],
  })
  const [financial4,setFinancial4] = useState<financialInfoProp>({
    id:null,
    FileList:[],
  })
  const [financial5,setFinancial5] = useState<financialInfoProp>({
    id:null,
    FileList:[],
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
      // console.log(fileList.id)
      // company_info, id, address, company_name 
//       const payload = {
//           type:UploadTypes.companyInfo,
// company_info:fileList.id,
// address:value.address,
// company_name:value.company_name,
// id:props.values.id
//       }
console.log(financial1,financial2,financial3,financial4,financial5)
if(financial1.id === null || !financial1.FileList.length){
  message.error("Please fill required field")
  setIsLoading(false)
  return
}
if(financial1.id !==null||financial1.FileList.length){
idList.push(financial1.id)
}
if(financial2.id !==null||financial2.FileList.length){
  
  idList.push(financial2.id)
  }
  if(financial3.id !==null||financial3.FileList.length){
    idList.push(financial3.id)
    }
    if(financial4.id !==null||financial4.FileList.length){
      idList.push(financial4.id)
      }
      if(financial5.id !==null||financial5.FileList.length){
        idList.push(financial5.id)
        }
// if(financial2.id === null || !financial2.FileList.length){
//   message.error("All fields are required ")
//   setIsLoading(false)
//   return
// }
// if(financial3.id === null || !financial3.FileList.length){
//   message.error("All fields are required ")
//   setIsLoading(false)
//   return
// }
// if(financial4.id === null || !financial4.FileList.length){
//   message.error("All fields are required ")
//   setIsLoading(false)
//   return
// }
// if(financial5.id === null && !financial5.FileList.length){
//   message.error("All fields are required ")
//   setIsLoading(false)
//   return
// }


const payload ={
  
    type:UploadTypes.financial,
    id:props.values.id,
  financials:JSON.stringify(idList)
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
          const optionValue = form.getFieldValue("option1")
          if( !yearValue || yearValue === ""){
            message.error("Corresponding year is required")
            result =false
           }
           if( !optionValue || optionValue === ""){
            message.error("Corresponding option number is required")
            result =false
           }
           else{
            result =true
           }
           break;
          }
          case "2":{
            const yearValue = form.getFieldValue("year2")
            const optionValue = form.getFieldValue("option2")
            if( !yearValue || yearValue === ""){
              message.error("Corresponding year is required")
              result =false
             }
             if( !optionValue || optionValue === ""){
              message.error("Corresponding option number is required")
              result =false
             }
             else{
              result =true
             }
             break;
            }
            case "3":{
              const yearValue = form.getFieldValue("year3")
              const optionValue = form.getFieldValue("option3")
              if( !yearValue || yearValue === ""){
                message.error("Corresponding year is required")
                result =false
               }
               if( !optionValue || optionValue === ""){
                message.error("Corresponding option number is required")
                result =false
               }
               else{
                result =true
               }
               break;
              }
              case "4":{
                const yearValue = form.getFieldValue("year4")
                const optionValue = form.getFieldValue("option4")
                if( !yearValue || yearValue === ""){
                  message.error("Corresponding year is required")
                  result =false
                 }
                 if( !optionValue || optionValue === ""){
                  message.error("Corresponding option number is required")
                  result =false
                 }
                 else{
                  result =true
                 }
                 break;
                }
                case "5":{
                  const yearValue = form.getFieldValue("year5")
                  const optionValue = form.getFieldValue("option5")
                  if( !yearValue || yearValue === ""){
                    message.error("Corresponding year is required")
                    result =false
                   }
                   if( !optionValue || optionValue === ""){
                    message.error("Corresponding option number is required")
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
      console.log(financial1)
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
     let optionValue:string|null=null

      switch (id) {
        case "1":{
           yearValue=form.getFieldValue("year1")
           optionValue=form.getFieldValue("option1")
           break;
        }
        case "2":{
          yearValue=form.getFieldValue("year2")
          optionValue=form.getFieldValue("option2")
          break;
       }
       case "3":{
        yearValue=form.getFieldValue("year3")
        optionValue=form.getFieldValue("option3")
        break;
     }
     case "4":{
      yearValue=form.getFieldValue("year4")
      optionValue=form.getFieldValue("option4")
      break
   }
   case "5":{
    yearValue=form.getFieldValue("year5")
    optionValue=form.getFieldValue("option5")
 }
      }
      if(!yearValue || yearValue===""){
        console.log(event)
      event.onError("No corresponding year provided")
      return 
      }
      if(!optionValue || optionValue===""){
        console.log(event)
      event.onError("No corresponding option provided")
      return 
      }
      console.log(optionValue)
formData.append("type",UploadTypes.financial)
formData.append("parentId",props.values.id)
formData.append("year",yearValue)
formData.append("option",optionValue)
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
                  setFinancial1({
                    id:valueId,
                    FileList:file,
                  })
                  break;}
                case "2":
                    setFinancial2({
                      id:valueId,
                      FileList:file,
                    })
                    break
                case "3":
                      setFinancial3({
                        id:valueId,
                        FileList:file,
                      })
                      break
                      case "4":
                        setFinancial4({
                          id:valueId,
                          FileList:file,
                        })
                        break
                        case "5":
                          setFinancial5({
                            id:valueId,
                            FileList:file,
                          })
                          break  
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
              setFinancial1({
                id:null,
                FileList:[],
              })
              break;
            case "2":
                setFinancial2({
                  id:null,
                  FileList:[],
                })
                break
            case "3":
                  setFinancial3({
                    id:null,
                    FileList:[],
                  })
                  break
                  case "4":
                    setFinancial4({
                      id:null,
                      FileList:[],
                    })
                    break
                    case "5":
                      setFinancial5({
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
        setFinancial1({
          id:null,
          FileList:[],
        })
        break;
      case "2":
          setFinancial2({
            id:null,
            FileList:[],
          })
          break
      case "3":
            setFinancial3({
              id:null,
              FileList:[],
            })
            break
            case "4":
              setFinancial4({
                id:null,
                FileList:[],
              })
              break
              case "5":
                setFinancial5({
                  id:null,
                  FileList:[],
                })
                break  
    }
  }
  return (<>
  <Spin spinning={isLoading} tip="Loading...">
    <div className='financial-title'><h1>Financial information</h1></div>
    <Form className='financial-form' form={form} onFinish={onfinish} >
        <Form.Item name="financial1">
         <div className='financial-fields'>

            <Form.Item label="year"  name={"year1"} className="financial-year"
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
            <Form.Item label="select"  name={"option1"} className="financial-options" 
            rules={[{required:true,message:"Field required"}]}
            >
              <Select  >
                <Select.Option value="Audited" >Audited</Select.Option>
                <Select.Option value="In house">In House</Select.Option>
              </Select>
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
          //    showUploadList={false}
          fileList={financial1.FileList}
             >
                <Button>Upload</Button>
              </Upload>
            </Form.Item>
         </div>
        </Form.Item>
        <Form.Item name="financial2">
         <div className='financial-fields'>

            <Form.Item label="year"  name={"year2"} className="financial-year" 
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
            <Form.Item label="select"  name={"option2"} className="financial-options"
            // rules={[{required:true,message:"Field required"}]}
            >
              <Select >
                <Select.Option value="Audited" >Audited</Select.Option>
                <Select.Option value="In house">In House</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
            rules={[{required:true,message:"Field required"}]}
            >
              <Upload
               maxCount={1} name="upload"
               beforeUpload={(event)=>beforeUpload(event,"2")}
              onChange={(event)=>onchange(event)}
              customRequest={(file:any)=>request(file,"2")}
              onRemove={(event)=>{onRemove(event,"2")}}
           //    showUploadList={false}
           fileList={financial2.FileList}
           >
                <Button>Upload</Button>
              </Upload>
            </Form.Item>
         </div>
        </Form.Item>
        <Form.Item name="financial3">
         <div className='financial-fields'>

            <Form.Item label="year"  name={"year3"} className="financial-year"
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
            <Form.Item label="select"  name={"option3"} className="financial-options"
            // rules={[{required:true,message:"Field required"}]}
            >
              <Select >
                <Select.Option value="Audited" >Audited</Select.Option>
                <Select.Option value="In house">In House</Select.Option>
              </Select>
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
           //    showUploadList={false}
           fileList={financial3.FileList}
              >
                <Button>Upload</Button>
              </Upload>
            </Form.Item>
         </div>
        </Form.Item>
        <Form.Item name="financial4">
         <div className='financial-fields'>

            <Form.Item label="year"  name={"year4"} className="financial-year"
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
            <Form.Item label="select"  name={"option4"} className="financial-options"
            // rules={[{required:true,message:"Field required"}]}
            >
              <Select >
                <Select.Option value="Audited" >Audited</Select.Option>
                <Select.Option value="In house">In House</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Upload
               maxCount={1} name="upload"
               beforeUpload={(event)=>beforeUpload(event,"4")}
              onChange={(event)=>onchange(event)}
              customRequest={(file:any)=>request(file,"4")}
              onRemove={(event)=>{onRemove(event,"4")}}
           //    showUploadList={false}
           fileList={financial4.FileList}
              >
                <Button>Upload</Button>
              </Upload>
            </Form.Item>
         </div>
        </Form.Item>
        <Form.Item name="financial5">
         <div className='financial-fields'>

            <Form.Item label="year"  name={"year5"} className="financial-year"
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
            <Form.Item label="select"  name={"option5"} className="financial-options"
            // rules={[{required:true,message:"Field required"}]}
            >
              <Select >
                <Select.Option value="Audited" >Audited</Select.Option>
                <Select.Option value="In house">In House</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
            // rules={[{required:true,message:"Field required"}]}
            >
              <Upload
               maxCount={1} name="upload"
               beforeUpload={(event)=>beforeUpload(event,"5")}
              onChange={(event)=>onchange(event)}
              customRequest={(file:any)=>request(file,"5")}
              onRemove={(event)=>{onRemove(event,"5")}}
           //    showUploadList={false}
           fileList={financial5.FileList}
              >
                <Button>Upload</Button>
              </Upload>
            </Form.Item>
         </div>
        </Form.Item>
        <Button htmlType='submit' type='primary' size='large' className='financial-sub-btn'>
          Proceed
        </Button>
    </Form>
    </Spin>
    </>
  )
}

export default FinancialForm