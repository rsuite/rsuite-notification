import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  duration: PropTypes.number,
  content: PropTypes.any,
  onClose: PropTypes.func,
  closable: PropTypes.bool,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string
};

const defaultProps = {};

class Notice extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { duration } = this.props;
    if (duration) {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, duration * 1000);
    }
  }


  clearCloseTimer() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  close = () => {
    this.clearCloseTimer();
    this.props.onClose();
  }

  componentWillUnmount() {
    this.clearCloseTimer();
  }

  render() {
    const { prefixCls, closable, className, content, style, type } = this.props;
    const componentClass = `${prefixCls}-notice`;
    const classNames = {
      [`${componentClass}`]: true,
      [`${componentClass}-closable`]: closable,
      [className]: !!className,
      [`${prefixCls}-${type}`]: !!type,
    };

    return (
      <div className={classnames(classNames)} style={style}>
        <div className={`${componentClass}-content`}>{content}</div>
        {closable && <div onClick={this.close} className={`${componentClass}-close`}>
          <span className={`${componentClass}-close-x`}></span>
        </div>}
      </div>
    );
  }
}

Notice.propTypes = propTypes;

Notice.defaultProps = defaultProps;

export default Notice;
