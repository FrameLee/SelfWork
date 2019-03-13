import { Modal } from 'antd';

// Modal.confirm模态框
export const modalConfirm = function (
  { title,
    okText,
    cancelText='Cancel',
    onOkFunc,
    onCancalFunc
  },
  otherSettings = {}
) {
  Modal.confirm(Object.assign({
    autoFocusButton: null,
    okText: 'Cancel',
    okType: 'default',
    content: '',
    centered: true,
    cancelButtonProps: {
      type: 'custom'
    }
  }, {
      title,
      cancelText: okText,
      okText: cancelText,
      onOk() {//实际是cancel
        onCancalFunc();
      },
      onCancel() {//实际是ok
        onOkFunc();
      },

    }, otherSettings));
}

// icon为'叉号的'Modal.confirm模态框
export const modalErrorConfirm = function (
  { title,
    okText,
    onOkFunc,
    onCancalFunc
  },
  otherSettings = {}
) {
  Modal.confirm(Object.assign({
    className: 'ModalErrorConfirm',
    iconType: 'close-circle',
    autoFocusButton: null,
    okText: 'Cancle',
    okType: 'default',
    content: '',
    centered: true,
    cancelButtonProps: {
      type: 'danger'
    }
  }, {
      title,
      cancelText: okText,
      onOk() {//实际是cancel
        onCancalFunc();
      },
      onCancel() {//实际是ok
        onOkFunc();
      },

    }, otherSettings));
}

// 'Modal.success模态框
export const modalSuccess = function (
  { title,
    content,
    okText,
  },
  otherSettings = {}
) {
  console.log('title--->', title)
  Modal.success(Object.assign({
    okType: 'custom'
  }, {
      title,
      content,
      okText
    }, otherSettings));
}

// 'Modal.error模态框
export const modalError = function (
  { title,
    content,
    okText,
  },
  otherSettings = {}
) {
  Modal.error(Object.assign({
    okType: 'custom'
  }, {
      title,
      content,
      okText
    }, otherSettings));
}
