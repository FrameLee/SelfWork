import React from 'react';

export default class VerificationCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      txt: ''
    };
  }
  randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  randomColor(min, max) {
    let r = this.randomNum(min, max);
    let g = this.randomNum(min, max);
    let b = this.randomNum(min, max);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  initCanvas(options) {
    let canvas = document.getElementById(options.id);
    const width = options.width || 76;
    const height = options.height || 36;
    const text = options.txt || '';
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext('2d');/**创建一个canvas对象*/
    ctx.textBaseline = "middle";
    ctx.fillStyle = this.randomColor(180, 255);/**这个范围的颜色作背景看起来清晰一些*/
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < text.length; i++) {
      let txt = text.charAt(i);/**让每个字不一样*/
      ctx.font = '20px SimHei';
      ctx.fillStyle = this.randomColor(50, 160); /**随机生成字体颜色*/
      ctx.shadowOffsetY = this.randomNum(-3, 3);
      ctx.shadowBlur = this.randomNum(-3, 3);
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      let x = width / (text.length + 1) * (i + 1);
      let y = height / 2;
      let deg = this.randomNum(-30, 30);
      /**设置旋转角度和坐标原点*/
      ctx.translate(x, y);
      ctx.rotate(deg * Math.PI / 180);
      ctx.fillText(txt, 0, 0);
      /**恢复旋转角度和坐标原点*/
      ctx.rotate(-deg * Math.PI / 180);
      ctx.translate(-x, -y);
    }
    /**1~4条随机干扰线随机出现*/
    for (let i = 0; i < this.randomNum(1, 4); i++) {
      ctx.strokeStyle = this.randomColor(40, 180);
      ctx.beginPath();
      ctx.moveTo(this.randomNum(0, width), this.randomNum(0, height));
      ctx.lineTo(this.randomNum(0, width), this.randomNum(0, height));
      ctx.stroke();
    }
    /**绘制干扰点*/
    for (let i = 0; i < options.width / 6; i++) {
      ctx.fillStyle = this.randomColor(0, 255);
      ctx.beginPath();
      ctx.arc(this.randomNum(0, options.width), this.randomNum(0, options.height), 1, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  handleGetCode() {
    this.props.dispatch({
      type: 'login/getVerificationCode',
    })
  }

  componentDidMount() {
    this.setState({
      txt: this.props.login.verCode
    });
    this.initCanvas({ txt: this.props.login.verCode, id: this.props.id });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.login.verCode !== nextState.txt) {
      this.setState({
        txt: nextProps.login.verCode
      })
      this.initCanvas({ txt: nextProps.login.verCode, id: this.props.id });
      return true;
    }
    else {
      return false;
    }
  }

  render() {

    return (
      <div style={{ width: 76, height: 36, cursor: 'pointer' }} onClick={this.handleGetCode.bind(this)}>
        <canvas id={this.props.id} width={76} height={36} ></canvas>
      </div>
    )
  }
}
