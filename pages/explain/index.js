Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',//题目名称
    descirbe: '',//题目描述
    right: '',//正确答案
    yours: '',//用户答案
    openid: '',//用户id
    isRight: '',//是否正确
    lives: '',//剩余生命
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let uuid = this.returnOpenId
    // let answer = options.answer
    // let questionId = options.id
    // let url = `https://wuxiaoqing.club/i/question/submit`
    // wx.request({
    //   url: url,
    //   method: 'post',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   data: {
    //     uuid,
    //     questionId,
    //     answer
    //   },
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })
    let id = options.id
    let lives = options.lives
    let value = wx.getStorageSync(id)
    this.setData({
      lives,
      name: value.name,
      describe: value.describe,
      right: value.rightAnswer,
      yours: value.answer
    })
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
  //返回答题页面
  backToAnswer:function(){
    let url = `../answer/index?livesCount=${this.data.lives}`
    wx.redirectTo({
      url: url
    })
  },
  //存储结果
  pushAnswer: function(){
    let data = {
      'id': this.data.questionId,
      'isRight': false,
      'answer': '',
    }
    let myDate = new Date()
    let year = myDate.getFullYear()
    let month = myDate.getMonth() + 1
    let day = myDate.getDate()
    let key = `resultList${year}-${month}-${day}`
    let value = wx.getStorageSync(key)
    value.push(data)
    wx.setStorageSync(key, value)
  }

})