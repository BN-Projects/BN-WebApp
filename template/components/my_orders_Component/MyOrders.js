import { Collapse, Card, Col, Row, Steps,Button } from "antd";
import React, { Component } from "react";

const Panel = Collapse.Panel;
const Step = Steps.Step;
var deger = 3;
const description = (
  <Row>
    <Col md={3}>
      <Card
        bodyStyle={{ padding: 0 }}
        actions={null}
        body={null}
        cover={
          <img
            alt="example"
            src="https://www.patidogclub.com/wp-content/uploads/2017/12/yavru-kopekler-icin-tasma-egitimi.jpg"
          />
        }
      >
        {null}
      </Card>
    </Col>
    <Col md={1}>
      <div></div>
    </Col>
    <Col md={16}>
      <p style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold" }}>
        Sipariş 1 ürün bu mükemmel beacon et pastorma x2 Adet{" "}
      </p>
      <p style={{ marginTop: "10px", fontSize: "13px" }}>
        Sipariş açıklaması: En mükemmel beacon paketleri sizlerle{" "}
      </p>
    </Col>
    <Col md={3}>
      <div>
        <p style={{textAlign:"right"}}> Tarih : 12.05.2020</p>
        <h1 style={{ fontSize: "18px", margin: "auto" }}>Toplam Fiyat= 99$</h1>
        
      </div>
    </Col>
  </Row>
);

const metin = () => {
  if (deger == 3) {
    return (
      <div>
        <p style={{fontSize:"20px",marginTop:"5px"}}>
          Siparişiniz kargoya verildi. XXXXXXXXX takip numarasıyla durumunu
          kontrol edebilirsiniz.
        </p>
        <Button type="primary">Siparişinizi Sorgulamak İçin</Button>
      </div>
    )
  }
}

const text = (
  <Row>
    <Col md={24}> </Col>
    <Col lg={2} xl={4}>
      {" "}
    </Col>
    <Col sm={24} lg={20} xl={16}>
      <div style={{ margin: "auto", position: "relative" }}>
        <Steps current={deger}>
          <Step title="Siparişiniz Alındı" description="Onay bekleniyor" />
          <Step
            title="Siparişiniz Onaylandı"
            description="Kargoya verilmesi bekleniyor"
          />
          <Step title="Siparişiniz Kargoya Verildi" />
        </Steps>
      </div>
    </Col>
    <Col md={24}>
      <Col md={3} lg={5}></Col>
      <Col md={18} lg={14}>
        {metin()}
      </Col>
      <Col md={3} lg={5}></Col>
    </Col>
  </Row>
);

class myOrders extends Component {
  render() {
    return (
        <Row>
        <Col md={2} lg={3} sm={24} xs={24}></Col>
        <Col md={20} lg={18} sm={24} xs={24}>
      <Collapse bordered={false} /*defaultActiveKey={["1"]}*/>
        <Panel showArrow={false} header={description} key="1">
          {text}
        </Panel>
        <Panel showArrow={false} header={description} key="2">
          {text}
        </Panel>
        <Panel showArrow={false} header={description} key="3">
          {text}
        </Panel>
      </Collapse>
      </Col>
      </Row>
    );
  }
}
export default myOrders;
