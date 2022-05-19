import React from 'react'
import Files from '../Pages/Files/Files'
import NewRequest from '../Pages/NewRequest/NewRequest'
import PendingRequest from '../Pages/PendingRequest/PendingRequest'
// import { primaryRoutesModel } from '../Models/Models'
// const NewRequest =React.lazy(()=>import("../Pages/NewRequest/NewRequest"))
// const PendingRequest = React.lazy(()=>impo)
const PrimaryRoutes = () => {
  return [
      {
label:"New Request",
link:"new-request",
component: (props?:any)=>(<NewRequest {...props}/>)

},
{
    label:"Pending Request",
    link:"pending-request",
    component: (props?:any)=>(<PendingRequest {...props}/>)
},
{
    label:"Files",
    link:"files",
    component:(props?:any)=>(<Files {...props} />)

},
{
    label:"Files",
    link:"files/:id",
    component:(props?:any)=>(<Files {...props} />)

}
  ]
}

export default PrimaryRoutes