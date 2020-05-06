import Header from '../components/styles/Header'
import { Card, Col, Row, } from 'antd'
import { Component } from 'react'

import ProfilCard from '../components/ProfilCard'


class Profil extends Component {
    render() {
        return (
        <div>
          <Header> </Header>
          <Row gutter={16} id="components-button-demo">
                <Col lg={8} md={16}>

                </Col>
                <Col lg={8} md={16}>
                    <Card bodyStyle={{ padding: 0 }} style={{ marginBottom:'20px'}}>
                        <ProfilCard/>
                    </Card> 

                </Col>
                <Col lg={8} md={16}>

                </Col>
            </Row>
        </div>
          
          );
        }
      }
      
  export default Profil