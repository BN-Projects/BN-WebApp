import { Button, Form, Input, Modal, Radio, Tabs } from 'antd';

import { Eye, Mail, Triangle, User } from 'react-feather';

import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
const TabPane = Tabs.TabPane;
function callback(key) {
    console.log(key);
}

const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (

                <Modal
                    visible={visible}
                    footer={null}
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="Kullanıcı Girişi" key="1">
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

                                <FormItem>
                                    <Button type="primary" htmlType="submit" block className="mt-3">
                                        Log in
                            </Button>
                                </FormItem>
                            </Form>

                        </TabPane>
                        <TabPane tab="Kayıt Ol" key="2">

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
                                </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            );
        }
    }
);

class CollectionsPage extends React.Component {
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
