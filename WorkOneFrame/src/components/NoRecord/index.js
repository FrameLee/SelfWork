import React, { Component } from 'react';
import '../../assets/iconfont/iconfont';
import './index.less';
class NoRecord extends Component {
  render() {
    return (
      <div className="ncellNoRecord">
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#ncell-no-record"></use>
        </svg >
        <p>{this.props.emptyOrErrorText || 'No Record'}</p>
      </div>
    )
  }
}
export default NoRecord;
