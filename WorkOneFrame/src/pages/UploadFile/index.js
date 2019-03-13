import React, { Component } from 'react';
import { Card, Form, Input, Button, Upload, Icon } from 'antd';
import PageTitle from '../components/PageTitle';
import './index.less';
import { connect } from 'dva';

class ChangePassword extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { setFields, validateFieldsAndScroll, getFieldsValue } = this.props.form;
    const values = getFieldsValue(['NEW_PWD', 'NEW_PWD2']);
    if (values.NEW_PWD !== values.NEW_PWD2) {
      setFields({
        NEW_PWD: {
          value: values.NEW_PWD,
          errors: [new Error('Wrong Password')]
        }
      })
      return false;
    }
    else {
      validateFieldsAndScroll((err, fieldValues) => {
        if (!err) {
          // const ACC_NBR = this.props.login.currentAccount;
          const payload = {
            ...fieldValues,
            // ACC_NBR
          }
          delete payload.NEW_PWD2;
          this.props.dispatch({
            type: 'changePassword/changePassword',
            payload
          })
        }
      });
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'login/getPasswordComplexity'
    })
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  render() {
    const { form: { getFieldDecorator }, login: { passwordComplexity } } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 20,
          offset: 4,
        },
      },
    };
    return (
      <div className="ChangePassword">
        <PageTitle text="Change Password" />
        <div className="ChangePasswordBody">
          <Card
            style={{ border: 0 }}
          >
            <Form onSubmit={this.handleSubmit}>
              <Form.Item
                {...formItemLayout}
                label="Old Password"
              >
                {getFieldDecorator('OLD_PWD', {
                  rules: [{
                    required: true, message: 'Old Password is required.',
                  }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="New Password"
              >
                {getFieldDecorator('NEW_PWD', {
                  rules: [{
                    required: true,
                    type: 'string',
                    message: passwordComplexity.COMMENTS || 'Please check out your password',
                    validator: (rule, value, callback) => {
                      if (eval(passwordComplexity.PARAM_VALUE).test && eval(passwordComplexity.PARAM_VALUE).test(value)) {
                        callback();
                      }
                      else {
                        callback(passwordComplexity.COMMENTS);
                      }
                    }
                  }]
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Confirm Password"
              >
                {getFieldDecorator('NEW_PWD2', {
                  rules: [{
                    required: true,
                    type: 'string',
                    message: passwordComplexity.COMMENTS || 'Please check out your password again',
                    validator: (rule, value, callback) => {
                      if (eval(passwordComplexity.PARAM_VALUE).test && eval(passwordComplexity.PARAM_VALUE).test(value)) {
                        callback();
                      }
                      else {
                        callback(passwordComplexity.COMMENTS);
                      }
                    }
                  }]
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Upload"
                extra="longgggggggggggggggggggggggggggggggggg"
              >
                {getFieldDecorator('upload', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                })(
                  <Upload name="logo" action="/upload.do" listType="picture">
                    <Button>
                      <Icon type="upload" /> Click to upload
                    </Button>
                  </Upload>
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="custom" htmlType="submit">Submit</Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}
export default connect(({ login }) => ({
  login
}))(Form.create({})(ChangePassword));
