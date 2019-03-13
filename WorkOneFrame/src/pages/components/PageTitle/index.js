import React, { PureComponent } from 'react';
import './index.less';
class PageTitle extends PureComponent {

  render() {

    return (
      <div className='pageTitle'>{this.props.text}</div>
    );
  }
}
export default PageTitle;
