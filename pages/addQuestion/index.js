Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultList: ['A', 'B', 'C', 'D'],
    questionType: ['历史', '地理', '社科'],
    level: ['低', '中', '高',],
    rightValue: 0,
    questionValue: 1,
    levelValue: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'https://wuxiaoqing.club/i/question/get?level=1&type=2',
    //   method: 'get',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
    // wx.request({
    //   url: 'https://wuxiaoqing.club/i/question/add',
    //   method: 'post',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   data: {
    //     uuid :'user0001',//{String } {必填 } 出题人唯一 Id
    //     questionName : '你的体重是多少',//{String } {必填 } 题目名称 //'人口之最'
    //     describe :'你的体重是多少？？？？',//{String } {必填 } 题目描述 // '世界上人口最多的国家是'
    //     answers :'110,130,150,170',//{String } {必填 } 用 , 拼接各选项描述 // '中国,美国,德国,日本'
    //     rightAnswer:0,// {Number } {必填 } 0 1 2 3
    //     level:1,// {Number } {必填 } 1 2 3 ...
    //     type :3,//{Number } {必填 } 1 历史 2 地理 3 社科
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
    // wx.request({
    //   url: 'https://wuxiaoqing.club/i/question/get?questionId=5ac25dc59931337d83fbeeaf',
    //   method: 'get',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //获取表单内容  
  questionSubmit: function (e) {
    let data = e.detail.value
    console.log(data)
    let questionName = data.title
    let questionDescirbe = data.question
    let aValue = data.result_a
    let bValue = data.result_b
    let cValue = data.result_c
    let dValue = data.result_b
    let openId = this.returnOpenId()
    let dataOfThis = this.data
  //  console.log(openId, dataOfThis)
    if (questionName.length != 0 && questionDescirbe.length != 0 && aValue.length != 0 && bValue.length != 0 && dValue.length != 0) {
      wx.request({
        url: 'https://wuxiaoqing.club/i/question/add',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: {
          uuid: openId,//{String } {必填 } 出题人唯一 Id
          questionName,//{String } {必填 } 题目名称 //'人口之最'
          describe: questionDescirbe,//{String } {必填 } 题目描述 // '世界上人口最多的国家是'
          answers: `${aValue},${bValue},${cValue},${dValue}`,//{String } {必填 } 用 , 拼接各选项描述 // '中国,美国,德国,日本'
          rightAnswer: dataOfThis.rightValue,// {Number } {必填 } 0 1 2 3
          level: dataOfThis.levelValue,// {Number } {必填 } 1 2 3 ...
          type: dataOfThis.questionValue,//{Number } {必填 } 1 历史 2 地理 3 社科
        },
        success: function (res) {
          console.log(res.data)
        }
      })
    } else {
      wx.showToast({
        title: '请补充完整！',
        icon: 'none',
        duration: 2000
      })
    }

  },
  //获取表单滚动框内容
  changeType: function (e) {
    let val = e.detail.value
    console.log(val)
    this.setData({
      rightValue: Number(val[0]),
      questionValue: Number(val[1] + 1),
      levelValue: Number(val[2] + 1),
    })
  },
  //获取用户id
  returnOpenId: () => {
    let value = wx.getStorageSync('openId')
    if (value != null) {
      return value
    } else {
      wx.showToast({
        title: '请稍候再试',
        icon: 'loading',
        duration: 2000
      })
    }
  },
})