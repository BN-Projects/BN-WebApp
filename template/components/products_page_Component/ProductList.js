import React, { Component } from "react";
import PropTypes from "prop-types";

import { Button, Col, Input, Card, Row , message,notification} from "antd";

//importlar
import { getConnectionLink } from "../../lib/connector";
import { connect } from "react-redux";
import * as authActions from "../../redux/actions/authActions";
import { bindActionCreators } from "redux";
import * as productActions from "../../redux/actions/productActions";
import { Pagination } from "antd";
import * as cartActions from "../../redux/actions/cartActions";

const { Meta } = Card;


// function ProductList(props) {
//   const numbers = props.numbers;
//   const listItems = numbers.map((number) =>
//     <li key={number.toString()}>
//       {number}
//     </li>
//   );
//   return (
//     <ul>{listItems}</ul>
//   );
// }

class productList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loaded: false,
    };
  }
  componentDidMount() {
    if (this.props.product_data == "") {
      var paramsNames = [];
      var paramsValues = [];
      var obj = getConnectionLink(
        "products",
        paramsNames,
        paramsValues,
        "POST"
      );
      this.props.actions.ProductPage(obj);
      console.log(obj)
      console.log(this.props.product_data);
      this.props.product_data;
    } else {
      this.setState(
        { products: this.props.product_data, loaded: true },
        function() {
          console.log(this.state.products);
        }
      );
    }
  }
  componentDidUpdate() {
    if (this.props.product_data != "" && !this.state.loaded) {
      this.setState(
        { products: this.props.product_data, loaded: true },
        function() {
          console.log(this.state.products);
        }
      );
    }
  }
  //yükleniyor al
  //timer ver
  // didupdate de state e at.

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
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addTo = (product) =>
  {
    this.props.actions.addToCart({quantity:1,product})
    message.success(product.product_name + " Başarıyla Sepete Eklendi.");
    notification['success']({
      message: (product.product_name + " Başarıyla Sepete Eklendi"),
      description: (product.product_description),
      placement: "bottomRight"
    });
  }
  render() {
    var productlist = [];
    /*
    if (this.state.products != []) {
      this.state.products.forEach(product => {
        productlist.push(
          <div key={product.product_id}>
            <Col lg={6} md={12} >
              <Card bodyStyle={{ padding: 5 }} style={{ marginBottom: "20px", margin: 10 }}>
                <div float="center">
                  <Card
                    cover={
                      <img
                        alt="example"
                        src="https://www.patidogclub.com/wp-content/uploads/2017/12/yavru-kopekler-icin-tasma-egitimi.jpg"
                      />
                    }
                    actions={[
                      <Button type="primary" block>
                        Sepete Ekle
                      </Button>
                    ]}
                  >
                    <Meta
                      style={{ textAlign: "center" }}
                      title={product.product_description}
                      description={product.product_name}
                    />
                    <br></br>
                    <div className="price-container">
                      <h2>${product.product_price}</h2>
                    </div>
                  </Card>
                </div>
              </Card>
            </Col>
          </div>
        );
      });
    } else {
      productlist = "Yükleniyor.";
    }
*/
    return (
      <div className="productPage" style={{ padding: 5 }}>
        <div className="productlist">
          {this.state.products.map(product => (
                <div key={product.product_id}>
                  <Col lg={6} md={12}>
                    <Card
                      bodyStyle={{ padding: 5 }}
                      style={{ marginBottom: "20px", margin: 10 }}
                    >
                      <div float="center">
                        <Card
                          cover={
                            <img
                              alt="example"
                              src="https://www.patidogclub.com/wp-content/uploads/2017/12/yavru-kopekler-icin-tasma-egitimi.jpg"
                            />
                          }
                          actions={[
                            <Button type="primary" onClick={() =>this.addTo(product)}>
                              Sepete Ekle 
                            </Button>,
                          ]}
                        >
                          <Meta
                            style={{ textAlign: "center" }}
                            title={product.product_name}
                            description={product.product_description}
                          />
                          <br></br>
                          <div className="price-container">
                            <h2>${product.product_price}</h2>
                          </div>
                          
                        </Card>
                      </div>
                    </Card>
                  </Col>
                </div>
              ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    product_data: state.productlistReducer,
    currentToken: state.authReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ProductPage: bindActionCreators(productActions.ProductPage, dispatch),
      loginUser: bindActionCreators(authActions.loginUser, dispatch),
      addToCart: bindActionCreators(cartActions.addToCart, dispatch),
    },
  };
}
//actions aldik

export default connect(mapStateToProps, mapDispatchToProps)(productList);
