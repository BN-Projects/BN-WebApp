import { Upload, Icon, message } from 'antd';
import { Image } from "react-feather"

import { Button, Form, Input, Modal, Radio, Tabs } from 'antd';
import { Eye, Mail, Triangle, User } from 'react-feather';
import Link from 'next/link';
import ProfileSettingsModal from './ProfileSettingsModal'



const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
class UploadImage extends React.Component {
  render() {
    const Dragger = Upload.Dragger;

    const props = {
      name: 'file',
      multiple: true,
      action: '//jsonplaceholder.typicode.com/posts/',
      onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
          console.log(info.file.name)
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    };
    return (
      <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <Image size="40px" />
      </p>
      <p className="ant-upload-text">Tıklayarak veya sürükleyerek resim yükle</p>
      {/* <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading
      company data or other band files
    </p> */}
    </Dragger>
        );
  }
}

export default UploadImage;
