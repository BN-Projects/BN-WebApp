import { Button, Form, Input, Modal, Radio } from 'antd';

import { Eye, HelpCircle, Mail, Triangle, User } from 'react-feather';

import ModalLogin from './login-form';

import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
import LogModal from './login-form'

const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Kullanıcı Girişi"
                    footer={null}
                    onCancel={onCancel}
                    onOk={onCreate}
                >

                    <Form
                        layout="vertical"
                        onSubmit={e => {
                            e.preventDefault();
                            form.validateFields((err, values) => {
                                if (!err) {
                                    Router.push('/deneme.php');
                                }
                            });
                        }}
                    >

                        <FormItem label="Nickname">
                            {form.getFieldDecorator('nickname', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your nickname!',
                                        whitespace: true
                                    }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <User
                                            size={16}
                                            strokeWidth={1}
                                            style={{ color: 'rgba(0,0,0,.25)' }}
                                        />
                                    }
                                    placeholder="Nickname"
                                />
                            )}
                        </FormItem>
                        <FormItem label="Email">
                            {form.getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!'
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!'
                                    }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Mail
                                            size={16}
                                            strokeWidth={1}
                                            style={{ color: 'rgba(0,0,0,.25)' }}
                                        />
                                    }
                                    type="email"
                                    placeholder="Email"
                                />
                            )}
                        </FormItem>
                        <FormItem label="Password">
                            {form.getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }]
                            })(
                                <Input
                                    prefix={
                                        <Eye
                                            size={16}
                                            strokeWidth={1}
                                            style={{ color: 'rgba(0,0,0,.25)' }}
                                        />
                                    }
                                    type="password"
                                    placeholder="Password"
                                />
                            )}
                        </FormItem>
                        <FormItem label="Confirm password">
                            {form.getFieldDecorator('confirm', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please confirm your password!'
                                    },
                                    {
                                        validator: (rule, value, callback) => {
                                            if (value && value !== form.getFieldValue('password')) {
                                                callback("Passwords don't match!");
                                            } else {
                                                callback();
                                            }
                                        }
                                    }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Eye
                                            size={16}
                                            strokeWidth={1}
                                            style={{ color: 'rgba(0,0,0,.25)' }}
                                        />
                                    }
                                    type="password"
                                    placeholder="Confirm password"
                                />
                            )}
                        </FormItem>

                        <FormItem>
                            <Button type="primary" htmlType="submit" block>
                                Sign up
                            </Button>
                        </FormItem>
                        <div className="text-center">
                            <small className="text-muted">
                                <span>Already have an account?</span>
                                <Link >
                                    <a><LogModal/></a>
                                </Link>
                            </small>
                        </div>



                    </Form>
                </Modal>
            );
        }
    }
);

class CollectionsPage extends React.Component {
    state = {
        visible: true
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
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default CollectionsPage;
