Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: [],
    rank: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = this.returnOpenId()
    let url = `https://wuxiaoqing.club/i/rank/get?uuid=${id}`
    let that = this
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
       // console.log(`https://wuxiaoqing.club/i/rank/get?uuid=${id}`, res.data)
        let data = res.data.data
       // console.log(data.list,'data')
        if(data.list && data.list.length > 0){
          that.setData({
            userList: data.list,
            rank: data.rank
          })
        }
        //console.log(that.data)
      }
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
  //获取用户信息
  returnOpenId: () => {
    let value = wx.getStorageSync('openId')
    if (value.length != 0) {
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