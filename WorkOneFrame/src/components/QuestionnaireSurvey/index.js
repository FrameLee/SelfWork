import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Form, Row, Col, Radio, Button, Input, Checkbox } from 'antd';
import './index.less';
import questionnaireImg from '../../assets/questionnaire.png';
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;
class QuestionnaireSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    }
  }
  handleModalVisible() {
    this.setState({
      modalVisible: true
    })
  }

  handleOk(e) {
    e.preventDefault();
    this.setState({
      modalVisible: false,
    });
  }

  handleCancel() {
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;
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
    return (
      <div className='QuestionnaireSurveyBox'>
        <img src={questionnaireImg} alt='' onClick={this.handleModalVisible.bind(this)} className='questionnaireImg' />
        <Modal
          title="QUESTIONNAIRE SURVEY"
          width={'70%'}
          className='QuestionnaireSurveyModal'
          visible={this.state.modalVisible}
          footer={null}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <div>
            In order to understand your feelings about our products in time and serve you better, we will delay you a few minutes to do a brief survey.
          </div>
          <Form
            className='QuestionnaireSurveyForm'
            onSubmit={this.handleOk.bind(this)}>
            <Row gutter={24}>
              <Col xs={24} sm={12} className='QuestionnaireSurveyTitle'>
                1.Do you like our system？
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <Form.Item
                  {...formItemLayout}
                >
                  {getFieldDecorator('a', {
                    rules: [{
                      required: true,
                      message: 'Please select one'
                    }],
                  })(
                    <RadioGroup
                      className='QuestionnaireSurveyRadioGroup'
                    >
                      <Radio value={'Unlike'}>Unlike</Radio>
                      <Radio value={'Like'}>Like</Radio>
                      <Radio value={"Don't care"}>Don't care</Radio>
                    </RadioGroup>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24} className={'line'}>
              <Col xs={24} sm={12} className='QuestionnaireSurveyTitle'>
                2.Do you like our system？
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24} sm={24}>
                <Form.Item
                  {...formItemLayout}
                >
                  {getFieldDecorator('b', {
                    rules: [{
                      required: true,
                      message: 'Please~~'
                    }],
                  })(
                    <TextArea className='QuestionnaireSurveyTextArea' />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24} className={'line'}>
              <Col xs={24} sm={12} className='QuestionnaireSurveyTitle'>
                3.Do you like our system？
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24} sm={24}>
                <Form.Item
                  {...formItemLayout}
                >
                  {getFieldDecorator('c', {
                    rules: [{
                      required: true,
                      message: 'Please select one'
                    }],
                  })(
                    <CheckboxGroup className='QuestionnaireSurveyCheckGroup'>
                      <Checkbox value={'Unlike'}>Unlike</Checkbox>
                      <Checkbox value={'Like'}>Like</Checkbox>
                      <Checkbox value={'LikeOther'}>Like</Checkbox>
                    </CheckboxGroup>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24} sm={24}>
                <div className="likeOhter">
                  <span>Ohter</span>
                  <Input width={'50%'} />
                </div>
              </Col>
            </Row>
            <Row gutter={24} className={'line'} style={{ marginTop: '24px' }}>
              <Col xs={24} sm={12}>
                <Form.Item>
                  <Button type="custom" htmlType="submit" style={{ float: 'right' }}>Submit</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div >
    );
  }
}
export default connect()(Form.create({})(QuestionnaireSurvey));
