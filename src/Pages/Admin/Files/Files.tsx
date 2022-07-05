import React from 'react'
import {List,Card, Row, Col} from "antd"
import "./Files.css"
const data = [
  {
    label:"1",
    type:"folder",
  key:"1"

  },
  {
    label:"2",
    type:"folder",
  key:"2"

  },
  {
    label:"3",
    type:"folder",
  key:"3"

  }
]
const Files = () => {

  return (
    <Row gutter={10}>{data.map((d)=>{
      return <Col span={5}>
        <Card className="cards">{d.label}</Card>
      </Col>
    })}
      </Row>
  )
}

export default Files