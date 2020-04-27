import React, { Component } from "react";
import { Button, Form, Input, Modal, Radio, Tabs, Avatar } from "antd";
import { Eye, Mail, Triangle, User } from "react-feather";
import Link from "next/link";
import Router from "next/router";
import { List } from "antd";
import UploadImage from "./UploadImage";
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

const ProfileSettingsModal = Form.create()(
  class extends React.Component {
    submit(err) {
      if (!err) {
        // var paramsNames = ["email", "password"];
        // //console.log(this.state.email)
        // var paramsValues = [email.value, password.value];
        // console.log(email.value);
        // this.props.loginUser("login", paramsNames, paramsValues);
        // //location.reload()
        // //Router.push("/iletisim")
      }
    }

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Modal
          title="Profil Ayarları"
          visible={visible}
          onCancel={onCancel}
          onOk={onCreate}
          width="600px"
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Vazgeç
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Bilgileri Güncelleştir
            </Button>,
          ]}
        >
          <List itemLayout="horizontal">
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar size={100} src="/static/images/face3.jpg" />}
                title={
                  <div>
                    <br></br>
                    <a
                      disabled="disabled"
                      style={{ fontSize: "25px", color: "#403f3f" }}
                    >
                      {" "}
                      Ahmet Burak Hapaz
                    </a>
                  </div>
                }
                description={
                  <small style={{ fontSize: "10px" }}> den55@gmail.com</small>
                }
              />
            </List.Item>
          </List>
          <Form
            layout="vertical"
            onSubmit={(e) => {
              e.preventDefault();
              form.validateFields((err, values) => this.submit(err));
            }}
          >
            <FormItem label="realname">
              {form.getFieldDecorator("realname", {
                rules: [
                  {
                    required: true,
                    message: "Please input your realname!",
                  },
                  {
                    pattern: "[A-Za-z]{3}",
                    message: "Please 3 haneli realname!",
                  },
                ],
              })(
                <Input
                  prefix={
                    <Mail
                      size={16}
                      strokeWidth={1}
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  type="text"
                  placeholder="realname"
                  onChange={(e) => {
                    this.setState({ [e.target.name]: e.target.value });
                  }}
                />
              )}
            </FormItem>

            <FormItem label="surname">
              {form.getFieldDecorator("surname", {
                rules: [
                  {
                    required: true,
                    message: "Please input your surname",
                  },
                ],
              })(
                <Input
                  prefix={
                    <Mail
                      size={16}
                      strokeWidth={1}
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  type="text"
                  placeholder="surname"
                  onChange={(e) => {
                    this.setState({ [e.target.name]: e.target.value });
                  }}
                />
              )}
            </FormItem>

            <FormItem label="Email">
              {form.getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ],
              })(
                <Input
                  prefix={
                    <Mail
                      size={16}
                      strokeWidth={1}
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  type="mail"
                  placeholder="Email"
                  onChange={(e) => {
                    this.setState({ [e.target.name]: e.target.value });
                  }}
                />
              )}
            </FormItem>

            <FormItem label="phone">
              {form.getFieldDecorator("phone", {
                rules: [
                  {
                    required: true,
                    message: "Please input your phone!",
                  },
                ],
              })(
                <Input
                  prefix={
                    <Eye
                      size={16}
                      strokeWidth={1}
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  type="text"
                  placeholder="phone"
                  onChange={(e) => {
                    this.setState({ [e.target.name]: e.target.value });
                  }}
                />
              )}
            </FormItem>
            <FormItem label="Resim">
              {form.getFieldDecorator("Resim" )(<UploadImage/>)}
              </FormItem>
            {/* <FormItem>
              <Button type="primary" htmlType="submit" block className="mt-3">
                Log in
              </Button>
            </FormItem> */}
          </Form>
        </Modal>
      );
    }
  }
);
export default ProfileSettingsModal;
