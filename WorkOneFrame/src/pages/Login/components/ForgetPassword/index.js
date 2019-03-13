import React from 'react';
import { Input, Button, Form } from "antd";
import '../Individual/index.less';
import './index.less';
class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  handleBackToLogin() {
    this.props.dispatch({
      type: 'login/changeBox',
      payload: {
        current: 'Individual'
      }
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    const { form: { validateFields } } = this.props;
    validateFields((err, values) => {
      if (!err) {
        const newValues = {
          ACC_NBR: values.ACC_NBR_Forget.replace(/ /g, ''), // 用于保存在login里的currentAccount，setNewPassword会用到
          VER_CODE: values.OTP,
          MSG_TYPE: 'FORGET_PWD'
        }
        this.props.dispatch({
          type: 'login/forgetPwd',
          payload: newValues
        })
      }
    })
  }

  handleGetOTP() {
    const { getFieldValue, setFields } = this.props.form;
    const ACC_NBR = getFieldValue('ACC_NBR_Forget').replace(/ /g, '');
    if (!ACC_NBR) {
      setFields({
        ACC_NBR_Forget: {
          value: '',
          errors: [new Error('Please input your phone number')]
        }
      })
      return false;
    }
    else {
      this.props.dispatch({
        type: 'login/getMsgCode',
        payload: {
          ACC_NBR,
          MSG_TYPE: 'FORGET_PWD'
        }
      })
      this.setState({
        count: this.props.login.SMSCodeEffTime
      })
      this.timer = setInterval(() => {
        const count = this.state.count;
        if (!count) {
          clearInterval(this.timer);
        }
        else {
          this.setState({
            count: count - 1
          })
        }
      }, 1000);
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'login/getErrorCounts'
    })
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = null;
  }

  render() {
    const { count } = this.state;
    const { form: { getFieldDecorator } } = this.props;
    return (
      <div className={'fpBox'}>
        <div className={'fpTtitle'}>
          Forget Password
      </div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Item>
            {getFieldDecorator('ACC_NBR_Forget', {
              rules: [{
                required: true,
                message: 'Please input your phone number'
              }]
            })(
              <div className='inputDiv'>
                <Input type='text' className='input fpPhoneInput' placeholder='Input your phone number' />
              </div>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('OTP', {
              rules: [{
                required: true,
                message: 'Please input the OTP'
              }]
            })(
              <div className='inputDiv'>
                <Input
                  type='text'
                  className='input fpOTPInput'
                  placeholder='OTP'
                  suffix={
                    <div className={'fpGetBtnBox'}>
                      {count ?
                        <span style={{ margin: '0 17px' }}>{count} s</span> :
                        <Button className={'fpGetBtn'} onClick={this.handleGetOTP.bind(this)}>Get</Button>
                      }
                    </div>
                  } />
              </div>
            )}
          </Form.Item>
          <div className={'loginBtnBox'}>
            <Button className={'loginBtn'} htmlType='submit'>Next</Button>
          </div>
        </Form>
        <div className={'fpMsg'} onClick={this.handleBackToLogin.bind(this)}>
          Back to Login
        </div>
      </div>
    );
  }
}

export default ForgetPassword;
