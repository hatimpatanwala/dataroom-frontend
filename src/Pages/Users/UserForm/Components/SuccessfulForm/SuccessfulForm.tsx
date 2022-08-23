import React from 'react';
import './SuccessfulForm.css';
const SuccessfulForm = () => {
  return (
    <div className='successful-container'>
      <div className='successful-wrapper'>
        <div className='success-img'>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/success.png`}
            alt=''
          />
        </div>
        <div className='title-container'>
          <h1 className='title'>Request completed Successfully</h1>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulForm;
