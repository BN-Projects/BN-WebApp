import { Button, Checkbox, Form, Row, Carousel, Col, Card } from 'antd';
import { Eye, Mail, Triangle } from 'react-feather';
import Modal from '../demos/antd/login-form';
import { Caption, Figure, Image, Title } from './styles/Media';

import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';

const FormItem = Form.Item;

const Homepage = () => (

  <Row >
    <Col lg={24} md={24} >
      <Carousel autoplay >
        <div style={{width:10}}>
          <img
          style={{ width: '100%', maxHeight: '40vh',objectFit:'scale-down'}} 
            alt="example"
            src="https://www.patidogclub.com/wp-content/uploads/2017/04/kopek-orta.png"
          />
        </div>
        <div>
          <img
          style={{ width: '100%', maxHeight: '40vh',objectFit:'scale-down' }} 
            alt="example"
            src="https://www.patidogclub.com/wp-content/uploads/2017/12/yavru-kopekler-icin-tasma-egitimi.jpg"
          />
        </div>
      </Carousel>
    </Col>
  </Row>
);

export default Homepage;
