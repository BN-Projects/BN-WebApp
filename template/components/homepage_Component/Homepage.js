import { Button, Checkbox, Form, Row, Carousel, Col, Card } from "antd";
import Signup from "../sign_in_sign_up_Component/login-form";

import React, { Component } from "react";
//importlar
import { getConnectionLink } from "../../lib/connector";
import { connect } from "react-redux";
import * as authActions from "../../redux/actions/authActions";
import { bindActionCreators } from "redux";
import * as productActions from "../../redux/actions/productActions";

const FormItem = Form.Item;

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }
  componentDidMount() {
    var paramsNames = [];
    var paramsValues = [];
    var obj = getConnectionLink("products", paramsNames, paramsValues, "POST");
    this.props.actions.ProductPage(obj);
    console.log(this.props.product_data);
    this.props.product_data;
    this.setState({ products: this.props.product_data }, function() {
      console.log(this.state.products);
    });
  }

  /*
  componentDidUpdate() {
    if (this.props.currentToken == "") {
      console.log("TOKEN YOK", this.props.currentToken);
      console.log(this.show);
      debugger;

    } else {
      console.log("TOKEN VAR", this.props.currentToken);

    }
  }*/

  /* SEPET KISMI OLUNCA YAPILACAK
    onSubmit = e => {
      e.preventDefault();
    };
  */
  render() {
    return (
      <Row>
        <Col lg={24} md={24}>
          <Carousel autoplay>
            <div style={{ width: 10 }}>
              <img
                style={{ width: "100%", maxHeight: "60vh" }}
                alt="example"
                src="https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2019/02/dog-451643.jpg?h=bf654dbc&itok=MQGvBmuo"
              />
            </div>
            <div>
              <img
                style={{ width: "100%", maxHeight: "60vh" }}
                alt="example"
                src="https://icatcare.org/app/uploads/2018/06/Layer-1704-1920x840.jpg"
              />
            </div>
            <div>
              <img
                style={{ width: "100%", maxHeight: "60vh" }}
                alt="example"
                src="https://anf.scene7.com/is/image/anf/k-20200223-USCA-HP-D-NA-3?$marketing$&scl=1"
              />
            </div>
          </Carousel>
        </Col>
        <Row>
          <Col lg={12} md={24}>
            <Card style={{ margin: "20px" }}>
              <Row>
                <Col lg={18} md={36}>
                  <h2 style={{ marginBottom: "30px" }}>Kaybolmaya Son!</h2>
                  <p style={{ marginBottom: "20px" }}>
                    Sen de Benimki Nerede ürünlerinden edin.
                  </p>
                  <Button size="large" href="products">
                    <a>SİPARİŞ VER!</a>{" "}
                  </Button>
                </Col>
                <Col lg={6} md={12}>
                  <img
                    style={{
                      maxWidth: "130px",
                      maxHeight: "130px",
                      margin: "27px"
                    }}
                    alt="example"
                    src="https://cdn.onlinewebfonts.com/svg/img_564088.png"
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card style={{ margin: "20px" }}>
              <Row>
                <Col lg={18} md={36}>
                  <h2 style={{ marginBottom: "30px" }}>Sen de Bize Katıl!</h2>
                  <p style={{ marginBottom: "20px" }}>
                    Sen de uygulamayı yükle ve Benimki Nerede ailesine katıl.
                  </p>
                  <Button size="large">
                    <Signup />
                  </Button>
                </Col>
                <Col lg={6} md={12}>
                  <img
                    style={{ maxWidth: "150px", maxHeight: "150px" }}
                    alt="example"
                    src="https://pngimage.net/wp-content/uploads/2018/06/png-icon-people.png"
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    product_data: state.productlistReducer,
    currentToken: state.authReducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ProductPage: bindActionCreators(productActions.ProductPage, dispatch),
      loginUser: bindActionCreators(authActions.loginUser, dispatch)
    }
  };
}
//actions aldik
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
