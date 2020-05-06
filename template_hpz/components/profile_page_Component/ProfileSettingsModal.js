import React, { Component } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Radio,
  Tabs,
  Avatar,
  Upload,
  Icon,
} from "antd";
import { Eye, Mail, Triangle, User } from "react-feather";
import Link from "next/link";
import Router from "next/router";
import { List, message } from "antd";
import UploadImage from "./UploadImage";
import md5 from "md5";
import FileBase64 from "react-file-base64";
import { findDOMNode } from "react-dom";
import { getConnectionLink } from "../../lib/connector";


const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

const success = () => {
  message.success("Başarıyla kaydedildi.");
};

const error1 = () => {
  message.error("Lütfen resim yükleyiniz.");
};

const error2 = () => {
  message.error("Lütfen tüm alanları doldurunuz.");
};

const CustomizedForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },

  mapPropsToFields(props) {
    console.log(props);
    return {
      realname: Form.createFormField({
        ...props.realname,
        value: props.realname.value,
      }),
      surname: Form.createFormField({
        ...props.surname,
        value: props.surname.value,
      }),
      email: Form.createFormField({
        ...props.email,
        value: props.email.value,
      }),
      phone: Form.createFormField({
        ...props.phone,
        value: props.phone.value,
      }),
      dragger: Form.createFormField({
        ...props.dragger,
        value: props.dragger.value,
      }),
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  },
  /*
  handleChange(e) {

      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {

        // Make a fileInfo Object
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + ' kB',
          base64: reader.result,
          file: file,
        };

        // Push it to the state
        allFiles.push(fileInfo);

        // If all files have been proceed
        if(allFiles.length == files.length){
          console.log(allFiles)
          // Apply Callback function
          if(this.props.multiple)
          { 
            console.log(multiple)
            this.props.onDone(allFiles)}
        }
      } // reader.onload
    } // for
  }*/
})((props) => {
  const { getFieldDecorator, validateFields } = props.form;

  const normFile = (e) => {
    console.log("Upload event:", e.file);
    if (e.fileList.length <= 1) {
      if (Array.isArray(e)) {
        return e;
      }

      return e && e.fileList;
    } else {
      return null;
    }
  };
  function submit(err, values) {
    if (!err) {
      //console.log(props.old_image.value)
      var allFiles = [];
      if (values.dragger[0] != null || values.dragger[0] != undefined) {
        let file = values.dragger[0].originFileObj;
        console.log(file);

        let reader = new FileReader();
        // Convert the file to base64 text

        reader.readAsDataURL(file);
        // on reader load somthing...

        reader.onload = () => {
          // Make a fileInfo Object
          
          let fileInfo = {
            name: file.name,
            type: file.type,
            size: Math.round(file.size / 1000) + " kB",
            base64: reader.result.replace(/^data:image.+;base64,/,''),
            file: file,
            desc: file.name.split(/\.(?=[^\.]+$)/)
          };
          // Push it to the state
          allFiles.push(fileInfo);

          //updateProfile
          // console.log(values.realname)
          // console.log(values.surname)
          // console.log(values.phone)
          // console.log(values.email)
          // console.log(allFiles[0].base64)
          // console.log(allFiles[0].desc[1])
          // console.log(props.user_id.value)
          var imgBase64 = allFiles[0].base64; 
          var imgDesc =  allFiles[0].desc[1]
          var id = props.user_id.value;
          var paramsNames = ["email", "name","surname","phone","img","imgDesc","id"];
          //console.log(this.state.email)
          var paramsValues = [values.email, values.realname, values.surname, values.phone , imgBase64, imgDesc, id];
          //console.log(email.value);
          var obj = getConnectionLink("updateprofile", paramsNames, paramsValues, "PUT");
          console.log(obj)
          props.profileEditPage(obj);
          
        };
      }
      else
      {
        error1(); //onceki resimin base64 yollancak ?? xD
      }
    } 
    else 
    {
      error2();
    }
  }
  return (
    <Form
      layout="vertical"
      onSubmit={(e) => {
        e.preventDefault();
        validateFields((err, values) => submit(err, values));
      }}
    >
      <FormItem label="realname">
        {getFieldDecorator("realname", {
          rules: [
            {
              required: true,
              message: "İsim alanı boş bırakılamaz.",
            },
            {
              pattern: "[A-Za-z]{2}",
              message: "En az 2 haneli isim giriniz.",
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
          />
        )}
      </FormItem>
      <FormItem label="Soyisim">
        {getFieldDecorator("surname", {
          rules: [
            {
              required: true,
              message: "Soyisim alanı boş bırakılamaz.",
            },
            {
              pattern: "[A-Za-z]{2}",
              message: "En az 2 haneli soyisim giriniz.",
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
          />
        )}
      </FormItem>
      <FormItem label="Email Adresi">
        {getFieldDecorator("email", {
          rules: [
            {
              required: true,
              message: "Email alanı boş bırakılamaz.",
            },
            {
              pattern: "^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]{2}$",
              message: "Email geçersiz",
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
          />
        )}
      </FormItem>
      <FormItem label="Telefon Numarası">
        {getFieldDecorator("phone", {
          rules: [
            {
              required: true,
              message: "Telefon alanı boş bırakılamaz.",
            },
            {
              pattern: "[+]?(?:[0-9]{2})?[0-9]{10}$",
              message:
                "Girilen telefon numarası geçersiz (Örnek: +905XXXXXXXXX)",
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
          />
        )}
      </FormItem>
      <FormItem label="Dragger">
        <div className="dropbox">
          {getFieldDecorator("dragger", {
            valuePropName: "fileList",
            getValueFromEvent: normFile,
          })(
            <Upload.Dragger name="files">
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Upload.Dragger>
          )}
        </div>
      </FormItem>
      <FormItem
        wrapperCol={{
          xs: { span: 12, offset: 12 },
          sm: { span: 7, offset: 17 },
        }}
      >
        <Button type="primary" htmlType="submit">
          Bilgileri Güncelleştir
        </Button>
      </FormItem>
    </Form>
  );
});

class ProfileSettingsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        realname: {
          value: this.props.profilData.user_real_name,
        },
        surname: {
          value: this.props.profilData.user_surname,
        },
        email: {
          value: this.props.profilData.user_mail,
        },
        phone: {
          value: this.props.profilData.user_phone,
        },
        dragger: {
          value: [],
        },
        user_id: {
          value: this.props.profilData.user_id,
        },
      },
    };
  }

  sub(err) {
    if (!err) {
      console.log("abcc");
      console.log(this.props);
      debugger;
    } else {
      console.log("Alanlar boş");
    }
  }

  handleFormChange = (changedFields) => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));
  };

  render() {
    const { visible, onCancel, onCreate } = this.props;
    const fields = this.state.fields;
    return (
      <Modal
        title="Profil Ayarları"
        visible={visible}
        onCancel={onCancel}
        onOk={onCreate}
        width="600px"
        footer={null}
      >
        <List itemLayout="horizontal">
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar size={100} src={this.props.profilData.user_img} />
              }
              title={
                <div>
                  <br></br>
                  <a
                    disabled="disabled"
                    style={{ fontSize: "25px", color: "#403f3f" }}
                  >
                    {" "}
                    {this.props.profilData.user_real_name}{" "}
                    {this.props.profilData.user_surname}
                  </a>
                </div>
              }
              description={
                <small style={{ fontSize: "10px" }}>
                  {" "}
                  {this.props.profilData.user_mail}
                </small>
              }
            />
          </List.Item>
        </List>
        <CustomizedForm
          {...fields}
          token={this.props.currentToken}
          profileEditPage={this.props.profileEditPage}
          onChange={this.handleFormChange}
          profileData = {this.props.profilData}
        />
      </Modal>
    );
  }
}
export default ProfileSettingsModal;
