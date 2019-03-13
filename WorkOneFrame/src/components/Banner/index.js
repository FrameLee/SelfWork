import React, { Component } from 'react';
import { connect } from 'dva';
import { Carousel } from 'antd';
import BannerImg from '@/assets/banner.png';
import './index.less';
const mapStateToProps = (store) => {
  const { systemAdList = [] } = store.mainPage;
  return { systemAdList };
}
@connect(mapStateToProps)
class Banner extends Component {
  state = {
    bannerWidth: 0
  }
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'mainPage/qryBanner',
      payload:{}
    });
    window.addEventListener('resize', this.resizeEvent)
  }
  resizeEvent = () => {
    this.setState({
      bannerWidth: window.document.documentElement.clientWidth
    })
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeEvent)
  }
  render() {
    const { systemAdList } = this.props;
    // const { bannerWidth } = this.state;
    return (
      <div className="bannerCon" style={{ height: (window.document.documentElement.clientWidth / 5.12).toFixed(0) - 0 }}>
        <Carousel autoplay >
          {
            systemAdList.map((item, index) => {
              return item.IMAGE ? <img src={item.IMAGE} key={index} alt="" /> : <img src={BannerImg} alt="" />
            })
          }
          {/* <img src={BannerImg} alt="" />
          <img src={BannerImg} alt="" />
          <img src={BannerImg} alt="" />
          <img src={BannerImg} alt="" />
          <img src={BannerImg} alt="" /> */}
        </Carousel>
      </div>
    );
  }
}
export default Banner;
