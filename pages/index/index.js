Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionType: ['历史','地理','社科'],
    level: ['低', '中','高', ],
    openId: '',
    nickName: '',
    avatarUrl: '',
    livesCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    wx.login({
      //获取code
      success: function (res) {
        let code = res.code //返回code
        console.log('res',res)
        let appId = 'wx53625e028829c2c9'
        let secret = '6ceb7fcb6187289ae43192eaf3a3bdd1'
        let openId = ''
        let nickName = ''
        let avatarUrl = ''
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'json'
          },
          success: function (res) {
            openId = res.data.openid //返回openId
          }
        })
        wx.getUserInfo({
          success: function (res) {
            if(res != null && res.userInfo != null){
              let result = res.userInfo
              nickName = result.nickName
              avatarUrl = result.avatarUrl
              _this.setData({
                openId, nickName, avatarUrl
              })
            }
          }
        })
      }
    })
    console.log(this.data,'data')
    console.log('openId', this.data.openId)
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
    let _this = this
    console.log(this.data, '_this.data.openId')
    //_this.setOpenId(_this.data.openId)
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
  //开始游戏
  begin: () => {
    wx.navigateTo({
      url: '../answer/index'
    })
  },
  //存入用户的openId
  setOpenId: (id) => {
    try {
      var value = wx.getStorageSync('openId')
      if (!value) {
        wx.setStorageSync('openId', id)
        console.log(id,'this.data.openId',id)
        wx.getStorage({
          key: 'openId',
          success: function (res) {
            console.log(res,'aaa')
          }
        })
      }
    } catch (e) {
      console.log(e)
    }
  }
})
