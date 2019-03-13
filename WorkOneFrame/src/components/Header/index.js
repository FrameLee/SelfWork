import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import ChoseLanguage from '../ChoseLanguage';
import Logo from '@/assets/ncell-logo.png';
import './index.less';
import { modalConfirm } from '../../utils/showModal';
const mapStateToProps = (store) => {
  const { drawerVisible } = store.mainPage;
  const { login } = store;
  return { drawerVisible, login };
}
@connect(mapStateToProps)
class Header extends Component {
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  handleLogout() {
    modalConfirm({
      title: `Are you sure to logout`,
      okText: 'Ok',
      cancelText: 'NO',
      onOkFunc: () => { //okFunc
        this.props.dispatch({
          type: 'login/logout',
          payload: {
            ACC_NBR: this.props.login.currentAccount
          }
        })
      },
      onCancalFunc: () => { }
    })
  }

  changeDrawerVisible = () => {
    const { dispatch, drawerVisible } = this.props;
    dispatch({
      type: 'mainPage/changeDrawerVisible',
      payload: {
        drawerVisible: !drawerVisible
      }
    })
  }
  render() {
    return (
      <div className='header'>
        <div className='headerLeft'>
          <div className="headerLogo">
            <img src={Logo} alt="" />
          </div>
          <div className="headerTitle">
            <div className="bigTitle">Customer Self-Care</div>
            <div className="smallTitle">Moving Myanmar Forward</div>
          </div>
        </div>
        <div className='headerSpace'></div>
        <div className='headerRight'>
          <div onClick={this.handleLogout.bind(this)} className="headerRightlgout"><i className='iconfont ncell-logout' />&nbsp;Logout</div>
        </div>
      </div>
    );
  }
}
export default Header;
