import React from 'react';
import { Button } from "antd";
import '../Individual/index.less';
import './index.less';
export default () => {
  return (
    <div className={'alBox'}>
      <div className={'alEmotionBox'}>
        <i className='iconfont ncell-frown'></i>
      </div>
      <div className={'alMsgBox'}>
        Account has been locked
      </div>
      <div className={'alMsgBox2'}>
        Wrong input of  OTP for many times, the account will be locked for 2 days.
      </div>
      <div className={'loginBtnBox'} style={{ textAlign: 'center' }}>
        <Button className={'loginBtn'} style={{ width: '150px' }}>OK</Button>
      </div>
    </div>
  );
}
