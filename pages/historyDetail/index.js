Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',//题目名称
    describe: '',//题目描述
    right: '',//正确答案
    yours: '',//用户答案
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
  //  console.log(id,'id')
    let value = wx.getStorageSync(id)
   // console.log(value,'value')
    this.setData({
      name: value.name,
      describe: value.describe,
      right: value.rightAnswer,
      yours: value.answer,
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
  //返回
  backToHistory: function(){
    wx.redirectTo({
      url: `../result/index`
    })
  }
})