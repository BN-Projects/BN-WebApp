// import { Button, Form, Input, Modal, Radio, Tabs } from 'antd';
import SignUpModal from './sign_up_Modal'
// import { Eye, HelpCircle, Mail, Triangle, User } from 'react-feather';

// import ModalLogin from './login-form';

// import Link from 'next/link';
// import Router from 'next/router';
// import styled from 'styled-components';
// import LogModal from './login-form'

class SignUp extends React.Component {
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
                <SignUpModal
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default SignUp;
