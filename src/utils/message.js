import {MessageBox} from 'element-ui';


export function errorMessage(message) {
  return new Promise((resolve, reject) => {
    MessageBox.confirm(message, '提示', {
      confirmButtonText: '确定',
      showCancelButton: false,
      type: 'warning '
    }).then(() => {
      resolve()
    }).catch(() => {
      reject()
    })
  })
}

export function successMessage(message) {
  return new Promise((resolve, reject) => {
    MessageBox.confirm(message, '成功', {
      confirmButtonText: '确定',
      showCancelButton: false,
      type: 'success'
    }).then(() => {
      resolve()
    }).catch(() => {
      reject()
    })
  })
}

export function messageBox({message, title, confirmButtonText, cancelButtonText, type = 'warning '}) {
  return new Promise((resolve, reject) => {
    MessageBox.confirm(message, title, {
      confirmButtonText: cancelButtonText,
      cancelButtonText: cancelButtonText,
      type: type
    }).then(() => {
      resolve()
    }).catch(() => {
      reject()
    })
  })
}
