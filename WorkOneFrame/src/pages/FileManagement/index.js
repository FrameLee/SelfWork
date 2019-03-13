import React, { Component } from 'react';
import { Table, Input, Select, Button, Modal, Row, Col, Form, Tag } from 'antd';
import moment from 'moment';
import NoRecord from '@/components/NoRecord';
import PageTitle from '../components/PageTitle';
import { connect } from 'dva';
import './index.less';
const { Option } = Select;
const { TextArea } = Input;
class FileManagement extends Component {
  handleSubmit = ()=> {

  }
  render() {
    const { form: { getFieldDecorator }, lostandRestore: { dataList, currentPage, totalSize, loading } } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const columns = [
      {
        title: 'Name',
        dataIndex: 'EVENT_NAME',
        key: 'EVENT_NAME',
      }, {
        title: 'Mobile No.',
        dataIndex: 'ORDER_ITEM_ID',
        key: 'ORDER_ITEM_ID',
      }, {
        title: 'State',
        dataIndex: 'STATE_NAME',
        key: 'STATE_NAME',
        render: (text, record) => (<Tag color='purple'>{text}</Tag>)
      }, {
        title: 'Activation Time',
        dataIndex: 'COMPLETED_DATE',
        key: 'COMPLETED_DATE',
      }, {
        title: 'Reason',
        dataIndex: 'ORDER_REASON_NAME',
        key: 'ORDER_REASON_NAME',
      }, {
        title: 'Operation',
        dataIndex: 'SUBS_EVENT_ID',
        key: 'SUBS_EVENT_ID',
        render: (text, record) => (
          <div>
            <span>替换</span>|<span>删除</span>
          </div>
        )
      }
    ];

    const pagination = {
      size: 'small',
      total: totalSize,
      position: 'bottom',
      current: currentPage,
      onChange: (page, pageSize) => {
        this.props.dispatch({
          type: 'lostandRestore/save',
          payload: {
            currentPage: page
          }
        })
      }
    };
    return (
      <div>
        <PageTitle text="Lost and Restore" />
        <div className="LostandRestoreBox">
          <div className="queryForm">
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <Row gutter={24}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    {...formItemLayout}
                    label="Mobile No."
                  >
                    {getFieldDecorator('ACC_NBR', {
                      initialValue: '',
                      rules: [{
                        pattern: /^[\d]+$/,
                        message: 'Mobile No. must be number.'
                      }],
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    {...formItemLayout}
                    label="Status"
                  >
                    {getFieldDecorator('STATUS', {
                      initialValue: 'Y',
                      rules: [{
                        required: true,
                        message: 'Service Type is required.'
                      }],
                    })(
                      <Select placeholder="Please select a service type!">
                        <Option value="Y">Complete</Option>
                        <Option value="N">UnComplete</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24}>
                  <Form.Item>
                    <Button type="custom" htmlType="submit" style={{ float: 'right' }}>Query</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
          <Table
            locale={{
              emptyText: <NoRecord />
            }}
            columns={columns}
            dataSource={dataList}
            pagination={pagination}
            rowKey={(record, index) => (index)}
            loading={loading}
            scroll={{ x: 400 }}
          />
        </div>
      </div>
    );
  }
}
export default connect(({ lostandRestore }) => ({
  lostandRestore,
}))(Form.create({})(FileManagement));
