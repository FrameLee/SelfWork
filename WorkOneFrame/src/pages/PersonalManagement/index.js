import React, { Component } from 'react';
import { Card, Form, Input, Button } from 'antd';
import PageTitle from '../components/PageTitle';
import './index.less';
import { connect } from 'dva';

class ChangePassword extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { validateFieldsAndScroll } = this.props.form;
    validateFieldsAndScroll((err, fieldValues) => {
      if (!err) {
        const payload = {
          ...fieldValues,
        }
        this.props.dispatch({
          type: 'posonalManagement/posonalManagement',
          payload
        })
      }
    });
  }

  componentDidMount() {
    
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
        <PageTitle text="Personal Management" />
        <div className="PersonalManagementBody">
          <Card
            style={{ border: 0 }}
          >
            <Form onSubmit={this.handleSubmit}>
              <Form.Item
                {...formItemLayout}
                label="Name"
              >
                {getFieldDecorator('name', {
                  rules: [{
                    required: true, message: 'Your name is required.',
                  }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Sex"
              >
                {getFieldDecorator('sex', {
                  rules: [{
                    required: true,
                    type: 'string',
                    message: 'Your sex is required.'
                  }]
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Phone"
              >
                {getFieldDecorator('phone', {
                  rules: [{
                    required: true,
                    type: 'string',
                    message: 'Your phone is required.'
                  }]
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Address"
              >
                {getFieldDecorator('address', {
                  rules: [{
                    required: true,
                    type: 'string',
                    message: 'Your address is required.'
                  }]
                })(
                  <Input />
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
