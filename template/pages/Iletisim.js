import Header from '../components/styles/Header'

import { Component } from 'react'
import StatCard from '../components/shared/StatCard';
import {
    Smartphone,
    PhoneCall,
    Mail,
    MapPin
  } from 'react-feather';
  import {
    Col,
    Message,
    Row,
    Card,
    Input,
    Divider
  } from 'antd';
import { theme } from '../components/styles/GlobalStyles';
import { getConnectionLink } from "../../lib/connector";
import { connect } from "react-redux";
import * as authActions from "../../redux/actions/authActions";
import { bindActionCreators } from "redux";
import * as contactFormActions from "../../redux/actions/contactFormActions";
import * as profileViewActions from '../../redux/actions/profileViewActions'
import md5 from 'md5';
import Router from "next/router"

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
  
  const { TextArea } = Input;
  
  const MY_API = 'AIzaSyBsBmHQjXxz2uyMIyUHtVU8h3iuQWQ7xC4'
    let _url = `https://www.google.com/maps/embed/v1/place?key=${MY_API}&q=40.7127837,-74.0059413`
   
const ContactForm = Form.create()(

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
    
          
      }
      componentDidUpdate() {
        
    
          if (this.props.profile.user_password != "" && !this.state.loaded) {
              
            this.setState({loaded: true }, function () {
              
    
              });
          }
      }
    
      handleSubmit = (err,values)  => {
        if (!err) {
          var paramsNames = ["email","msg","name","surname","title"];
          var paramsValues = [email.value,msg.value,name.value,surname.value,title.value];
    
           var obj = getConnectionLink(
             "contactmail",
             paramsNames,
             paramsValues,
             "POST"
           );
          this.props.passwordChangePage(obj);
          success();
    
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
                <Card  style={{ marginBottom:'20px'}}>
                    <Divider orientation="left">
                        <small>İletişim Formu</small>
                     </Divider>
                     <Form onSubmit={(e) => {
                  e.preventDefault();
                  form.validateFields((err, values) => this.handleSubmit(err, values));
                    }}>
                            
                      <FormItem
                        label="İsim:"
                        {...formItemLayout}
                        
                      >
                        {getFieldDecorator("name", {
                          rules: [
                            {
                              required: true,
                              message: "İsminiz boş bırakılamaz",
                            },
                          ],
                        })(<Input placeholder="İsminizi giriniz." 
                        onChange={e => {
                          this.setState({ [e.target.name]: e.target.value });
                        }} />)}
                      </FormItem>
                      <br />
                      <FormItem label="Soyisminiz:" {...formItemLayout}>
                        {getFieldDecorator("surname", {
                          rules: [
                            {
                              required: true,
                              message: "Soyisminiz boş bırakılamaz",
                            },
                          ],
                        })(<Input placeholder="Soyisminizi giriniz." 
                        onChange={e => {
                          this.setState({ [e.target.name]: e.target.value });
                        }}/>)}
                      </FormItem>
                      <FormItem label="Email:" {...formItemLayout}>
                        {getFieldDecorator("email", {
                          rules: [
                            {
                              required: true,
                              message: "Email boş bırakılamaz",
                            },
                          ],
                        })(<Input placeholder="Emailinizi giriniz." 
                        onChange={e => {
                          this.setState({ [e.target.name]: e.target.value });
                        }}/>)}
                      </FormItem>
                      <FormItem label="Konu:" {...formItemLayout}>
                        {getFieldDecorator("title", {
                          rules: [
                            {
                              required: true,
                              message: "Konu boş bırakılamaz",
                            },
                          ],
                        })(<Input placeholder="Konunuzu giriniz." 
                        onChange={e => {
                          this.setState({ [e.target.name]: e.target.value });
                        }}/>)}
                      </FormItem>
                      <FormItem label="Mesajınız:" {...formItemLayout}>
                        {getFieldDecorator("msg", {
                          rules: [
                            {
                              required: true,
                              message: "Mesajınız boş bırakılamaz",
                            },
                          ],
                        })(<TextArea rows={4} placeholder="Metininizi Giriniz" 
                        onChange={e => {
                          this.setState({ [e.target.name]: e.target.value });
                        }}/>)}
                      </FormItem>
                      <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                          {" "}
                          GÖNDER{" "}
                        </Button>
                      </FormItem>
                    </Form>
                    </Card>   
                
                <Row>
                  <Col lg={4} md={1}></Col>
                  
                  <Col lg={16} md={22}>
                    
                  </Col>
                </Row>
            </div>
          );
        }
      }
    );
    

class Contact extends Component {
    render() {
        return (
            <ProductForm
            passwordChangePage={this.props.actions.passwordChangePage}
            currentToken={this.props.currentToken}
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
  export default connect(mapStateToProps, mapDispatchToProps)(Contact);
  

