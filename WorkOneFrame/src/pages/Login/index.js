import React from 'react';
import './index.less';
import ChoseLanguage from '../../components/ChoseLanguage';
import { Select, Form } from "antd";
import { connect } from 'dva';
import logo from '../../assets/ncell-logo_s.png';
import pic from '../../assets/pic.png';
import Individual from './components/Individual';
import SetNewPassword from './components/SetNewPassword';
import AccountLocked from './components/AccountLocked';
import ForgetPassword from './components/ForgetPassword';
import Register from './components/Register';
const Option = Select.Option;


class Login extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'login/getVerificationCode',
    })
    this.props.dispatch({
      type: 'login/getSMSCodeEffTime'
    })
    this.props.dispatch({
      type: 'login/getErrorCounts'
    })
    this.props.dispatch({
      type: 'login/getPasswordComplexity'
    })
  }

  render() {
    const { login: { current } } = this.props;
    return (
      <div className={'loginPage'} >
        <div className={'loginContainer'}>
          <div className={'loginHeader'}>
            <div className={'loginLogo'}>
              <img src={logo} alt='' />
            </div>
            <p className={'loginTitle'}>Self-Care</p>
            <div className={'loginLanguage'}>
              <ChoseLanguage />
            </div>
          </div>
          <div className={'loginBox'}>
            <div>
              {current === 'Individual' ?
                <Individual {...this.props} /> : current === 'SetNewPassword' ?
                  <SetNewPassword {...this.props} /> : current === 'AccountLocked' ?
                    <AccountLocked {...this.props} /> : current === 'ForgetPassword' ?
                      <ForgetPassword {...this.props} /> : current === 'Register' ?
                        <Register {...this.props} /> : ''
              }
            </div>
          </div>
        </div>
        <div className={'loginpic'}><img src={pic} alt='' /></div>
      </div>
    );
  }
}

export default connect(({ login }) => ({
  login
}))(Form.create()(Login));
