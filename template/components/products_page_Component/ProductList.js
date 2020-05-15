import React, { Component } from "react";
import PropTypes, { array } from "prop-types";

import {
  Button,
  Col,
  Card,
  Row,
  message,
  notification,
  Popconfirm,
  Icon,
} from "antd";

//importlar
import { getConnectionLink } from "../../lib/connector";
import { connect } from "react-redux";
import * as authActions from "../../redux/actions/authActions";
import { bindActionCreators } from "redux";
import * as productActions from "../../redux/actions/productActions";
import { Pagination } from "antd";
import * as cartActions from "../../redux/actions/cartActions";
import * as productRemoveActions from "../../redux/actions/productRemoveActions";
import * as productEditActions from "../../redux/actions/productEditActions";
import * as productCountActions from "../../redux/actions/productCountActions";

import ProductEditModal from "./ProductEditModal";

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
      productmodal: [],
      visible: false,
      counts: [],
    };
  }
  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };
  componentDidMount() {
    if (this.props.product_data == "") {
      var paramsNames1 = [];
      var paramsValues1 = [];
      var obj = getConnectionLink(
        "products",
        paramsNames1,
        paramsValues1,
        "POST"
      );
      this.props.actions.ProductPage(obj);
      this.props.product_data;

      var paramsNames2 = [];
      var paramsValues2 = [];
      var obj = getConnectionLink(
        "productcount",
        paramsNames2,
        paramsValues2,
        "POST"
      );
      this.props.actions.productCount(obj);
    } else {
      this.setState(
        {
          products: this.props.product_data,
          counts: this.props.productCount,
          loaded: true,
        },
        function() {
        }
      );
    }
  }
  componentDidUpdate() {
    if (this.props.product_data != "" && !this.state.loaded) {
      this.setState(
        {
          products: this.props.product_data,
          counts: this.props.productCount,
          loaded: true,
        },
        function() {
        }
      );
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addTo = (product) => {
    this.props.actions.addToCart({ quantity: 1, product });
    notification["success"]({
      message: product.product_name + " Başarıyla Sepete Eklendi",
      description: product.product_description,
      placement: "bottomRight",
    });
  };

  deleteProduct = (product) => {
    if (product != "") {
      var ProductId = product.product_id;
      var paramsNames = ["id", "type"];
      var paramsValues = [ProductId, "product"];
      var obj = getConnectionLink(
        "deleteitem",
        paramsNames,
        paramsValues,
        "POST"
      );
      this.props.actions.removeProduct(obj);

      notification["success"]({
        message: product.product_name + " Başarıyla Silindi",
        description: product.product_description,
        placement: "bottomRight",
      });
      setTimeout(() => {
        window.location.reload(false);
      }, 700);
    }
  };

  editProduct = (product) => {
    {
      notification["success"]({
        message: product.product_name + " Seçildi",
        description:
          "Ürün Açıklaması: " +
          product.product_description +
          " " +
          "Tipi: " +
          product.type,
        placement: "bottomRight",
      });
    }
    this.setState({ productmodal: product });
    this.setState({ visible: true });
  };

  buttons = (product) => {
    if (this.props.profile.role_lvl == 5) {
      return (
        <div>
          <Button
            type="primary"
            style={{ marginRight: "5px" }}
            onClick={() => {
              this.editProduct(product);
              this.showModal();
            }}
          >
            <Icon type="edit-o"></Icon>
          </Button>
          <Popconfirm
            placement="top"
            title="Silmek istediğinize emin misiniz?"
            onConfirm={() => this.deleteProduct(product)}
            okText="Sil"
            okType="danger"
            cancelText="Vazgeç"
            icon={<Icon type="close-circle-o" style={{ color: "red" }} />}
            placement="bottom"
          >
            <Button type="danger">
              <Icon type="close-o" />
            </Button>
          </Popconfirm>
        </div>
      );
    } else {
      return null;
    }
  };

  search = (product) => {
    const getCartItem = this.props.cartItem.find(carts => carts.product.type == product.type);
    if(getCartItem)
    {
      if(getCartItem.quantity < this.props.productCount[product.type])
      {
        return(<Button type="primary" onClick={() => this.addTo(product)}>
        Sepete Ekle
      </Button>)
      }
      else
      {
        return(<Button type="primary" disabled>
        Sepete Ekle
      </Button>)
      }
    }
    else
    {
      return(<Button type="primary" onClick={() => this.addTo(product)}>
        Sepete Ekle
      </Button>);
    }
  };

  render() {
    var productListPage =[];
    if (this.state.products.length != 0 )
    {
      productListPage.push(
      <div className="productlist">
      {this.state.products.map((product) => (
        <div key={product.product_id}>
          <Col lg={6} md={12}>
            <Card
              bodyStyle={{ padding: 5 }}
              style={{ marginBottom: "20px", margin: 10 }}
            >
              <div float="center">
                <Card
                  extra={this.buttons(product)}
                  cover={
                    <img
                      alt="example"
                      src="https://www.patidogclub.com/wp-content/uploads/2017/12/yavru-kopekler-icin-tasma-egitimi.jpg"
                    />
                  }
                  actions={[
                    this.props.profile.role_lvl == 5 ? (
                      <p>(Beacon Tipi : {product.type})</p>
                    ) : this.props.productCount[product.type] != 0 ? (
                      // <Button
                      //   type="primary"
                      //   onClick={() => this.addTo(product)}
                      // >
                      //   Sepete Ekle
                      // </Button>
                      this.search(product)
                    ) : (
                      <Button
                        type="primary"
                        onClick={() => this.addTo(product)}
                        disabled
                      >
                        Ürün Stokta Yok
                      </Button>
                    ),
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
                    <p>{this.props.productCount[product.type]} Adet</p>
                  </div>
                </Card>
              </div>
            </Card>
          </Col>
        </div> ))}
        </div>)
    }
    else
    {
      productListPage.push(<Card><div className="productempty"><h1 style={{textAlign:"center"}}>Şuan hiçbir ürün yok.</h1></div></Card>)
    }
    return (
      <div className="productPage" style={{ padding: 5 }}>
        {productListPage}
         
        <ProductEditModal
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          productData={this.state.productmodal}
          productEdit={this.props.actions.productEdit}
          currentToken={this.props.currentToken}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    product_data: state.productlistReducer,
    currentToken: state.authReducer,
    profile: state.profileViewReducer,
    removeProduct: state.productRemoveReducer,
    productCount: state.productCountReducer,
    cartItem: state.cartReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ProductPage: bindActionCreators(productActions.ProductPage, dispatch),
      loginUser: bindActionCreators(authActions.loginUser, dispatch),
      addToCart: bindActionCreators(cartActions.addToCart, dispatch),
      removeProduct: bindActionCreators(
        productRemoveActions.productRemovePage,
        dispatch
      ),
      productEdit: bindActionCreators(
        productEditActions.productEditPage,
        dispatch
      ),
      productCount: bindActionCreators(
        productCountActions.productCountPage,
        dispatch
      ),
    },
  };
}
//actions aldik

export default connect(mapStateToProps, mapDispatchToProps)(productList);
