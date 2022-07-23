import React, { useEffect, useState } from 'react'
import {
  Form,
  Input,
  Upload,
  Select,
  Tooltip,
  Button,
  Spin,
  message,
} from 'antd'
import { useSearchParams, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './NewRequest.css'
interface PendingReq {
  id: string
  uid: number
  status: string
  label: string
  company_name?: string
  otp: number
  sender_emailid: string
  receiver_emailid: string
}
const NewRequest = (props: any) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [formValues, setFormValues] = useState<PendingReq>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { reqId } = useParams()
  const [form] = Form.useForm()
  let history = useNavigate()
  useEffect(() => {
    const searchReqId = searchParams.get('requestid')
    console.log(reqId)
    if (reqId) {
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/api/V1/admin/getrequest?id=${reqId}`,
          {
            headers: {
              Authorization: props.userInfo.token,
            },
          }
        )
        .then((res) => {
          console.log(res.data)
          setFormValues(res.data)
          setIsLoading(false)
          if (!res.data) {
            history('/pending-request')
          }
        })
        .catch((err) => {
          console.log(err)
          message.error('something went wrong')
          history('/pending-request')

          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [])
  const onSubmit = (values: any) => {
    values.id = 'id' + Math.random().toString(16).slice(2)
    values.uid = props.userInfo.id
    values.sender_emailid = props.userInfo.emailid
    // console.log(values)
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/V1/request/create`,
        values,
        {
          headers: {
            Authorization: props.userInfo.token,
          },
        }
      )
      .then((res) => {
        console.log(res)
        if (res.status === 201) {
          message.success('successfully created request')
          history('/new-request')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const fieldConstants = {}
  return (
    <>
      {isLoading ? (
        <Spin tip='Loading...' />
      ) : (
        <Form
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 8 }}
          className='new-req-form'
          onFinish={onSubmit}
          form={form}
          initialValues={formValues}
        >
          <Form.Item
            label='Form label'
            name='label'
            rules={[{ required: true, message: 'Label is required' }]}
          >
            <Input
              placeholder='Type name for your reference'
              disabled={formValues ? true : false}
            />
          </Form.Item>
          <Form.Item
            label='Email id'
            name='receiver_emailid'
            rules={[
              { required: true, message: 'email id is required' },
              { type: 'email', message: 'Invalid email' },
            ]}
          >
            <Input
              placeholder='Email id whom want to ask for informations'
              disabled={formValues ? true : false}
            />
          </Form.Item>
          <Form.Item label='financial'>
            <Tooltip title='Not editable coming soon...'>
              <Input.Group compact>
                <Form.Item>
                  <Select disabled defaultValue={'financial'}>
                    <Select.Option value='financial'>
                      Financials Info
                    </Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Input placeholder='5 years' disabled />
                </Form.Item>
              </Input.Group>
            </Tooltip>
          </Form.Item>
          <Form.Item label='Debitors ageing'>
            <Tooltip title='Not editable coming soon...'>
              <Input.Group compact>
                <Form.Item>
                  <Select disabled defaultValue={'debitors'}>
                    <Select.Option value='debitors'>
                      Debitors ageing Info
                    </Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Input placeholder='3 years' disabled />
                </Form.Item>
              </Input.Group>
            </Tooltip>
          </Form.Item>
          <Form.Item label='Creditors ageing'>
            <Tooltip title='Not editable coming soon...'>
              <Input.Group compact>
                <Form.Item>
                  <Select disabled defaultValue={'creditors'}>
                    <Select.Option value='creditors'>
                      Creditors ageing Info
                    </Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Input placeholder='3 years' disabled />
                </Form.Item>
              </Input.Group>
            </Tooltip>
          </Form.Item>
          <Button
            htmlType='submit'
            type='primary'
            size='large'
            style={{ marginLeft: '25%' }}
            disabled={formValues ? true : false}
          >
            Submit
          </Button>
        </Form>
      )}
    </>
  )
}

export default NewRequest
