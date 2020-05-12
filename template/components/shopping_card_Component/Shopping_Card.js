import Header from "../../components/styles/Header";
import { Component } from "react";
import {
  AutoComplete,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Card,
  message,
  notification,
} from "antd";
import PropTypes from "prop-types";
import { getConnectionLink } from "../../lib/connector";
import { connect } from "react-redux";
import * as authActions from "../../redux/actions/authActions";
import { bindActionCreators } from "redux";
import * as shoppingActions from "../../redux/actions/shoppingActions";
import * as cartActions from "../../redux/actions/cartActions";
import * as profileViewActions from "../../redux/actions/profileViewActions";
import Router from "next/router";
import CreditCardInput from "react-credit-card-input";

function handleChange(value) {}

const error1 = () => {
  message.error("Lütfen ilk önce giriş yapınız.");
};

const error2 = () => {
  message.error("Lütfen ilk önce ürün seçiniz.");
};

const error = () => {
  message.error("Sepet Onaylama Sırasında Bir Hata Oluştu!");
};

const success = () => {
  message.success("Sepet Onaylama Başarı ile Gerçekleştirildi!");
};

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const ProductForm = Form.create()(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        cart: "",
        loaded: false,
      };
    }
    componentDidMount() {
      setTimeout(() => {
        if (this.props.currentToken == "") {
          error1();
          Router.push("/homepage");
        }
      }, 700);
      setTimeout(() => {
        if (this.props.cart == "") {
          error2();
          Router.push("/products");
        }
      }, 700);
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          if (this.props.cart.length != 0) {
            var address =
              "" +
              user_address.value +
              " " +
              user_city.value +
              "/" +
              user_nation.value;
            var paramsNames = [
              "orders",
              "user_real_name",
              "user_id",
              "user_surname",
              "user_address",
              "user_phone",
              "creditCardNo",
              "creditCardFullName",
              "creditCardExDate",
              "cvv",
            ];
            var paramsValues = [
              this.props.cart,
              user_real_name.value,
              this.props.profile.user_id,
              user_real_surname.value,
              address,
              user_phone.value,
              this.state.cardNumber,
              creditCardFullName.value,
              this.state.expiryDate,
              this.state.cvc
            ];
            var obj = getConnectionLink(
              "cart",
              paramsNames,
              paramsValues,
              "POST"
            );
            this.props.shoppingPage(obj);
            success();
          } else {
            error();
          }
        }
      });
    };

    totalPrice() {
      var total = 0;
      this.props.cart.map((cartItem) => {
        total += cartItem.product.product_price * cartItem.quantity;
      });
      var totalString = total.toFixed(2);
      var rounded = Number(totalString);
      return <h1>{rounded}</h1>;
    }

    removeFromCart(product) {
      this.props.removeFromCart(product);
      notification["error"]({
        message: product.product_name + " Başarıyla Silindi",
        placement: "bottomRight",
      });
    }
    handleCardNumberChange(e){
      this.setState({cardNumber:e.target.value},function(){
        console.log(this.state.cardNumber);
      });
    }
    handleExpiryDateChange(e){
      this.setState({expiryDate:e.target.value},function(){
        console.log(this.state.expiryDate);
      });
    }
    handleCVCChange(e){
      this.setState({cvc:e.target.value},function(){
        console.log(this.state.cvc);
      });
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      const { autoCompleteResult } = this.state;

      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const formItemSelectLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 10 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 10 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
      const prefixSelector = getFieldDecorator("prefix", {
        initialValue: "86",
      })(
        <Select style={{ width: 70 }}>
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
        </Select>
      );
      return (
        <div>
          <Header></Header>

          <h1 style={{ textAlign: "center", margin: "30px" }}>
            SEPETİ ONAYLA
          </h1>
          <Card
            bodyStyle={{ padding: "20px" }}
            style={{  margin: "30px" }}
          >
            <Form onSubmit={this.handleSubmit}>
              <Row gutter={16} id="components-button-demo">
                <Col lg={8} md={16}>
                  <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
                    Fatura Bilgileri
                  </h3>

                  <FormItem label="İsim:" {...formItemLayout} hasFeedback>
                    {getFieldDecorator("user_real_name", {
                      rules: [
                        {
                          required: true,
                          message: "İsim boş bırakılamaz",
                        },
                        {
                          pattern: "[A-Za-z]{2}",
                          message:
                            "Lütfen İsim değeri En Az 2 Karakterden Oluşsun!",
                        },
                      ],
                    })(
                      <Input
                        style={{ marginBottom: "20px" }}
                        placeholder="İsim "
                      />
                    )}
                  </FormItem>
                  <FormItem label="Soyisim:" {...formItemLayout} hasFeedback>
                    {getFieldDecorator("user_real_surname", {
                      rules: [
                        {
                          required: true,
                          message: "Soyisim boş bırakılamaz",
                        },
                        {
                          pattern: "[A-Za-z]{2}",
                          message:
                            "Lütfen Soyisim değeri En Az 2 Karakterden Oluşsun!",
                        },
                      ],
                    })(
                      <Input
                        style={{ marginBottom: "20px" }}
                        placeholder="Soyisim "
                      />
                    )}
                  </FormItem>

                  <FormItem label="Adres:" {...formItemLayout} hasFeedback>
                    {getFieldDecorator("user_address", {
                      rules: [
                        {
                          required: true,
                          message: "Adres boş bırakılamaz",
                        },
                      ],
                    })(
                      <Input
                        style={{ marginBottom: "20px" }}
                        placeholder="Adres"
                      />
                    )}
                  </FormItem>
                  <FormItem label="Ülke:" {...formItemLayout} hasFeedback>
                    {getFieldDecorator("user_nation", {
                      rules: [
                        {
                          required: true,
                          message: "Ülke boş bırakılamaz",
                        },
                      ],
                    })(
                      <Input
                        style={{ marginBottom: "20px" }}
                        placeholder="Ülke "
                      />
                    )}
                  </FormItem>

                  <FormItem label="Şehir:" {...formItemLayout} hasFeedback>
                    {getFieldDecorator("user_city", {
                      rules: [
                        {
                          required: true,
                          message: "Şehir boş bırakılamaz",
                        },
                      ],
                    })(
                      <Input
                        style={{ marginBottom: "20px" }}
                        placeholder="Şehir "
                      />
                    )}
                  </FormItem>

                  <FormItem
                    label="Telefon Numarası:"
                    {...formItemLayout}
                    hasFeedback
                  >
                    {getFieldDecorator("user_phone", {
                      rules: [
                        {
                          required: true,
                          message: "Telefon Numarası boş bırakılamaz",
                        },
                        {
                          pattern: "^[+]([0-9]{2})[0-9]{10}$",
                          message:
                            "Lütfen Telefon değerinin başında (+90) değerini unutmayınız!",
                        },
                      ],
                    })(
                      <Input
                        style={{ marginBottom: "20px" }}
                        placeholder="Telefon Numarası"
                      />
                    )}
                  </FormItem>
                </Col>
                <Col lg={8} md={16}>
                  <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
                    Kart Bilgileri
                  </h3>
                  <FormItem label="Kart Bilgileri:" {...formItemLayout} hasFeedback>
                     <CreditCardInput
                     cardNumberInputProps={{ value: this.state.cardNum, onChange: (e) => this.handleCardNumberChange(e) }}
                     cardExpiryInputProps={{ value: this.state.exp, onChange: (e) => this.handleExpiryDateChange(e) }}
                     cardCVCInputProps={{ value: this.state.cvcc, onChange: (e) => this.handleCVCChange(e) }}
                     fieldClassName="input"
                   />
                  </FormItem>

                  <FormItem
                    label="Karttaki İsim:"
                    {...formItemLayout}
                    hasFeedback
                  >
                    {getFieldDecorator("creditCardFullName", {
                      rules: [
                        {
                          required: true,
                          message: "Kart Üzerindeki İsim boş bırakılamaz",
                        },
                        {
                          pattern: "[A-Za-z]{2}",
                          message:
                            "Lütfen Kart Üzerindeki İsim değeri En Az 2 Karakterden Oluşsun!",
                        },
                      ],
                    })(
                      <Input
                        style={{ marginBottom: "20px" }}
                        placeholder="Kart Üzerindeki İsim "
                      />
                    )}
                  </FormItem>
                  
                </Col>
                <Col style={{ textAlign: "center" }} lg={8} md={16}>
                  <h3 style={{ marginBottom: "20px" }}>Sepet</h3>

                  {this.props.cart.map((cartItem) => (
                    <Card
                      key={cartItem.product.product_id}
                      bodyStyle={{ padding: "20px" }}
                      style={{ marginBottom: "20px" }}
                    >
                      <Button
                        type="danger"
                        onClick={() => this.removeFromCart(cartItem.product)}
                      >
                        X
                      </Button>{" "}
                      {cartItem.product.product_name} - $
                      {cartItem.product.product_price} ({cartItem.quantity}{" "}
                      Adet)
                    </Card>
                  ))}
                </Col>
              </Row>
              <Row style={{ marginTop: "200px" }}>
                <Col lg={3} md={16}>
                  <h3>Ödeme Tutarı: </h3>
                </Col>
                <Col lg={2} md={16}>
                  {this.totalPrice()}
                </Col>
                <Col lg={3} md={16}>
                  <h5>TL </h5>
                </Col>
                <Col lg={3} md={16}></Col>
              </Row>
              <div style={{ textAlign: "right" }}>
                <FormItem {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    {" "}
                    SEPETi ONAYLA{" "}
                  </Button>
                </FormItem>
              </div>
            </Form>
          </Card>
        </div>
      );
    }
  }
);

class CartsAdd extends React.Component {
  render() {
    return (
      <ProductForm
        removeFromCart={this.props.actions.removeFromCart}
        currentToken={this.props.currentToken}
        profile={this.props.profile}
        cart={this.props.cart}
        shoppingPage={this.props.actions.shoppingPage}
      ></ProductForm>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
    currentToken: state.authReducer,
    profile: state.profileViewReducer,
    shopping_data: state.shoppingReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
      shoppingPage: bindActionCreators(shoppingActions.shoppingPage, dispatch),
      profilePage: bindActionCreators(
        profileViewActions.ProfileInformation,
        dispatch
      ),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CartsAdd);
