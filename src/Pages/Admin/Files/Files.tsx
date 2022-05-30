import React from 'react'
import {List,Card} from "antd"
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
    <List grid={{ xs: 1,
      sm: 2,
      md: 3,
      lg: 3,
      xl: 3,
      xxl: 3,}} dataSource={data} renderItem={item=>(
      <List.Item>
        <Card>{item.label}</Card>
      </List.Item>
    )}>
      
     
    </List>
  )
}

export default Files