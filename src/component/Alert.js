import Notification from '../core';
import { NOTICE_TYPES } from '../constants/index';

let alertInstance;
let defaultDuration = 2000;
let defaultTop = 5;
let getContainer;

function getInstance(instance) {
  return instance || Notification.newInstance({
    style: { top: defaultTop },
    duration: defaultDuration,
    className: 'rsuite-alert',
    getContainer
  });
}

function notice(content, duration = defaultDuration, onClose, type) {
  alertInstance = getInstance(alertInstance);
  if(typeof content === 'function'){
    contetn = contetn();
  }
  alertInstance.notice({
    content,
    duration,
    onClose,
    type,
    closable: true
  });
}

export default {
  success(content, duration, onClose) {
    notice(content, duration, onClose, NOTICE_TYPES.SUCCESS);
  },
  error(content, duration, onClose) {
    notice(content, duration, onClose, NOTICE_TYPES.ERROR);
  },
  info(content, duration, onClose) {
    notice(content, duration, onClose, NOTICE_TYPES.INFO);
  },
  warning(content, duration, onClose) {
    notice(content, duration, onClose, NOTICE_TYPES.WARNING);
  },
  /**
   *
   * @param {*} options{
   *  top,
   *  duration,
   *  getContainer
   * }
   */
  config(options) {
    if (options.top !== undefined) {
      defaultTop = options.top;
      alertInstance = null;
    }
    if (options.duration !== undefined) {
      defaultDuration = options.duration;
    }
    if (options.getContainer !== undefined) {
      getContainer = options.getContainer;
    }
  }
};

