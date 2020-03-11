import { Card, Checkbox, Form, Input, Col, Row } from 'antd';

import AddDeviceFrom from '../demos/antd/form/add-device-form'


const AddDevice = ({ form }) => ( 
    <Card title="CİHAZ EKLE" >
          <AddDeviceFrom/> 
    </Card>
);

export default Form.create()(AddDevice);
