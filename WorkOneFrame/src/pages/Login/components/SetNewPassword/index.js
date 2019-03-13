import React from 'react';
import { Icon, Input, Button, Form } from "antd";
import '../Individual/index.less';
import './index.less';
import { resetPwd } from '../../../../services/loginService';
export default class SetNewPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPwdEye: 'close',
      newPwdEye2: 'close',
      msgStatus: false
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    const { dispatch, form: { validateFields, getFieldValue, setFields }, login: { currentAccount } } = this.props;
    const pwd = getFieldValue('NEW_PWD');
    const pwd2 = getFieldValue('NEW_PWD2');
    if (pwd !== pwd2) {
      setFields({
        NEW_PWD: {
          value: pwd,
          errors: [new Error('The passwords entered twice are not match.')]
        }
      })
      return false;
    }
    else {
      validateFields((err, values) => {
        if (!err) {
          delete values.NEW_PWD2;
          resetPwd({
            ...values,
            ACC_NBR: currentAccount
          })
            .then((res) => {
              const { resultCode, resultDesc } = res;
              if (resultCode.toString() === '0' || resultDesc === 'success') {
                this.setState({
                  msgStatus: true
                })
                setTimeout(() => {
                  dispatch({
                    type: 'login/changeBox',
                    payload: {
                      current: 'Individual'
                    }
                  })
                }, 3000);
              }
            }).catch((err) => {
              console.log(err);
            });
        }
      })
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

  handleNewPwdEye() {
    if (this.state.newPwdEye === 'open') {
      this.setState({
        newPwdEye: 'close'
      })
    }
    else {
      this.setState({
        newPwdEye: 'open'
      })
    }
  }

  handleNewPwdEye2() {
    if (this.state.newPwdEye2 === 'open') {
      this.setState({
        newPwdEye2: 'close'
      })
    }
    else {
      this.setState({
        newPwdEye2: 'open'
      })
    }
  }

  render() {
    const { form: { getFieldDecorator }, login: { passwordComplexity } } = this.props;
    const { newPwdEye, newPwdEye2, msgStatus } = this.state;
    return (
      <div className={'snpBox'} >
        <div className={'snpTtitle'}>
          Set New Password
      </div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Item>
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
              <div className='inputDiv newPasswordDiv'>
                <Input
                  className='input newPasswordInput'
                  placeholder='New Password'
                  type={newPwdEye === 'open' ? 'text' : 'password'}
                  suffix={
                    <div>
                      <i className={'iconfont ncell-eye-' + newPwdEye} onClick={this.handleNewPwdEye.bind(this)}></i>
                    </div>
                  } />
              </div>
            )}
          </Form.Item>
          <Form.Item>
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
              <div className='inputDiv newPasswordDiv'>
                <Input
                  className='input newPasswordInput'
                  placeholder='Password Again'
                  type={newPwdEye2 === 'open' ? 'text' : 'password'}
                  suffix={
                    <div>
                      <i className={'iconfont ncell-eye-' + newPwdEye2} onClick={this.handleNewPwdEye2.bind(this)}></i>
                    </div>
                  } />
              </div>
            )}
          </Form.Item>
          <div className={'loginBtnBox'}>
            <Button className={'loginBtn'} htmlType='submit'>Submit</Button>
          </div>
        </Form>
        <div className={'fpMsg'} onClick={this.handleBackToLogin.bind(this)}>
          Back to Login
      </div>
        <div className={'snpMsg'} style={{ display: msgStatus ? 'block' : 'none' }}>
          <Icon type="check-circle" />The new password is set successfully.Jump for you in 3 seconds…
      </div>
      </div>
    );
  }
}
