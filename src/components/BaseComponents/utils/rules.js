export const rules = {

  required: (item) => {
    let rules = {required: true, message: '请输入' + item.label};
    if (item.type === 'image') rules.message = '请上传' + item.label;
    if (item.type === 'date' || item.type === 'switch' || item.type === 'select') rules.message = '请选择' + item.label;
    return rules;
  },

  /* 手机号码 */
  phone: (item) => {
    return {pattern: /^1([34578])\d{9}$/, message: '请输入正确的手机号码'}
  },


  /*  自定义校验器  */

  validator: (item) => {
    return {validator: item.validator}
  }

}

export default rules
