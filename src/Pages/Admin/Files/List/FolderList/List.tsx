import { Card, Col, message, Row, Spin } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PdfViewer from '../../../../../Components/PdfViewer/PdfViewer'
import { UploadTypes } from '../../../../Users/Constants/Constants'

const List = (props: any) => {
  const history = useNavigate()
  const { fileId } = useParams()
  const [reqInfo, setReqInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [companyInfo, setCompanyInfo] = useState<{
    id: string
    location: string
    parent_id: string
    trade_no: string
  } | null>(null)
  const [isActive, setIsActive] = useState<string>('')

  console.log(fileId)
  console.log(props)

  useEffect(() => {
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
        setReqInfo(res.data[0])
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }, [])
  useEffect(() => {
    if (reqInfo) {
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/api/V1/admin/getfiles?id=${reqInfo.company_info}&type=${UploadTypes.companyInfo}`,
          {
            headers: {
              Authorization: props.userInfo.token,
            },
          }
        )
        .then((res) => {
          console.log(res)
          setCompanyInfo(res.data)
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setIsLoading(false)
        })
    }
  }, [reqInfo])
 
  const folderList = [
    { label: 'financials', key: 'financials' },
    { label: 'debitors', key: 'debitors' },
    { label: 'creditors', key: 'creditors' },
  ]
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
      {isLoading ? (
        <Spin tip='Loading...' />
      ) : (
        <>
          <Row>
            <h1 style={{ fontSize: '22px' }}>{reqInfo.company_name}</h1>
          </Row>
          <Row></Row>
          <Row gutter={10} style={{ marginBottom: '20px' }}>
            {folderList.map((d: any) => {
              return (
                <Col span={6} className='folder-container' key={d.key}>
                  <Card
                    className={`cards ${isActive === d.key ? 'is-active' : ''}`}
                    onClick={(evt) => singleClick(evt, d.key)}
                    onDoubleClick={() => {
                      history(`/files/${fileId}/${d.key}`)
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

          <Row>
            <Col span={6} className='folder-container'>
              <Card
                className={`cards ${
                  isActive === 'companyInfo' ? 'is-active' : ''
                }`}
                onClick={(evt) => singleClick(evt, 'companyInfo')}
                onDoubleClick={() => {
                  doubleClick(companyInfo?.location)
                }}
              >
                <Row justify='center'>
                  <Col style={{ marginRight: '10px' }}>
                    <img
                      height={80}
                      src={
                        process.env.PUBLIC_URL + '/assets/icons/pdf_icon.png'
                      }
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: '5px' }}>
                  {' '}
                  <Col className='files-txt'>
                    <div>{companyInfo?.trade_no}</div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default List
