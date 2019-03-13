import React from 'react';
import { Input, Button, Form } from "antd";
import '../Individual/index.less';
import './index.less';
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      pwdEye: 'close',
      pwdEye2: 'close'
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const { getFieldValue, setFields, validateFields } = this.props.form;
    const pwd = getFieldValue('PWD');
    const pwd2 = getFieldValue('PWD2');
    if (pwd !== pwd2) {
      setFields({
        PWD: {
          value: pwd,
          errors: [new Error('The passwords entered twice are not match.')]
        }
      })
      return false;
    }
    else {
      validateFields((err, values) => {
        if (!err) {
          console.log(values);

          const newValues = {
            ACC_NBR: values.ACC_NBR_Register,
            PWD: values.PWD,
            VER_CODE: values.VER_CODE,
            MSG_TYPE: 'REGISTER'
          };
          this.props.dispatch({
            type: 'login/register',
            payload: newValues
          })
        }
      });
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

  handleGetOTP() {
    const { getFieldValue, setFields } = this.props.form;
    const ACC_NBR = getFieldValue('ACC_NBR_Register');
    if (!ACC_NBR) {
      setFields({
        ACC_NBR_Register: {
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
          MSG_TYPE: "REGISTER"
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

  handlePwdEye() {
    if (this.state.pwdEye === 'open') {
      this.setState({
        pwdEye: 'close'
      })
    }
    else {
      this.setState({
        pwdEye: 'open'
      })
    }
  }
  handlePwdEye2() {
    if (this.state.pwdEye2 === 'open') {
      this.setState({
        pwdEye2: 'close'
      })
    }
    else {
      this.setState({
        pwdEye2: 'open'
      })
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = null;
  }

  render() {
    const { count, pwdEye, pwdEye2 } = this.state;
    const { form: { getFieldDecorator }, login: { passwordComplexity } } = this.props;

    return (<div className={'registerPageBox'}>
      <div className={'fpTtitle'}>
        Welcome to Register
      </div>
      <Form>
        <Form.Item>
          {getFieldDecorator('ACC_NBR_Register', {
            rules: [{
              required: true,
              message: 'Please input your phone number'
            }]
          })(
            <div className='inputDiv'>
              <Input type='text' className='input fpPhoneInput' placeholder='Mobile Number' />
            </div>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('VER_CODE', {
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
        <Form.Item>
          {getFieldDecorator('PWD', {
            rules: [{
              required: true,
              type: 'string',
              message: passwordComplexity.COMMENTS || 'Please check out your password',
              validator: (rule, value, callback) => {
                if (passwordComplexity.PARAM_VALUE && eval(passwordComplexity.PARAM_VALUE).test && eval(passwordComplexity.PARAM_VALUE).test(value)) {
                  callback();
                }
                else {
                  callback(passwordComplexity.COMMENTS);
                }
              }
            }]
          })(
            <div className='inputDiv'>
              <Input
                className='input newPasswordInput'
                placeholder='Password'
                type={pwdEye === 'open' ? 'text' : 'password'}
                suffix={
                  <div>
                    <i className={'iconfont ncell-eye-' + pwdEye} onClick={this.handlePwdEye.bind(this)}></i>
                  </div>
                } />
            </div>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('PWD2', {
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
            <div className='inputDiv'>
              <Input
                className='input newPasswordInput'
                placeholder='Password Again'
                type={pwdEye2 === 'open' ? 'text' : 'password'}
                suffix={
                  <div>
                    <i className={'iconfont ncell-eye-' + pwdEye2} onClick={this.handlePwdEye2.bind(this)}></i>
                  </div>
                } />
            </div>
          )}
        </Form.Item>
      </Form>
      <div className={'loginBtnBox'}>
        <Button className={'loginBtn'} onClick={this.handleSubmit.bind(this)}>Registration</Button>
      </div>
      <div className={'registerMsg'}>
        Already have an account， <span onClick={this.handleBackToLogin.bind(this)}>Sign in！</span>
      </div>
    </div>);
  }
}

export default Register;
