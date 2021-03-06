import { prefix } from 'rsuite-utils/lib/utils';
import Notification from '../core';
import { NOTICE_TYPES, namespace } from '../constants/index';

let alertInstance;
let defaultDuration = 2000;
let defaultTop = 5;
let defaultClassPrefix = `${namespace}-notification`;
let getContainer;

const addPrefix = name => prefix(defaultClassPrefix)(name);

function getInstance(callback) {
  Notification.newInstance(
    {
      style: { top: defaultTop },
      duration: defaultDuration,
      className: addPrefix('alert'),
      classPrefix: defaultClassPrefix,
      getContainer,
    },
    callback,
  );
}

function notice(content, duration = defaultDuration, onClose, type) {
  if (typeof content === 'function') {
    content = content();
  }

  const noticePorps = {
    content,
    duration,
    onClose,
    type,
    closable: true,
  };

  if (!alertInstance) {
    getInstance((notificationInstance) => {
      alertInstance = notificationInstance;
      notificationInstance.notice(noticePorps);
    });
  } else {
    alertInstance.notice(noticePorps);
  }
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
    if (options.classPrefix !== undefined) {
      defaultClassPrefix = options.classPrefix;
    }
    if (options.getContainer !== undefined) {
      getContainer = options.getContainer;
    }
  },
};
