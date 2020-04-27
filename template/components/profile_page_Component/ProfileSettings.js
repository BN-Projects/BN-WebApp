import { Button, Form, Input, Modal, Radio, Tabs } from 'antd';
import { Eye, Mail, Triangle, User } from 'react-feather';
import Link from 'next/link';
import ProfileSettingsModal from './ProfileSettingsModal'

//deneme try

import { connect } from 'react-redux'
import * as authActions  from '../../redux/actions/authActions'
import { bindActionCreators } from "redux";

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
class ProfileSettings extends React.Component 
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
                
                <Link href=''>
                    <a onClick={this.showModal} > ProfileSettings</a>
                </Link>
                
                <ProfileSettingsModal
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
  export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);
  