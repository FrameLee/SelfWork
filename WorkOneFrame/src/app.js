import { notification } from 'antd';
// import { formatMessage } from 'umi/locale';

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      notification.error({
        message: 'Error',
        description: err.message,
      });
    },
  }
};
