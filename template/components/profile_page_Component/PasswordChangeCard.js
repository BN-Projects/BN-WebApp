import {
  AutoComplete,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Card,
  Divider,
  message,
} from "antd";
import PropTypes from "prop-types";
import { getConnectionLink } from "../../lib/connector";
import { connect } from "react-redux";
import * as authActions from "../../redux/actions/authActions";
import { bindActionCreators } from "redux";
import * as passwordChangeActions from "../../redux/actions/passwordChangeActions";
import * as profileViewActions from '../../redux/actions/profileViewActions'
import md5 from 'md5';
import Router from "next/router"

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const error = () => 
{
  message.error("Lütfen Giriş Yapın.")
}

const ProductForm = Form.create()(
  
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        password: "",
        loaded: false,
      };
    }
    componentDidMount() {
      setTimeout(() => {
        if(this.props.currentToken =="")
        {
          error();
          Router.push("/homepage") 
        }
      }, 700);
      if (this.props.password_data == "") {
          var paramsNames = [];
          var paramsValues = [];
          var obj = getConnectionLink(
              "changepassword",
              paramsNames,
              paramsValues,
              "POST"
          );
          this.props.actions.passwordChangePage(obj);
          console.log(this.props.profile.user_password);
          this.props.password_data;      }
      else {
          this.setState({ password: this.props.profile.user_password, loaded: true }, function () {
              console.log(this.state.password);
          });
      }
  }
  componentDidUpdate() {
    console.log(this.props.profile.user_password)

      if (this.props.profile.user_password != "" && !this.state.loaded) {
          
        this.setState({loaded: true }, function () {
          

          });
      }
  }

  handleSubmit = (err,values)  => {
    if (!err) {
      if(this.props.profile.user_id != ""){ 
      var paramsNames = ["oldPass", "newPass", "newPassAgain","id"];
      var oldPassHash = md5(oldPass.value);
      
      var newPassHash = md5(newPass.value);
      var newPassAgainHash = md5(newPassAgain.value);
      var paramsValues = [oldPassHash, newPassHash, newPassAgainHash, this.props.profile.user_id];
      console.log(this.props.currentToken);

      console.log(newPassHash, newPassAgainHash, oldPassHash, this.props.profile.user_id);
      
       var obj = getConnectionLink(
         "changepassword",
         paramsNames,
         paramsValues,
         "POST"
       );
      console.log(newPassHash)
      console.log(newPassAgainHash)
      this.props.passwordChangePage(obj);
      console.log(paramsValues )
      console.log(paramsNames)
      console.log(obj)
    }
      
      else
      {
        console.log("Hata!!!")
      }
    }
  }
  
    
    render() {
      const { getFieldDecorator } = this.props.form;
      const { autoCompleteResult } = this.state;
      const { onCancel, onCreate, form } = this.props;

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
          <Card title="ŞİFRE DEĞİŞTİRME SAYFASI">
            
            <Row>
              <Col lg={4} md={1}></Col>
              
              <Col lg={16} md={22}>
                <Form onSubmit={(e) => {
              e.preventDefault();
              form.validateFields((err, values) => this.handleSubmit(err, values));
                }}>
                        
                  <FormItem
                    label="Eski Şifreniz:"
                    {...formItemLayout}
                    hasFeedback
                  >
                    {getFieldDecorator("oldPass", {
                      rules: [
                        {
                          required: true,
                          message: "Eski Şifreniz boş bırakılamaz",
                        },
                      ],
                    })(<Input placeholder="Eski Şifrenizi giriniz." 
                    onChange={e => {
                      this.setState({ [e.target.name]: e.target.value });
                    }} />)}
                  </FormItem>
                  <br />
                  <FormItem label="Yeni Şifreniz:" {...formItemLayout}>
                    {getFieldDecorator("newPass", {
                      rules: [
                        {
                          required: true,
                          message: "Yeni Şifreniz boş bırakılamaz",
                        },
                        {                                    
                          pattern: "[A-Za-z0-9]{6}",
                          message: "Yeni şifreniz en az 6 karakterden oluşmalı!"
                        }
                      ],
                    })(<Input placeholder="Yeni Şifrenizi giriniz." 
                    onChange={e => {
                      this.setState({ [e.target.name]: e.target.value });
                    }}/>)}
                  </FormItem>
                  <FormItem label="Yeni Şifreniz (Tekrar):" {...formItemLayout}>
                    {getFieldDecorator("newPassAgain", {
                      rules: [
                        {
                          required: true,
                          message: "Yeni Şifrenizin Tekrarı boş bırakılamaz",
                        },
                        {
                          validator: (rule, value, callback) => {
                              if (value && value !== form.getFieldValue('newPass')) {
                                  callback("Şifreleriniz Uyuşmamaktadır!");
                              } else {
                                  callback();
                              }
                          }
                      }
                      ],
                    })(<Input placeholder="Yeni Şifrenizi Tekrar giriniz." 
                    onChange={e => {
                      this.setState({ [e.target.name]: e.target.value });
                    }}/>)}
                  </FormItem>

                  <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                      {" "}
                      Şifreyi Değiştir{" "}
                    </Button>
                  </FormItem>
                </Form>
              </Col>
            </Row>
          </Card>
        </div>
      );
    }
  }
);

class PasswordChangeCard extends React.Component {
  render() {
    return (
      <ProductForm
        passwordChangePage={this.props.actions.passwordChangePage}
        currentToken={this.props.currentToken}
        profile = {this.props.profile}
      ></ProductForm>
    );
  }
}

function mapStateToProps(state) {
  return {
    password_data: state.passwordChangeReducer,
    currentToken: state.authReducer,
    profile: state.profileViewReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      passwordChangePage: bindActionCreators(passwordChangeActions.passwordChangePage, dispatch),
      profilePage: bindActionCreators(profileViewActions.ProfileInformation, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PasswordChangeCard);
