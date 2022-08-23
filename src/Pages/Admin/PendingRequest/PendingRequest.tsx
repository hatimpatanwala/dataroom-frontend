import React, { useEffect, useState } from 'react'
import { Card, Row, Col, message, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
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
const PendingRequest = (props: any) => {
  const [pendingReq, setPendingReq] = useState<PendingReq[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isActive, setIsActive] = useState<string>('')
  const history = useNavigate()
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/V1/admin/requests?uid=${props.userInfo.id}&status=pending`,
        {
          headers: {
            Authorization: props.userInfo.token,
          },
        }
      )
      .then((res) => {
        setPendingReq(res.data.data)
        console.log(res.data.data)
        setIsLoading(false)
        if (res.data.length) {
          message.warning('No pending request')
        }
      })
      .catch((err) => {
        console.log(err)
        message.error('something went wrong')
        setIsLoading(false)
      })
  }, [])
  const singleClick = (evt: any, id: string) => {
    console.log(id)

    setIsActive(id)
  }
  return (
    <>
      {isLoading ? (
        <Spin tip='Loading...' />
      ) : (
        <Row gutter={10} style={{ marginRight: '0px', marginLeft: '0px' }}>
          {pendingReq?.map((d: any) => {
            return (
              <Col span={6} className='folder-container' key={d.id}>
                <Card
                  className={`cards ${isActive === d.id ? 'is-active' : ''}`}
                  onClick={(evt) => singleClick(evt, d.id)}
                  onDoubleClick={() => {
                    history('/pending-request/' + d.id)
                  }}
                >
                  <Row>
                    <Col style={{ marginRight: '10px' }}>
                      <img
                        height={25}
                        src={
                          process.env.PUBLIC_URL + '/assets/icons/folder1.png'
                        }
                      />
                    </Col>
                    <Col className='files-txt'>
                      <div>{d.label}</div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            )
          })}
        </Row>
      )}
    </>
  )
}

export default PendingRequest
