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
    livesCount: '',
    questionValue: 1,
    levelValue: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    wx.setStorageSync('questionValue', 1)
    wx.setStorageSync('levelValue', 1)
    wx.login({
      //获取code
      success: function (res) {
        let js_code = res.code //返回code
        let openId = ''
        let nickName = ''
        let avatarUrl = ''
       // console.log(js_code)
        wx.getUserInfo({
          success: function (res) {
            console.log(res)
            if (res != null && res.userInfo != null) {
              let result = res.userInfo
              nickName = result.nickName
              avatarUrl = result.avatarUrl
              // _this.setData({
              //   openId, nickName, avatarUrl
              // })
              // console.log(openId,'openS')
            
              //存储用户openId
              //console.log(openId, nickName, avatarUrl)
              wx.request({
                url: 'https://wuxiaoqing.club/i/user/update-info',
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                data: {
                  js_code,
                  avatarUrl,
                  nickName,
                },
                success: function (res) {
                   let data = res.data.data
                  //console.log(res.data, 'res')
                  openId = data.openid
                  _this.setData({
                    livesCount: data.powerCount,
                    openId, nickName, avatarUrl,
                  })
                  _this.setOpenId(openId, nickName, avatarUrl)
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
    // let uuid = this.data.openId
    // let nickName = this.data.nickName
    // let avatarUrl = this.data.avatarUrl
    // console.log(uuid, nickName, avatarUrl,'datadatatest')
    // let that = this

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
    let livesCount = that.data.livesCount
    let questionValue = that.data.questionValue
    let levelValue = that.data.levelValue
    that.takeLevel(questionValue, levelValue)
    let url = `../answer/index?questionValue=${questionValue}&levelValue=${levelValue}&livesCount=${livesCount}`
    wx.redirectTo({
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
    let day = myDate.getDate()
    //console.log(day)
    let key = `resultList${year}-${month}-${day}`
    //console.log(key,'key')
    let value = wx.getStorageSync(key) 
   // console.log(typeof value,'value')
    if (value.length === 0) {
      wx.setStorageSync(key, [])
     // console.log(wx.getStorageSync(key),'aaaa')
    }
  },
  //获取题型和难度
  takeLevel: function (questionValue, levelValue){
      wx.setStorageSync('questionValue', questionValue)
      wx.setStorageSync('levelValue', levelValue)
  }
})
