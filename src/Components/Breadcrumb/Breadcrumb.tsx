import React, { useEffect } from 'react'
import {Breadcrumb as AntdBreadcrumb} from "antd"
import {useLocation} from "react-router-dom"

const Breadcrumb = () => {
  let location = useLocation()
    useEffect(()=>{
console.log("braeadcrumb location change",location.pathname)
    },[location])
  return (
    <AntdBreadcrumb>
        {/* <AntdBreadcrumb.Item>Data Room</AntdBreadcrumb.Item> */}
    </AntdBreadcrumb>
  )
}

export default Breadcrumb