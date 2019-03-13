import './index.less';
import React, { PureComponent } from 'react';
import { Spin } from 'antd';
import { connect } from "dva";
import Header from '@/components/Header';
import MainLayout from '@/components/MainLayout';
import QuestionnaireSurvey from '@/components/QuestionnaireSurvey';
import Banner from '@/components/Banner';
import Loading from '@/components/Loading';
import '../assets/iconfont/iconfont.css';
import moment from 'moment';
import axios from '../utils/http';
import router from 'umi/router';
import withRouter from 'umi/withRouter';

const mapStateToProps = (store) => {
  const { requestQuantity } = store.layouts;
  return { requestQuantity };
}

@connect(mapStateToProps)
class BasicLayout extends PureComponent {
  state = {
    loginFlag: 1
  }
  handleloginFlagChange = () => {
    const pathname = this.props.location.pathname.toLowerCase();
    if (pathname !== '/login' && pathname !== '/registersim') {
      if (sessionStorage.getItem('loginFlag') - 0 !== 1) {
        axios({
          method: 'POST',
          url: `/api/system/isLogin`,
          data: {}
        }).then(result => {
          if (result.resultCode - 0 === 0) {
            this.setState({
              loginFlag: 1
            });
            sessionStorage.setItem('loginFlag', 1);
          } else if (result.resultCode - 0 !== 5) {
            router.push('/Login');
          }
        }).catch(err => {
          console.log(err);
        });
      } else {
        this.setState({
          loginFlag: 1
        });
      }
      if (sessionStorage.getItem('loginInfo')) {
        this.props.dispatch({
          type: 'login/loginInfoSave',
          payload: JSON.parse(sessionStorage.getItem('loginInfo'))
        });
      }
    }
  }
  componentDidMount() {
    // this.handleloginFlagChange();
    // alert(sessionStorage.getItem('zhu'));
  }
  render() {
    const { loginFlag=1 } = this.state;
    const { requestQuantity } = this.props;
    const pathname = this.props.location.pathname.toLowerCase();

    if (pathname === '/login' || pathname === '/registersim') {
      return requestQuantity > 0 ?
        <Spin tip="Loading...">
          <div> {this.props.children}</div>
        </Spin> : <div> {this.props.children}</div>
    }

    return (loginFlag ? <div>
      <Header />
      <Banner />
      <div style={{ display: 'flex' }}>
        <MainLayout>
          {this.props.children}
        </MainLayout>
        <QuestionnaireSurvey />
      </div>
      {requestQuantity > 0 && <div
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          top: '0',
          left: '0',
          background: 'rgba(255,255,255,0.6)',
          zIndex: '10000',
          textAlign: 'center',
          paddingTop: '200px'
        }}><Spin tip="Loading..." size="large" /></div>}
    </div> : <Loading />
    );
  }
}

export default withRouter(BasicLayout);
