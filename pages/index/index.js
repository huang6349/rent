//index.js
//获取应用实例
const app = getApp();
const { extend, Field, Toast } = require('../../zanui/2.4.4/dist/index');

Page(extend({}, Field, Toast, {
  data: {
    dian: 1.2,
    shui: 4,
    fz: 650,
    count: 0,
    field: {
      dian1: {
        inputType: 'number',
        title: '上月用电',
        placeholder: '请输入上月用电度数',
        mode: 'wrapped',
        right: true,
        componentId: 'dian1'
      },
      dian2: {
        inputType: 'number',
        title: '本月用电',
        placeholder: '请输入本月用电度数',
        mode: 'wrapped',
        right: true,
        componentId: 'dian2'
      },
      shui1: {
        inputType: 'number',
        title: '上月用水',
        placeholder: '请输入上月用水吨数',
        mode: 'wrapped',
        right: true,
        componentId: 'shui1'
      },
      shui2: {
        inputType: 'number',
        title: '本月用水',
        placeholder: '请输入本月用水吨数',
        mode: 'wrapped',
        right: true,
        componentId: 'shui2'
      },
      fz: {
        inputType: 'number',
        title: '本月房租',
        placeholder: '请输入本月房租价格',
        mode: 'wrapped',
        right: true,
        componentId: 'fz'
      },
    },
  },
  onLoad: function () {
    const { fz } = this.data;
    this.setData({
      count: fz,
    });
  },
  formSubmit: function (e) {
    const { dian1, dian2, shui1, shui2, fz } = e.detail.value;
    const { dian, shui } = this.data;
    const fdian1 = parseFloat(dian1 || 0);
    if (!this.isRealNum(fdian1)) {
      this.showZanToast('上月用电只能是数字');
      return;
    }
    const fdian2 = parseFloat(dian2 || 0);
    if (!this.isRealNum(fdian2)) {
      this.showZanToast('本月用电只能是数字');
      return;
    }
    if (fdian2 < fdian1) {
      this.setData({
        [`field.dian2.error`]: true,
      });
      this.showZanToast('本月用电要大于上月用电');
      return;
    }
    const fshui1 = parseFloat(shui1 || 0);
    if (!this.isRealNum(fshui1)) {
      this.showZanToast('上月用水只能是数字');
      return;
    }
    const fshui2 = parseFloat(shui2 || 0);
    if (!this.isRealNum(fshui2)) {
      this.showZanToast('本月用水只能是数字');
      return;
    }
    if (fshui2 < fshui1) {
      this.setData({
        [`field.shui2.error`]: true,
      });
      this.showZanToast('本月用水要大于上月用水');
      return;
    }
    const yd = (fdian2 - fdian1) * parseFloat(dian);
    const ys = (fshui2 - fshui1) * parseFloat(shui);
    this.setData({
      count: yd + ys + parseFloat(fz || 0),
    });
  },
  isRealNum: function (val) {
    // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
    if (val === "" || val == null) {
      return false;
    }
    if (!isNaN(val)) {
      return true;
    } else {
      return false;
    }
  },
  handleZanFieldChange: function ({ componentId, detail }) {
    const { value } = detail;
    const error = !this.isRealNum(value);
    this.setData({
      [`field.${componentId}.error`]: error,
    });
  },
  handleZanFieldFocus({ componentId, detail }) { },
  handleZanFieldBlur({ componentId, detail }) { },
}));
