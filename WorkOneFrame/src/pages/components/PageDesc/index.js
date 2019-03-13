import React, { PureComponent } from 'react';
import './index.less';
class PageDesc extends PureComponent {

  render() {

    return (
      <div className='pageDesc'>
        {this.props.text}
      </div>
    );
  }
}
export default PageDesc;
