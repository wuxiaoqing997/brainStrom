Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionType: ['历史', '地理', '社科'],
    level: ['低', '中', '高',],
    openId: '',
    nickName: '',
    avatarUrl: '',
    livesCount: 0,
    questionValue: 1,
    levelValue: 1,
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
        //console.log('res', res.code)
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
            console.log('open',openId)
          }
        })
        wx.getUserInfo({
          success: function (res) {
            if (res != null && res.userInfo != null) {
              let result = res.userInfo
              nickName = result.nickName
              avatarUrl = result.avatarUrl
              _this.setData({
                openId, nickName, avatarUrl
              })
              //存储用户openId
              _this.setOpenId(openId, nickName, avatarUrl)
              wx.request({
                url: 'https://wuxiaoqing.club/i/user/update-info',
                method: 'post',
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                data: {
                  uuid: openId,
                  avatarUrl,
                  nickName,
                },
                success: function (res) {
                  let data = res.data.data
                  console.log(res.data, 'res')
                  _this.setData({
                    livesCount: data.powerCount,
                  })
                }
              })
            }
          }
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
    let uuid = this.data.openId
    let nickName = this.data.nickName
    let avatarUrl = this.data.avatarUrl
    console.log(uuid, nickName, avatarUrl,'datadatatest')
    let that = this

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
  begin: function() {
    this.takeResult()
    let that = this
    let questionValue = that.data.questionValue
    let levelValue = that.data.levelValue
    let livesCount = that.data.livesCount
    let url = `../answer/index?questionValue=${questionValue}&levelValue=${levelValue}&livesCount=${livesCount}`
    wx.navigateTo({
      url: url
    })
  },
  //存入用户的openId
  setOpenId: (id,name,avatar) => {
    let idValue = wx.getStorageSync('openId')
    let nameValue = wx.getStorageSync('name')
    let avatarValue = wx.getStorageSync('avatar')
    if(idValue.length === 0){
      wx.setStorageSync('name', name)
      wx.setStorageSync('openId', id)
      wx.setStorageSync('avatar', avatar)
    }
  },
  //选择类型
  changeType: function(e){
    let val = e.detail.value
    this.setData({
      questionValue: Number(val[0] + 1),
      levelValue: Number(val[1] + 1),
    })
  },
  //获取答案缓存
  takeResult: ()=>{
    let myDate = new Date()
    let year = myDate.getFullYear()
    let month = myDate.getMonth() + 1
    let day = myDate.getDay()
    let key = `resultList${year}-${month}-${day}`
    console.log(key,'key')
    let value = wx.getStorageSync(key) 
    console.log(typeof value,'value')
    if (value.length === 0) {
      wx.setStorageSync(key, [])
      console.log(wx.getStorageSync(key),'aaaa')
    }
  }
})
