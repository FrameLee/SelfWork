import React from 'react';
import { Tabs, Input, Button, Modal, Form, Checkbox } from "antd";
import { connect } from "dva";
import { Link } from 'dva/router';
import googleIcon from '../../../../assets/google.png';
import './index.less';
import VerificationCode from '../VerificationCode';
const TabPane = Tabs.TabPane;
class Individual extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      checked: 0,
      remember: false,
      groupEye: 'close',
      individualEye: 'close',
      loginWith: 'password',
      activeTab: 'Individual',
      count: 0,
      countGroup: 0,
      cookiesMsg: {}
    }
  }

  //设置cookie
  setCookie(name, value, day) {
    var date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = name + '=' + value + ';expires=' + date;
  };

  //获取cookie
  getCookie(name) {
    var reg = RegExp(name + '=([^;]+)');
    var arr = document.cookie.match(reg);
    if (arr) {
      return arr[1];
    } else {
      return '';
    }
  };

  //删除cookie
  delCookie(name) {
    setCookie(name, null, -1);
  };

  handleTermsClick() {
    this.setState({
      visible: true
    })
  }

  handleRememberChange() {
    this.setState({
      remember: !this.state.remember
    })
  }

  handleLoginWith() {
    if (this.state.loginWith === 'password') {
      this.setState({
        loginWith: 'OTP',
        activeTab: 'Individual'

      })
    }
    else {
      this.setState({
        loginWith: 'password',
        activeTab: 'Individual'
      })
    }
  }

  handleCancel() {
    this.setState({
      visible: false
    })
  }

  handleForget() {
    this.props.dispatch({
      type: 'login/changeBox',
      payload: {
        current: 'ForgetPassword'
      }
    })
  }

  handleIndividualEye() {
    if (this.state.individualEye === 'open') {
      this.setState({
        individualEye: 'close'
      })
    }
    else {
      this.setState({
        individualEye: 'open'
      })
    }
  }

  handleGroupEye() {
    if (this.state.groupEye === 'open') {
      this.setState({
        groupEye: 'close'
      })
    }
    else {
      this.setState({
        groupEye: 'open'
      })
    }
  }

  handleRegister() {
    this.props.dispatch({
      type: 'login/changeBox',
      payload: {
        current: 'Register'
      }
    })
  }

  handleTabChange(activeKey) {
    this.setState({
      activeTab: activeKey
    })
    this.props.dispatch({
      type: 'login/getVerificationCode',
    })
  }

  handleIndividualLogin(e) {
    e.preventDefault();
    if (!this.state.checked) {
      this.setState({
        checked: false
      })
      return false;
    }
    if (this.state.loginWith === 'password') {
      this.props.form.validateFields(['ACC_NBR', 'LOGIN_PASSWD', 'VER_CODE'], (err, values) => {
        if (!err) {
          if (Number.parseInt(values.VER_CODE, 10) === Number.parseInt(this.props.login.verCode, 10)) {
            values.ACC_NBR = values.ACC_NBR.replace(/ /g, '');
            values.MSG_TYPE = "SMS";
            values.IS_COOKIE_PWD = "N";
            delete values.VER_CODE;
            this.props.dispatch({
              type: 'login/login',
              payload: values
            })
            if (this.state.remember) {
              this.setCookie('ACC_NBR', values.ACC_NBR, 7)
              this.setCookie('LOGIN_PASSWD', values.LOGIN_PASSWD, 7)
            }
            else {
              this.delCookie('ACC_NBR')
              this.delCookie('LOGIN_PASSWD')
            }
          }
          else {
            this.props.form.setFields({
              VER_CODE: {
                value: '',
                errors: [new Error('The verification code is wrong!')]
              }
            })
          }
          this.props.dispatch({
            type: 'login/getVerificationCode',
          })
        }
      });
    }
    else {
      this.props.form.validateFields(['ACC_NBR', 'OTP'], (err, values) => {
        if (!err) {
          const newValues = {
            ACC_NBR: values.ACC_NBR.replace(/ /g, ''),
            VER_CODE: values.OTP,
            MSG_TYPE: 'LOGIN_WITH_SMS'
          }
          this.props.dispatch({
            type: 'login/loginWithSmsCode',
            payload: newValues
          })
        }
      });
    }
  }

  handleGroupLogin(e) {
    e.preventDefault();
    if (!this.state.checked) {
      this.setState({
        checked: false
      })
      return false;
    }
    if (this.state.loginWith === 'password') {
      this.props.form.validateFields(['ACC_NBR_Group', 'LOGIN_PASSWD_Group', 'VER_CODE_Group'], (err, values) => {
        if (!err) {
          const newValues = {
            ACC_NBR: values.ACC_NBR_Group.replace(/ /g, ''),
            LOGIN_PASSWD: values.LOGIN_PASSWD_Group,
            // VER_CODE: values.VER_CODE_Group,
            MSG_TYPE: "SMS",
            IS_COOKIE_PWD: "N"
          }
          if (Number.parseInt(values.VER_CODE_Group, 10) === Number.parseInt(this.props.login.verCode, 10)) {
            this.props.dispatch({
              type: 'login/login',
              payload: newValues
            })
            if (this.state.remember) {
              this.setCookie('ACC_NBR_Group', values.ACC_NBR_Group.replace(/ /g, ''), 7)
              this.setCookie('LOGIN_PASSWD_Group', values.LOGIN_PASSWD_Group, 7)
            }
            else {
              this.delCookie('ACC_NBR_Group')
              this.delCookie('LOGIN_PASSWD_Group')
            }
          }
          else {
            this.props.form.setFields({
              VER_CODE_Group: {
                value: '',
                errors: [new Error('The verification code is wrong!')]
              }
            })
          }
          this.props.dispatch({
            type: 'login/getVerificationCode',
          })
        }
      });
    }
    else {
      this.props.form.validateFields(['ACC_NBR_Group', 'OTP_Group'], (err, values) => {
        if (!err) {
          const newValues = {
            ACC_NBR: values.ACC_NBR_Group.replace(/ /g, ''),
            VER_CODE: values.OTP_Group,
            MSG_TYPE: 'LOGIN_WITH_SMS'
          }
          this.props.dispatch({
            type: 'login/loginWithSmsCode',
            payload: newValues
          })
        }
      });
    }
  }

  handleGetOTP() {
    const { getFieldValue, setFields } = this.props.form;
    const ACC_NBR = getFieldValue('ACC_NBR').replace(/ /g, '');
    if (!ACC_NBR) {
      setFields({
        ACC_NBR: {
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
          "MSG_TYPE": "LOGIN_WITH_SMS"
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

  handleGetOTPGroup() {
    const { getFieldValue, setFields } = this.props.form;
    const ACC_NBR = getFieldValue('ACC_NBR_Group').replace(/ /g, '');
    if (!ACC_NBR) {
      setFields({
        ACC_NBR_Group: {
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
          "MSG_TYPE": "LOGIN_WITH_SMS"

        }
      })
      this.setState({
        countGroup: this.props.login.SMSCodeEffTime
      })
      this.timerGroup = setInterval(() => {
        const countGroup = this.state.countGroup;
        if (!countGroup) {
          clearInterval(this.timerGroup);
        }
        else {
          this.setState({
            countGroup: countGroup - 1
          })
        }
      }, 1000);
    }
  }

  handleCheckboxChange() {
    this.setState({
      checked: !this.state.checked
    })
  }

  handleAgree() {
    this.setState({
      checked: true,
      visible: false,
    })
  }

  handleDisagree() {
    this.setState({
      checked: false,
      visible: false,
    })
  }

  componentDidMount() {
    const ACC_NBR = this.getCookie('ACC_NBR');
    const LOGIN_PASSWD = this.getCookie('LOGIN_PASSWD');
    const ACC_NBR_Group = this.getCookie('ACC_NBR_Group');
    const LOGIN_PASSWD_Group = this.getCookie('LOGIN_PASSWD_Group');
    if (ACC_NBR && LOGIN_PASSWD) {
      this.setState({
        cookiesMsg: {
          ACC_NBR,
          LOGIN_PASSWD,
          ACC_NBR_Group,
          LOGIN_PASSWD_Group
        }
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
    const { loginWith, individualEye, groupEye, visible, activeTab, count, countGroup, checked, remember, cookiesMsg } = this.state;
    const { form: { getFieldDecorator } } = this.props;
    const tabBarStyle = { color: '#262626', fontFamily: 'Quicksand-Regular', display: 'flex', justifyContent: 'space-around' };
    return (
      <div>
        <Tabs activeKey={activeTab} animated={false} size='large' defaultActiveKey="Individual" tabBarStyle={tabBarStyle} onChange={this.handleTabChange.bind(this)}>
          <TabPane tab="Individual" key="Individual">
            <div className={'Individual'}>
              <Form onSubmit={this.handleIndividualLogin.bind(this)}>
                <Form.Item>
                  {getFieldDecorator('ACC_NBR', {
                    initialValue: cookiesMsg.ACC_NBR || '',
                    rules: [{
                      required: true,
                      message: 'Please input your phone number'
                    }]
                  })(
                    <div className='inputDiv'>
                      <Input type='text' defaultValue={cookiesMsg.ACC_NBR || ''} className='input phoneInput' placeholder='Mobile Number' />
                    </div>
                  )}
                </Form.Item>

                {
                  loginWith === 'password' ?
                    <div>
                      <Form.Item>
                        {getFieldDecorator('LOGIN_PASSWD', {
                          initialValue: cookiesMsg.LOGIN_PASSWD || '',
                          rules: [{
                            required: true,
                            message: 'Please input your password'
                          }]
                        })(
                          <div className='inputDiv'>
                            <Input
                              className='input passwordInput'
                              defaultValue={cookiesMsg.LOGIN_PASSWD || ''}
                              placeholder='Password'
                              type={individualEye === 'open' ? 'text' : 'password'}
                              suffix={
                                <div>
                                  <i className={'iconfont ncell-eye-' + individualEye} onClick={this.handleIndividualEye.bind(this)}></i>
                                  <Button className={'forgetBtn'} onClick={this.handleForget.bind(this)}>Forgot</Button>
                                </div>
                              } />
                          </div>
                        )}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator('VER_CODE', {
                          rules: [{
                            required: true,
                            message: 'Please check out the verification code'
                          }]
                        })(
                          <div className='inputDiv'>
                            <Input
                              type='text'
                              className='input verificationInput'
                              placeholder='Verification Code'
                              suffix={
                                <div className={'verificationImgBox'}>
                                  <VerificationCode {...this.props} id={'individual_canvas'} />
                                </div>
                              } />
                          </div>
                        )}
                      </Form.Item>
                    </div> :
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
                            className='input passwordInput'
                            placeholder='OTP'
                            suffix={
                              <div className={'getOTPBtnBox'}>
                                {count ?
                                  <span style={{ margin: '0 17px' }}>{count} s</span> :
                                  <Button className={'getOTPBtn'} onClick={this.handleGetOTP.bind(this)}>Get</Button>
                                }
                              </div>
                            } />
                        </div>
                      )}
                    </Form.Item>
                }
                <div className={'terms'}>
                  <Checkbox checked={remember} onChange={this.handleRememberChange.bind(this)}>Remember Me</Checkbox>
                </div>
                <div className={'terms'}>
                  <Checkbox checked={checked} onChange={this.handleCheckboxChange.bind(this)}>I accept the</Checkbox><span className={'termsSpan'} onClick={this.handleTermsClick.bind(this)}>Terms and Condition</span>
                  <p className={'termsTips'} style={{ display: checked === false ? 'block' : 'none' }}>To use our services, you must agree to accept our Terms and Conditions</p>
                </div>
                <div className={'loginBtnBox'}>
                  <Button className={'loginBtn'} htmlType="submit">Login</Button>
                </div>
              </Form>
              <div className={'linksBox'}>
                <div>
                  <i className='iconfont ncell-facebook'></i><span>Facebook</span>
                  <img src={googleIcon} style={{ width: '18px', marginLeft: '15px' }} alt='' /><span>Google</span>
                </div>
                <div>
                  <div className={'loginWith'} onClick={this.handleLoginWith.bind(this)}>
                    {loginWith === 'password' ? 'Login with OTP' : 'Login with Password'}
                  </div>
                </div>
              </div>
              <div className={'registerBox'}>
                <Link to="/RegisterSIM">Register for Ncell SIM</Link>
                <p onClick={this.handleRegister.bind(this)}>Register</p>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Group Admin" key="Group Admin">
            <div className={'Individual'}>
              <Form onSubmit={this.handleGroupLogin.bind(this)}>
                <Form.Item>
                  {getFieldDecorator('ACC_NBR_Group', {
                    initialValue: cookiesMsg.ACC_NBR_Group || '',
                    rules: [{
                      required: true,
                      message: 'Please input your phone number'
                    }]
                  })(
                    <div className='inputDiv'>
                      <Input type='text' defaultValue={cookiesMsg.ACC_NBR_Group || ''} className='input phoneInput' placeholder='Mobile Number' />
                    </div>
                  )}
                </Form.Item>
                {
                  loginWith === 'password' ?
                    <div>
                      <Form.Item>
                        {getFieldDecorator('LOGIN_PASSWD_Group', {
                          initialValue: cookiesMsg.LOGIN_PASSWD_Group || '',
                          rules: [{
                            required: true,
                            message: 'Please input your password'
                          }]
                        })(
                          <div className='inputDiv'>
                            <Input
                              defaultValue={cookiesMsg.LOGIN_PASSWD_Group || ''}
                              className='input passwordInput'
                              placeholder='Password'
                              type={groupEye === 'open' ? 'text' : 'password'}
                              suffix={
                                <div>
                                  <i className={'iconfont ncell-eye-' + groupEye} onClick={this.handleGroupEye.bind(this)}></i>
                                  <Button className={'forgetBtn'} onClick={this.handleForget.bind(this)}>Forgot</Button>
                                </div>
                              } />
                          </div>
                        )}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator('VER_CODE_Group', {
                          rules: [{
                            required: true,
                            message: 'Please input the verification code'
                          }]
                        })(
                          <div className='inputDiv'>
                            <Input
                              type='text'
                              className='input verificationInput'
                              placeholder='Verification Code'
                              suffix={
                                <div className={'verificationImgBox'}>
                                  <VerificationCode {...this.props} id={'group_canvas'} />
                                </div>
                              } />
                          </div>
                        )}
                      </Form.Item>
                    </div> :
                    <Form.Item>
                      {getFieldDecorator('OTP_Group', {
                        rules: [{
                          required: true,
                          message: 'Please input the OTP'
                        }]
                      })(
                        <div className='inputDiv'>
                          <Input
                            type='text'
                            className='input passwordInput'
                            placeholder='OTP'
                            suffix={
                              <div className={'getOTPBtnBox'}>
                                {countGroup ?
                                  <span style={{ margin: '0 17px' }}>{countGroup} s</span> :
                                  <Button className={'getOTPBtn'} onClick={this.handleGetOTPGroup.bind(this)}>Get</Button>
                                }
                              </div>
                            } />
                        </div>
                      )}
                    </Form.Item>
                }
                <div className={'terms'}>
                  <Checkbox checked={remember} onChange={this.handleRememberChange.bind(this)}>Remember Me</Checkbox>
                </div>
                <div className={'terms'}>
                  <Checkbox checked={checked} onChange={this.handleCheckboxChange.bind(this)}>I accept the</Checkbox><span className={'termsSpan'} onClick={this.handleTermsClick.bind(this)}>Terms and Condition</span>
                  <p className={'termsTips'} style={{ display: checked === false ? 'block' : 'none' }}>To use our services, you must agree to accept our Terms and Conditions</p>
                </div>
                <div className={'loginBtnBox'}>
                  <Button className={'loginBtn'} htmlType='submit'>Login</Button>
                </div>
              </Form>
              <div className={'linksBox'}>
                <div>
                  <i className='iconfont ncell-facebook'></i><span>Facebook</span>
                  <img src={googleIcon} style={{ width: '18px', marginLeft: '15px' }} alt='' /><span>Google</span>
                </div>
                <div>
                  <div className={'loginWith'} onClick={this.handleLoginWith.bind(this)}>
                    {loginWith === 'password' ? 'Login with OTP' : 'Login with Password'}
                  </div>
                </div>
              </div>
              <div className={'registerBox'}>
                <Link to="/RegisterSIM">Register for Ncell SIM</Link>
                <p onClick={this.handleRegister.bind(this)}>Register</p>
              </div>
            </div>
          </TabPane>
        </Tabs>
        <Modal
          width={600}
          className={'termsModal'}
          title={'Ncell Terms and Condition'}
          footer={null}
          onCancel={this.handleCancel.bind(this)}
          visible={visible}>
          <div className={'termsModalBox'}>
            <h1 style={{ fontSize: '16px', textAlign: 'center', lineHeight: 1, marginBottom: '20px' }}>Terms and Condition</h1>
            <div>
              PLEASE READ THESE TERMS AND CONDITIONS, USE REQUIREMENTS AND RESTRICTIONS CAREFULLY.
            <br />
              You are consenting, agreeing and conveying your acceptance of the following terms and conditions provided for herein which shall constitute a Contract between You and Ncell Private Limited (hereinafter referred as "Ncell") and govern Access, Browsing and/or thereby registering to the Ncell Ecare portal.
            <br />
              Therefore accessing to the Ncell Ecare portal on your handheld devices or PCs, you agree to be bound by the following terms and conditions.
            <br />
              These terms and conditions shall apply in conjunction with Customer Form or any other document signed by yourself (preceding terms and conditions). In case there is any conflict between the terms and conditions mentioned herein and those with the preceding terms relating to the services subscribed, then the preceding terms and conditions shall govern. If you do not agree with all of the terms and conditions described herein. Please do not access the Ncell Ecare portal.
            <br />
              Ncell reserves the right to change or modify any of the terms and conditions contained herein and services may be modified, supplemented or withdrawn, at any time and in its sole discretion. Ncell may modify or amend the terms of this portals by posting a copy of the modified terms and conditions on the Ncell Website www.ncell.com.np
            <br />
              Any changes or modification will be effective immediately. Your continued use of Ncell Ecare portal following the posting of changes or modifications will confirm your acceptance of such changes or modifications. Therefore, the Customer should frequently visit Ncell website, review this terms and conditions and applicable policies from time-to-time to understand the terms and conditions that apply to your use of Ncell Ecare portal. If you do not agree to the amended terms, you must stop using Ncell Ecare portal.
            <br />
              1. Scope of Use:
            <br />
              For the purpose of this access, Customer shall mean an existing, valid and active Ncell customer who has registered to Ncell ecare portal for personal use. The Customer acknowledges that the use of the features available on the Ncell ecare portal is subject to your compliance with the terms and conditions set forth below including any cross reference mentioned thereto. Ncell ecare portal and any related features are subjected to the Customer for use only under the terms of this agreement.
              By registering to the Ncell ecare portal or clicking on the Accept button, the Customer will be deemed to have accepted the following terms and Conditions in their entirety. The Ncell portal is licensed to the Customer by Ncell for use strictly in accordance with the terms and conditions of this License. The terms and conditions of this portal will govern any upgrades, updates, modifications or enhancements to the Ncell Ecare portal. Content (information, communications, images and/or sounds contained on or available through Ncell ecare portal) is provided by Ncell, its affiliates, independent content providers and third parties. The various contents or reference or redirection towards the Ncell ecare portal are copyright © Ncell, its affiliates, independent content providers or third parties. All rights reserved. The Customer agrees that without the prior written permission of Ncell, the contents of Ncell ecare portal cannot be reproduced, modified, transferred, distributed, republished, downloaded, posted or transmitted in any form or by any means including but not limited to electronic, mechanical photocopying or recording. . Customer agree that the material and content contained within or provided by Ncell ecare portal is for Customer's own personal/corporation use only and may not be used for commercial purposes or distributed commercially . Ncell grants the Customer a revocable, non-exclusive, non-transferable, limited right to install and use the ecare portal to access and use the portal on such devices strictly in accordance with the terms and conditions of this portal access. The ecare portal and all copyrights, patents, trademarks, trade secrets and other intellectual property rights including but not limited to Ncell trademarks, service marks, logos and taglines are, and shall remain, the property of Ncell"
            <br />
              2. Prohibited Actions:
            <br />
              Customer shall comply with all applicable laws and regulations and refrain from violating any third - party rights in connection with this terms and conditions.Without limiting the generality of the foregoing, Customer shall not: (a) decompile, reverse engineer, disassemble, attempt to derive the source code of, or decrypt the ecare portal; (b) cause, permit or authorize any modification, adaptation, improvement, enhancement, translation or derivative work from the portal; (c) violate any applicable laws, rules or regulations in connection with Customer's access or use of the Ncell ecare portal; (d) remove, alter or obscure any proprietary notice (including any notice of copyright or trademark) of Ncell or its affiliates; (e) use the Ncell ecare portal for any other purpose for which it is not designed or intended; (f) violate, interfere with, damage or compromise Ncell ecare portal or Ncell services, or any other person's copy of the Ncell ecare portal or their access; (g) engage in any form of credit farming(i.e., the process of aggregating credits by signing on multiple user accounts that are really all for you or just one user); (h) attempt to do anything or induce or enable others to do or attempt to do anything prohibited under this terms and conditions.These provisions shall survive the termination of access.
            <br />
              3. Representation and Warranties
            <br />
              By registering for this Ncell ecare portal a Customer would be required to give some basic Customer information.Ncell may use any of this Customer information to verify that only valid, existing and authorized Customer have access to the Customer information.During the registration process, the Customer agrees to provide true, accurate and complete information and agrees not to submit particulars that he / she does not have the right or authority to submit.
              Upon registering as the representation on behalf of the company, the user agrees to bear all the liability against company operations.The operations thereby performed for its member from the company login shall be responsibility of the company as the user access is only provided upon official approval / consent of the company.
            <br />
              4. Disclaimer:
            <br />
              NCELL ECARE PORTAL OR SERVICES AND THE THIRD PARTY CONTENT ARE PROVIDED "AS IS", AND WE DO NOT REPRESENT OR WARRANT THAT NCELL ECARE PORTAL, OR THE SERVICES WILL ALWAYS BE AVAILABLE, ACCESSIBLE, UNINTERRUPTED, TIMELY, SECURE, ACCURATE, COMPLETE, ERROR - FREE OR WILL OPERATE WITHOUT DATA LOSS, NOR DO WE WARRANT ANY PARTICULAR QUALITY OF THE NCELL ECARE PORTAL, SOFTWARE OR SERVICES.WE DISCLAIM ANY AND ALL OTHER WARRANTIES AND REPRESENTATIONS(EXPRESS OR IMPLIED, ORAL OR WRITTEN) WITH RESPECT TO NCELL ECARE PORTAL  OR SERVICES OR THE THIRD PARTY CONTENT WHETHER ALLEGED TO ARISE BY OPERATION OF LAW, BY REASON OF CUSTOM OR USAGE IN THE TRADE, BY COURSE OF DEALING OR OTHERWISE, INCLUDING ANY AND ALL(A) WARRANTIES OF MERCHANTABILITY, (B) WARRANTIES OF FITNESS OR SUITABILITY FOR ANY PURPOSE(WHETHER OR NOT WE KNOW, WE HAVE REASON TO KNOW, WE HAVE BEEN ADVISED OR WE ARE OTHERWISE AWARE OF ANY SUCH PURPOSE), (C) WARRANTIES OF NONINFRINGEMENT OR CONDITION OF TITLE, AND(D) WARRANTIES THAT NCELL ECARE PORTAL, OR THE SERVICES WILL OPERATE WITHOUT INTERRUPTION OR ERROR.NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY CUSTOMER FROM NCELL OR FROM NCELL ECARE PORTAL SHALL CREATE ANY REPRESENTATION, WARRANTY OR GUARATNEE.CUSTOMER ACKNOWLEDGE AND AGREE THAT YOU HAVE RELIED ON NO WARRANTIES.
            <br />
              5. Indemnification:
            <br />
              Customer shall indemnify, defend and hold harmless Ncell and its affiliates, and each of their respective officers, directors, agents and employees(the Indemnified Parties) from and against any claim, proceeding, loss, damage, fine, penalty, interest and expense(including, without limitation, reasonable attorney's fees ) arising out of or in connection with the following: (i) Customer access to or use of the Ncell Ecare portal; (ii) Customer breach of this access (iii) Customer violation of law; (iv) Customer negligence or willful misconduct; or (v) Customer violation of the rights of a third party, including the infringement by Customer of any intellectual property or misappropriation of any proprietary right or trade secret of any person or entity and (vi) Ncell's execution of any Customer instructions.These obligations will survive any termination of the access.
            <br />
              6. Miscellaneous
            <br />
              6.1	The Customer shall take all necessary precautions to prevent unauthorized and illegal use and unauthorized access to his / her account through the Ncell Ecare portal.Ncell shall not be responsible for any misuse of Customer's unauthorized access to the Customer account details by any third party. Ncell expressly disclaims any and all liability, howsoever, arising out of the misuse of the Ncell Ecare portal accessed by the Customer.
            <br />
              6.2	Customer hereby authorize and consent to the collection, storage and use, by Ncell and its affiliates, partners and agents, of any information and data related to or derived from Customer use of the portal, and any information or data that Customer provide to Ncell and its affiliates.Notwithstanding the foregoing, the Customer's personally identifiable information will not be provided to any third party without the Customer's prior written consent, save and expect to any public authority acting under the mandate of law.Ncell shall take all reasonable care to ensure the security of Customer's information using commercially reasonable technology available in Nepal. Ncell shall not be held liable for any security lapses occur beyond its reasonable control and in case this Information are in public then the same would be treated as being non-confidential and non-proprietary. Ncell assumes no obligation to protect confidential or proprietary information (other than personally identifiable information) from disclosure and will be free to reproduce, use, and distribute the Information to others without restriction.
            <br />
              6.3	This user access shall be effective till the earlier of either: (i) until terminated by Ncell, or(ii) till the Customer has ported out of Ncell.Ncell may, in its sole and absolute discretion, at any time and for any or no reason, suspend or terminate this access and the rights afforded to Customer hereunder with or without prior notice.Furthermore, if Customer fails to comply with any terms and conditions of this access, then this access and any rights afforded to Customer hereunder shall terminate automatically, without any notice or other action by Ncell.Upon the termination of this access, Customer shall cease the access to the use of the Ncell Ecare portal and its features.
            <br />
              6.4	The Customer may request to block usage of the Ncell ecare portal at any time by giving a written notice / or by informing the Ncell customer care representative or contact points  at least 15 days in advance.In the event, the Customer devices is stolen or lost, the Customer should immediately inform the Ncell customer care representative to immediately block usage.The Customer will remain responsible for any transactions made until the Ncell Ecare portal is blocked by Ncell.
            <br />
              6.5	It is understood that the Ncell Ecare portal may be accessed from any part of the world thereby enabling access to wide variety of information relating to the products and / or services or such additional services or product, Customer will ensure at all time to not mirror any material contained on Ncell Ecare portal on any other media / server without the prior written consent of Ncell.Any unauthorized use of the contents of Ncell Ecare portal either under this clause or aforesaid clause above may be in breach of copyright laws or trademark laws even though the contents or information on the portal by Ncell is not deemed to have endorsed the content.
            <br />
              6.6 All trademarks, service marks and trade names used on this portal including Ncell name and signature and the Ncell name and logo(The Marks) are proprietary to Ncell and / or affiliates and hence, cannot be reproduced in any form.The disclaimer governing the website http://www.ncell.com.np/.shall form an integral part of the terms and conditions of the Ncell Ecare portal. Under no circumstances shall Ncell or its affiliates be liable for any indirect, incidental, consequential, special or exemplary damages or damages arising due to loss of data and loss of use arising out of or in connection with Customer's access or use of or inability to access or use the Ncell Ecare portal, whether or not the damages were foreseeable. Ncell shall not be liable for any third party products or services advertised on the Ncell Ecare portal. Customer assume all risks arising out of or resulting from Customer's transaction of business over the Internet and with any third party, and Customer agree that Ncell and its affiliates are not responsible or liable for any loss or with any third party.
            <br />
              6.7	In the event of loss of devices or change of ownership, Customer should request deactivation of this Ncell Ecare portal by calling Ncell customer care.This portal may contain links to other web sites(Linked Sites).The access to these Linked Sites through this website shall not mean or deem to mean as if the Linked Sites are not under the control of Ncell and Ncell is not responsible for the contents or representation / s of any Linked Sites, including without limitation any link contained in a Linked Site, or any changes or updates to a Linked Site.It is understood herein by you that Ncell is providing these Linked Sites only for convenience purpose, and the inclusion of any link does not imply endorsement by us of the site or any association with its products or services or operators or owners including the legal heirs or assigns thereof.Similarly Ncell makes no representations or warranties, express or implied, concerning any products, services and / or information found on any Linked Sites websites.
            <br />
              6.8	Ncell does not warrant or assures that the Ncell Ecare portal will be compatible or interoperable with Customer's handheld devices or PCs. Furthermore, Customer acknowledge that compatibility and interoperability problems can cause the performance of Customer devices to diminish or fail completely, and may result in permanent the damage to Customer devices, loss of the data located on Customer devices, and corruption of the software and files located on Customer devices. Customer acknowledge and agree that Ncell and its affiliates, shall have no liability to Customer for any losses suffered resulting from or arising in connection with compatibility or interoperability problems.
            <br />
              6.9	 Customer hereby release Ncell from any liability resulting from Customer use or possession of the Ncell Ecare portal, including, without limitation, the following: (i) any product liability claims; (ii) any claim that the Ncell Ecare portal fails to conform to any applicable legal or regulatory requirement; (iii) any claim arising under consumer protection or similar legislation and(iv) any misuse or unauthorized access of Customer's Ncell account.
            <br />
              6.10	This terms and conditions mentioned herein shall be governed by and construed in accordance with the laws of Nepal.
          </div>
            <div className={'termsModalBtnBox'}>
              <Button type="custom" onClick={this.handleAgree.bind(this)}>I agree</Button>
              <Button type="default" onClick={this.handleDisagree.bind(this)}>I dont't agree</Button>
            </div>
          </div>
        </Modal >
      </div >
    )
  }
}

export default connect()(Individual);
