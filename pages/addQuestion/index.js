Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultList: ['A','B','C','D'],
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
    
  }
})