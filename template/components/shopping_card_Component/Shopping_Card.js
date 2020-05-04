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
function handleChange(value) {
  console.log(`selected ${value}`);
}

const error1 = () => {
  message.error("Lütfen ilk önce giriş yapınız.");
};

const error2 = () => {
  message.error("Lütfen ilk önce ürün seçiniz.");
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
          console.log(this.props.cart);
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
              values.user_city +
              "/" +
              values.user_nation;
            var creditCardExDate =
              "" + values.card_month + "/" + values.card_year;
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
              creditCardNo.value,
              creditCardFullName.value,
              creditCardExDate,
              cvv.value,
            ];
            console.log(
              this.props.cart,
              user_real_name.value,
              this.props.profile.user_id,
              user_real_surname.value,
              address,
              user_phone.value,
              creditCardNo.value,
              creditCardFullName.value,
              creditCardExDate,
              cvv.value
            );

            console.log(address);
            var obj = getConnectionLink(
              "cart",
              paramsNames,
              paramsValues,
              "POST"
            );
            this.props.shoppingPage(obj);
          } else {
            notification["error"]({
                message: " İlk önce ürün yükleyiniz.",
                placement: "bottomRight",
              });
          }
        }
      });
    };

    totalPrice()
    {
        var total = 0;
        this.props.cart.map((cartItem) => {total+= (cartItem.product.product_price*cartItem.quantity)})
        var totalString = total.toFixed(2);
        var rounded = Number(totalString);
        return(<h1>${rounded}</h1>)
    }

    removeFromCart(product) {
      this.props.removeFromCart(product);
      notification["error"]({
        message: product.product_name + " Başarıyla Silindi",
        placement: "bottomRight",
      });
      console.log(product);
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

          <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
            SEPETİ ONAYLA
          </h1>
          <Card
            bodyStyle={{ padding: "20px" }}
            style={{ marginBottom: "20px" }}
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
                      <Select
                        style={{ marginBottom: "20px" }}
                        onChange={handleChange}
                      >
                        <Option value="amaringa">Amaringa</Option>
                        <Option value="türkiye">Türkiye</Option>
                        <Option value="ruskisuka">Ruski Suka</Option>
                      </Select>
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
                      <Select
                        style={{ marginBottom: "20px" }}
                        onChange={handleChange}
                      >
                        <Option value="istanbul">İstanbul</Option>
                        <Option value="ankara">Ankara</Option>
                        <Option value="izmir">İzmir</Option>
                      </Select>
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
                  <FormItem label="Kart No:" {...formItemLayout} hasFeedback>
                    {getFieldDecorator("creditCardNo", {
                      rules: [
                        {
                          required: true,
                          message: "Kart Numarası boş bırakılamaz",
                        },
                        {
                          pattern:
                            "^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35d{3})d{11})$",
                          message:
                            "Lütfen Kart Numarası Değeri Doğru Girilsin!",
                        },
                      ],
                    })(
                      <Input
                        style={{ marginBottom: "20px" }}
                        placeholder="Kart Numarası "
                      />
                    )}
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

                  <FormItem label="Son Ay:" {...formItemLayout} hasFeedback>
                    {getFieldDecorator("card_month", {
                      rules: [
                        {
                          required: true,
                          message: "Ay boş bırakılamaz",
                        },
                      ],
                    })(
                      <Select
                        style={{ marginBottom: "20px" }}
                        onChange={handleChange}
                      >
                        <Option value="05">05</Option>
                        <Option value="06">06</Option>
                        <Option value="07">07</Option>
                      </Select>
                    )}
                  </FormItem>

                  <FormItem label="Son Yıl:" {...formItemLayout} hasFeedback>
                    {getFieldDecorator("card_year", {
                      rules: [
                        {
                          required: true,
                          message: "Yıl boş bırakılamaz",
                        },
                      ],
                    })(
                      <Select
                        style={{ marginBottom: "20px" }}
                        onChange={handleChange}
                      >
                        <Option value="21">21</Option>
                        <Option value="22">22</Option>
                        <Option value="23">23</Option>
                      </Select>
                    )}
                  </FormItem>

                  <FormItem label="CVV:" {...formItemLayout} hasFeedback>
                    {getFieldDecorator("cvv", {
                      rules: [
                        {
                          required: true,
                          message: "CCV boş bırakılamaz",
                        },
                        ,
                        {
                          pattern: "^[0-9]{3,4}$",
                          message:
                            "Lütfen CCV değeri En Az 3, En Fazla 4 Karakterden Oluşsun!",
                        },
                      ],
                    })(
                      <Input
                        style={{ marginBottom: "20px" }}
                        placeholder="CCV "
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
