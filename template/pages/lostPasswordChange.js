import LostPasswordChangeCard from '../components/profile_page_Component/LostPasswordChangeCard';
import Header from '../components/styles/Header'
import { Component } from 'react'
import { Row, Col } from 'antd'


class lostPasswordChangeCard extends Component {
    render() {
        return (
            <div>
                <Header> </Header>
                <Row>
                <Col lg={4} md={1}> 
                    </Col>
                    <Col lg={16} md={22}>
                        <LostPasswordChangeCard />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default lostPasswordChangeCard;