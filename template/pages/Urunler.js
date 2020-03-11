import Header from '../components/styles/Header'
import { Card, Col, Row, } from 'antd'
import { Component } from 'react'
import ProductOne from '../components/ProductOne'

class Urunler extends Component {
    render() {
        return (
        <div>
          <Header> </Header>
            <Row gutter={16} id="components-button-demo">
                <Col lg={6} md={12}>
                    <Card bodyStyle={{ padding: 0 }} style={{ marginBottom:'20px'}}>
                        <ProductOne/>
                    </Card>   
                    <Card bodyStyle={{ padding: 0 }} style={{ marginBottom:'20px'}}>
                        <ProductOne/>
                    </Card> 
                </Col>
                <Col lg={6} md={12}>
                    <Card bodyStyle={{ padding: 0 }} style={{ marginBottom:'20px'}}>
                        <ProductOne/>
                    </Card> 
                    <Card bodyStyle={{ padding: 0 }} style={{ marginBottom:'20px'}}>
                        <ProductOne/>
                    </Card> 
                </Col>
                <Col lg={6} md={12}>
                    <Card bodyStyle={{ padding: 0 }} style={{ marginBottom:'20px'}}>
                        <ProductOne/>
                    </Card> 
                    <Card bodyStyle={{ padding: 0 }} style={{ marginBottom:'20px'}}>
                        <ProductOne/>
                    </Card> 
                </Col>
                <Col lg={6} md={12}>
                    <Card bodyStyle={{ padding: 0 }} style={{ marginBottom:'20px'}}>
                        <ProductOne/>
                    </Card> 
                    <Card bodyStyle={{ padding: 0 }} style={{ marginBottom:'20px'}}>
                        <ProductOne/>
                    </Card> 
                </Col>
                
            </Row>
        </div>
          
        );
      }
    }
    
export default Urunler