import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Drawer } from 'antd';
import SliderMenu from '../SliderMenu';
import './index.less';

@connect()
class MainLayout extends Component {
  render() {
    return (
      <div className='mainLayout'>
        <Row type='flex'>
          <Col className='menu'>
            <div className='menuLayout'>
              <SliderMenu />
            </div>
          </Col>
          <div className='layoutContent'>{this.props.children}</div>
        </Row>
      </div>
    );
  }
}
export default MainLayout;