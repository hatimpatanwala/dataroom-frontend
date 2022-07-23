import React from 'react'
import PdfViewer from '../Components/PdfViewer/PdfViewer'
import Files from '../Pages/Admin/Files/Files'
import List from '../Pages/Admin/Files/List/FolderList/List'
import NewRequest from '../Pages/Admin/NewRequest/NewRequest'
import PendingRequest from '../Pages/Admin/PendingRequest/PendingRequest'
import List1 from '../Pages/Admin/Files/List/FileList/List1'
// import { primaryRoutesModel } from '../Models/Models'
// const NewRequest =React.lazy(()=>import("../Pages/NewRequest/NewRequest"))
// const PendingRequest = React.lazy(()=>impo)
const PrimaryRoutes = () => {
  return [
    {
      label: 'New Request',
      link: 'new-request',
      component: (props?: any) => <NewRequest {...props} />,
    },
    {
      label: 'Pending Request',
      link: 'pending-request',
      component: (props?: any) => <PendingRequest {...props} />,
    },
    {
      label: 'Pending Request',
      link: 'pending-request/:reqId',
      component: (props?: any) => <NewRequest {...props} />,
    },
    {
      label: 'Files',
      link: 'files',
      component: (props?: any) => <Files {...props} />,
    },
    {
      label: 'Files',
      link: 'files/:fileId',
      component: (props?: any) => <List {...props} />,
    },
    {
      label: 'Files',
      link: 'files/:fileId/:folderId',
      component: (props?: any) => <List1 {...props} />,
    },
    // {
    //     label:"Pdf Viewer",
    //     link:"files/pdf",
    //     component:(props?:any)=>(<PdfViewer {...props} />)

    // }
  ]
}

export default PrimaryRoutes
