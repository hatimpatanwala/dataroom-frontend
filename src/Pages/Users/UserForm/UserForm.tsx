import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserForm.css';
import CompanyInfoForm from './Components/CompanyInfoForm/CompanyInfoForm';
import FinancialForm from './Components/FinancialForm/FinancialForm';
import CreditorsForm from './Components/CreditorsForm/CreditorsForm';
import ShareHolderInfo from './Components/ShareHolderInfo/ShareHolderInfo';
import DebitorsForm from './Components/DebitorsForm/DebitorsForm';
import SuccessfulForm from './Components/SuccessfulForm/SuccessfulForm';

interface formDetails {}
const UserForm = (props: any) => {
  let history = useNavigate();
  const [values, setValues] = useState<any>(null);
  useEffect(() => {
    console.log(values);
    console.log(props.reqData);
    if (!values && props.reqData) {
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/api/V1/request/getrequest?uid=${props.reqData.uid}&request_id=${props.reqData.id}`
        )
        .then((res) => {
          console.log(res);
          const { data } = res;
          console.log(data);
          setValues(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      history('/users/invalid');
    }
    console.log(props.reqData);
  }, [props.reqData]);
  useEffect(() => {
    if (values) {
      if (
        !values.address &&
        !values.company_info &&
        !values.company_name &&
        !values.phoneno
      ) {
        history('/users/form/company-info');
        return;
      }
      if (!values.financials) {
        history('/users/form/financial-info');
        return;
      }
      if (!values.creditors) {
        history('/users/form/creditors-info');
        return;
      }
      if (!values.debitors) {
        history('/users/form/debitors-info');
        return;
      }
      history('/users/form/successful');
    }
  }, [values]);
  const uploadProps: UploadProps = {};
  const updateValues = (vals: any) => {
    const tempVals = { ...values, ...vals };
    console.log(tempVals);
    setValues(tempVals);
  };
  return (
    <Layout className='user-form-container'>
      <div className='usersForm-wrapper'>
        <Routes>
          <Route
            path='company-info'
            element={
              <CompanyInfoForm values={values} updateValues={updateValues} />
            }
          />
          <Route
            path='financial-info'
            element={
              <FinancialForm values={values} updateValues={updateValues} />
            }
          />
          <Route
            path='creditors-info'
            element={
              <CreditorsForm values={values} updateValues={updateValues} />
            }
          />
          <Route
            path='debitors-info'
            element={
              <DebitorsForm values={values} updateValues={updateValues} />
            }
          />
          <Route
            path='share-holder-info'
            element={
              <ShareHolderInfo values={values} updateValues={updateValues} />
            }
          />
          <Route />
          <Route path='successful' element={<SuccessfulForm />} />
        </Routes>
      </div>
    </Layout>
  );
};

export default UserForm;
