import React, { useEffect, useState } from 'react'
import { Form, Button, Input, Upload, message, Spin } from 'antd'
import { UploadTypes } from '../../../Constants/Constants'
import './CompanyInfoForm.css'
// import { uniqueIdGenerator } from '../../../Helpers/UniqueIdGenerator'
import axios from 'axios'

interface fileListProp {
  id: string | null
  FileList: Array<any>
}
const CompanyInfoForm = (props: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<fileListProp>({
    id: null,
    FileList: [],
  })
  const onfinish = (value: any) => {
    setIsLoading(true)
    value.id = fileList.id
    // console.log(fileList.id)
    // company_info, id, address, company_name
    const payload = {
      type: UploadTypes.companyInfo,
      company_info: fileList.id,
      address: value.address,
      company_name: value.company_name,
      phoneno: value.phoneno,
      company_website: value.company_website,
      id: props.values.id,
      request_id: props.values.request_id,
    }
    console.log(
      (fileList.id !== '' || fileList.id !== null) && fileList.FileList.length
    )
    if (
      (fileList.id !== '' || fileList.id !== null) &&
      fileList.FileList.length
    ) {
      console.log(payload)

      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/api/V1/request/updaterequest`,
          payload
        )
        .then((res) => {
          console.log(res)
          const { type, ...update } = payload
          console.log(update)
          props.updateValues(update)
          setIsLoading(false)
          console.log(props.values)
        })
        .catch((err) => {
          console.log(err)
          setIsLoading(false)
          message.error(
            'Something went wrong while update company info please try again'
          )
        })
    } else {
      setIsLoading(false)
      message.error('All fields are required')
    }

    console.log(value)
  }
  const beforeUpload = (event: any, id: string) => {
    const formValue = form.getFieldValue(id)
    console.log('before upload')
    console.log(formValue)
    if (!formValue || formValue === '') {
      message.error('Corresponding trade/license number is required')
      return Promise.reject()
    } else {
      return true
    }
  }
  const onchange = (info: any) => {
    console.log(info)
    setIsLoading(true)
    // if()
    switch (info.file.status) {
      case 'uploading':
        console.log('uploading')
        break
      case 'done':
        console.log('done')
        setIsLoading(false)
        break
      default:
        info.fileList = []
        info.file = {}
        setIsLoading(false)

        console.log(info)
        // return
        break
    }
    return false
  }
  const request = (event: any, id: string) => {
    // console.log(event)
    // console.log(FileList)
    // event.onSuccess("ok")
    console.log(props.values)

    const formValue = form.getFieldValue(id)
    console.log(form)
    if (!formValue || formValue === '') {
      console.log(event)
      event.onError('no trade number provided')
      return
    } else {
      const formData: FormData = new FormData()
      console.log(props.values.id)
      formData.append('type', UploadTypes.companyInfo)
      formData.append('parentId', props.values.id)
      formData.append('tradeNo', formValue)
      formData.append('upload', event.file)
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/api/V1/request/upload`,
          formData
        )
        .then((res) => {
          console.log(res)
          if (res.status === 201) {
            const id = res.data.id
            const file = []
            file.push(event.file)
            console.log(event)
            console.log(id, file)
            // file.push(event.file)
            setFileList({
              id: id,
              FileList: file,
            })
            message.success('File successsfully uploaded')
            setIsLoading(false)

            event.onSuccess('ok')
          }
        })
        .catch((err) => {
          console.log(err)
          message.error('File not uploaded try again')
          setFileList({
            id: null,
            FileList: [],
          })
        })
    }

    // return false
  }
  const onRemove = (event: any) => {
    setFileList({ id: null, FileList: [] })
  }
  return (
    <>
      <Spin spinning={isLoading} tip='Loading...'>
        <div className='company-form-container'>
          <h1>Company information</h1>
        </div>
        <Form className='company-form' form={form} onFinish={onfinish}>
          <div className='name-address'>
            <Form.Item
              label='Company name'
              name='company_name'
              rules={[{ required: true, message: 'Company name is required' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Company Address'
              name='address'
              rules={[
                { required: true, message: 'Company address is required' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Phone No'
              name='phoneno'
              rules={[{ required: true, message: 'Phone No  is required' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label='Company website' name='company_website'>
              <Input />
            </Form.Item>
          </div>

          <div className='trade-info'>
            <Form.Item
              label='Trade License No/CIN'
              name='trade_no'
              rules={[{ required: true, message: 'Company name is required' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Trade license/Certificate of Incorporation'
              rules={[
                { required: true, message: 'Trade certificate is required' },
              ]}
              className='company-info-upload'
              name='company_info'
            >
              <Upload
                maxCount={1}
                name='upload'
                beforeUpload={(event) => beforeUpload(event, 'trade_no')}
                onChange={(event) => onchange(event)}
                customRequest={(file: any) => request(file, 'trade_no')}
                onRemove={(event) => {
                  onRemove(event)
                }}
                //    showUploadList={false}
                fileList={fileList.FileList}
              >
                <Button>Upload</Button>
              </Upload>
            </Form.Item>
          </div>
          <div className='company-info-btn'>
            <Button htmlType='submit' type='primary' size='large'>
              Proceed
            </Button>
          </div>
        </Form>
      </Spin>
    </>
  )
}

export default CompanyInfoForm
