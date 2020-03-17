import Header from '../components/styles/Header'
import { Card, Col, Row, } from 'antd'
import { Component } from 'react'

import ProductStocked from '../components/ProductStocked'

class stockView extends Component {
    render() {
        return (
        <div>
          <Header> </Header>
            <ProductStocked/>
            <ProductStocked/>
            <ProductStocked/>
            <ProductStocked/>
            <ProductStocked/>
            <ProductStocked/>
            <ProductStocked/>
            <ProductStocked/>
          </div>
          
          );
        }
      }
      
  export default stockView