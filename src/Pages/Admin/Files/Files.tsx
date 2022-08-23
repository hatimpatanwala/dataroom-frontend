import React, { useEffect, useState } from 'react';
import { List, Card, Row, Col, message, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Files.css';

const data = [
  {
    label: 'Company_info',
    type: '1',
    key: '1',
  },
  {
    label: '2',
    type: 'folder',
    key: '2',
  },
  {
    label: '3',
    type: 'folder',
    key: '3',
  },
];
const Files = (props: any) => {
  const history = useNavigate();
  const [completeReq, setCompletedReq] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<string>('');

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/V1/admin/requests?uid=${props.userInfo.id}&status=completed`,
        {
          headers: {
            Authorization: props.userInfo.token,
          },
        }
      )
      .then((res) => {
        setCompletedReq(res.data.data);
        console.log(res.data.data);
        setIsLoading(false);
        if (res.data.length) {
          message.warning('No files');
        }
      })
      .catch((err) => {
        console.log(err);
        message.error('something went wrong');
        setIsLoading(false);
      });
  }, []);
  const singleClick = (evt: any, id: string) => {
    console.log(id);

    setIsActive(id);
  };

  return (
    <>
      {isLoading ? (
        <Spin tip='Loading...' />
      ) : (
        <Row gutter={10} style={{ marginRight: '0px', marginLeft: '0px' }}>
          {completeReq.map((d: any) => {
            return (
              <Col span={6} className='folder-container' key={d.id}>
                <Card
                  className={`cards ${isActive === d.id ? 'is-active' : ''}`}
                  onClick={(evt) => singleClick(evt, d.id)}
                  onDoubleClick={() => {
                    history('/files/' + d.id);
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
                      <div>{d.company_name}</div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default Files;
