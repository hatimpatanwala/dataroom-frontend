import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Modal } from 'antd'

import './PdfViewer.css'
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const PdfViewer = () => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }
  console.log(pdfjs.version)
  console.log('inside pdf viewer')
  console.log(pdfjs.GlobalWorkerOptions.workerSrc)
  return (
    <Modal visible={true}>
      {/* <iframe src='./1405262114669000.pdf'></iframe> */}
      <div>
        <Document
          file='http://localhost:3000/../1405262114669000.pdf'
          onLoadError={(err) => {
            console.log(err)
          }}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    </Modal>
  )
}

export default PdfViewer
