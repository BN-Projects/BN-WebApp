import { Button, Form, Input, Modal, Radio, Tabs } from 'antd';

import { Eye, HelpCircle, Mail, Triangle, User } from 'react-feather';

import ModalLogin from './login-form';

import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
import LogModal from './login-form'

const FormItem = Form.Item;

const registerModal = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
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
                </Form>
            );
        }
    }
);
export default registerModal;
