import React, { Component } from 'react';
import { connect } from 'dva';

import './index.less';
@connect()
class Overview extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

  }
  render() {

    return (
      <div className='overview'>

      </div>
    );
  }
}
export default Overview;
