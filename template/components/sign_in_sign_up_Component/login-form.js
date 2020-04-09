import { Button, Form, Input, Modal, Radio, Tabs } from 'antd';
import { Eye, Mail, Triangle, User } from 'react-feather';
import Link from 'next/link';
import UserModal from './sign_in_Modal'
import Sing from './signup'

//deneme try

import { connect } from 'react-redux'
import * as authActions  from '../../redux/actions/authActions'
import { bindActionCreators } from "redux";

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
class CollectionsPage extends React.Component 
{
    state = {
        visible: false
    };

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

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        return (
            <div>
                
                <Link>
                    <a onClick={this.showModal} > Giriş yap</a>
                </Link>
                
                <UserModal
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    loginUser={this.props.actions.loginUser}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentToken : state.authReducer,
    };
  }
function mapDispatchToProps(dispatch) {
    return {
      actions: {
        loginUser: bindActionCreators(authActions.loginUser, dispatch)
      }
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(CollectionsPage);