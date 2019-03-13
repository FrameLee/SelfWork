import { Menu, Icon } from 'antd';
import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import './index.less';
const SubMenu = Menu.SubMenu;
const mapStateToProps = (store) => {
  const { sliderMenuList } = store.mainPage;
  return { sliderMenuList };

}
@connect(mapStateToProps)
class SliderMenu extends Component {
  handleClick = ({ key }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'mainPage/save',
      payload: { drawerVisible: false }
    });
  }

  // handleMenu = (e) =>{
  //   console.log('click',e);
  // }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'mainPage/qryMenu',
      payload: {}
    });
  }

  render() {
    const { history, sliderMenuList } = this.props;
    return (
      <Menu
        className='mainMenu'
        onSelect={this.handleClick}
        // onClick={this.handleMenu}
        style={{ width: 270 }}
        selectedKeys={[history.location.pathname]}
        defaultOpenKeys={['Services', 'Management', 'Query', 'My', 'Report']}
        mode="inline"
      >
        {/* {sliderMenuList.map((item, index) => {
          if (item.hasOwnProperty('CHILD_NODE') && item.CHILD_NODE.length !== 0) {
            return (
              <SubMenu key={item.MENU_NAME} title={<span><i className={`iconfont ncell-${item.MENU_ICON}`} /><span>{item.MENU_NAME}</span></span>}>
                {item.CHILD_NODE.map((val, i) => {
                  return (
                    <Menu.Item key={val.URL}><Link to={val.URL}>{val.MENU_NAME}</Link></Menu.Item>
                  )
                })}
              </SubMenu>
            );
          } else {
            return (
              <Menu.Item className='singleMenuItem' key={item.URL}><Link to={item.URL}><i className={`iconfont ncell-${item.MENU_ICON}`} />{item.MENU_NAME}</Link></Menu.Item>
            );
          }
        })} */}

        <Menu.Item className='singleMenuItem' key="/"><Link to="/"><i className="iconfont ncell-home" />Overview</Link></Menu.Item>
        <SubMenu key="Management" title={<span><i className="iconfont ncell-line-users" /><span>文件系统</span></span>}>
          <Menu.Item key="/FileManagement"><Link to="/FileManagement">文件管理</Link></Menu.Item>
          <Menu.Item key="/UploadFile"><Link to="/UploadFile">文件上传</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="PersonalManagement" title={<span><i className="iconfont ncell-my-information" /><span>人员管理</span></span>}>
          <Menu.Item key="/ChangePassword"><Link to="/ChangePassword">Change Password</Link></Menu.Item>
          <Menu.Item key="/PersonalManagement"><Link to="/PersonalManagement">Personal Management</Link></Menu.Item>
        </SubMenu>
        
      </Menu>
    );
  }
}
export default withRouter(SliderMenu);
