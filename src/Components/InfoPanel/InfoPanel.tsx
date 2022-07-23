import React from 'react'
import { Layout } from 'antd'
import './InfoPanel.css'

const { Sider: AntdRightSider } = Layout
const InfoPanel = () => {
  return (
    <AntdRightSider width={250} className='right-sider'>
      Info Panel
    </AntdRightSider>
  )
}

export default InfoPanel
