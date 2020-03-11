import { Tabs } from 'antd';
import ModalLogin from '../antd/login-form';
import ModalSignUp from '../antd/sign-up-form';
const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

const Component = () => (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Tab 1" key="1">
    <ModalLogin />
    </TabPane>
    <TabPane tab="Tab 2" key="2">
    <ModalSignUp />
    </TabPane>
  </Tabs>
);
export default Component;
