import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { UploadTypes } from '../../../../Users/Constants/Constants'
import { Card, Col, Row, Spin } from 'antd'
interface Info {
  id: string
  location: string
  parent_id: string
  year: number
}

const List1 = (props: any) => {
  const { fileId, folderId } = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [reqData, setReqData] = useState<any>(null)
  const [data, setData] = useState<Info[] | null>(null)
  const [isActive, setIsActive] = useState<string>('')
  const history = useNavigate()
  useEffect(() => {
    if (!reqData) {
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/api/V1/admin/requestinfos?id=${fileId}&uid=${props.userInfo.id}`,
          {
            headers: {
              Authorization: props.userInfo.token,
            },
          }
        )
        .then((res) => {
          console.log(res)
          setReqData(res.data[0])
        })
        .catch((err) => {
          console.log(err)
          setIsLoading(false)
        })
    }
  }, [])
  useEffect(() => {
    if (reqData) {
      let type = ''

      switch (folderId) {
        case 'financials':
          type = UploadTypes.financial
          break
        case 'creditors':
          type = UploadTypes.creditors
          break
        case 'debitors':
          type = UploadTypes.debitors
          break
      }
      const id: any = folderId
      console.log(reqData[id])
      if (id && type) {
        const data = JSON.parse(reqData[id])
        console.log('this is data', data)
        const requestArray = data.map((req: any) => {
          return axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/V1/admin/getfiles?id=${req}&type=${type}`,
            {
              headers: {
                Authorization: props.userInfo.token,
              },
            }
          )
        })
        getAllReq(requestArray)
        console.log('this are request array ', requestArray)
        console.log(reqData)
        console.log(type)
      }
    }
  }, [reqData])
  const getAllReq = async (requests: string[]) => {
    const arrays: any = []
    await Promise.all(requests)
      .then((res: any) => {
        console.log(res)
        res.forEach((req: any) => {
          arrays.push(req.data)
        })
        console.log(arrays)
        setData(arrays)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }
  const singleClick = (evt: any, id: string) => {
    console.log(id)

    setIsActive(id)
  }
  const doubleClick = (url: any) => {
    console.log(url)
    window.open(url, '_blank', 'noopener noreferrer')
  }
  return (
    <>
      <Row gutter={10}>
        {isLoading ? (
          <Spin tip='Loading...' />
        ) : (
          <>
            {data?.map((info: Info) => {
              return (
                <Col span={6} className='folder-container' key={info?.id}>
                  <Card
                    className={`cards ${
                      isActive === info.id ? 'is-active' : ''
                    }`}
                    onClick={(evt) => singleClick(evt, info.id)}
                    onDoubleClick={() => {
                      doubleClick(info?.location)
                    }}
                  >
                    <Row justify='center'>
                      <Col style={{ marginRight: '10px' }}>
                        <img
                          height={80}
                          src={
                            process.env.PUBLIC_URL +
                            '/assets/icons/pdf_icon.png'
                          }
                        />
                      </Col>
                    </Row>
                    <Row style={{ marginTop: '5px' }}>
                      {' '}
                      <Col
                        className='files-txt'
                        style={{ textAlign: 'center' }}
                        span={24}
                      >
                        <div>{info?.year}</div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              )
            })}
          </>
        )}
      </Row>
    </>
  )
}

export default List1
