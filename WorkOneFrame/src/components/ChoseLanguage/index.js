import React, { Component } from 'react';
import { connect } from 'dva';
import { Popover, Icon } from 'antd';
import './index.less';
const mapStateToProps = (store) => {
  const { languageList=[], selectedLanguageCode='English', languagePopoverVisible } = store.language;
  return { languageList, selectedLanguageCode, languagePopoverVisible };
}
@connect(mapStateToProps)
class ChoseLanguage extends Component {
  languageChange = (selectedLanguageCode) => {
    const { dispatch } = this.props;
    dispatch({
      type:'language/changeLanguage',
      payload: {
        selectedLanguageCode: selectedLanguageCode.SHOW_VALUE
      }
    });
  }
  // showLanguageVisible = (visible) => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type:'language/save',
  //     payload: {
  //       languagePopoverVisible: visible
  //     }
  //   });
  // }
  render() {
    const { languageList, selectedLanguageCode } = this.props;
    return (
      <Popover
        trigger="click"
        content={<div style={{cursor: 'pointer'}}>{
          languageList.map(ele=><p onClick={()=>this.languageChange(ele)} key={ele.KEY}>{ele.SHOW_VALUE}</p>)
        }</div>}
        title={null}
        placement='bottom'
      >
        <div style={{cursor: 'pointer'}} ><span className='language'>{selectedLanguageCode} </span><Icon type="caret-down" /></div>
      </Popover>
    );
  }
}
export default ChoseLanguage;