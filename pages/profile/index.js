Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarValue:'',
    nameValue:'',
    idValue:'',
    wrongCount: 0,
    rightCount: 0,
    livesCount: 100,
    answerCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo()
    let that = this
    let id = this.data.idValue
 //   console.log(id,'idid')
    let url = `https://wuxiaoqing.club/i/user/info?uuid=${id}`
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
       // console.log(res.data.data)
        let data = res.data.data
        let wrongCount = data.wrongTimes
        let answerCount = data.submitTimes
        let rightCount = data.rightTimes
        let livesCount = data.powerCount
        that.setData({
          wrongCount, answerCount, rightCount, livesCount,
        })
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
  getInfo: function(){
    let idValue = wx.getStorageSync('openId')
    let nameValue = wx.getStorageSync('name')
    let avatarValue = wx.getStorageSync('avatar')
   // console.log(idValue)
    this.setData({
      idValue,nameValue,avatarValue
    })
  }
})