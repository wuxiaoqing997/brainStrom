Page({

  /**
   * 页面的初始数据
   */
  data: {
    agreeUrl: '../../images/appreciate_black.png',
    disagreeUrl: '../../images/oppose_black.png',
    showUrl: '../../images/unfold.png',
    questionList: [],
    expend: false,
    questionType: '',
    levelValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let questionType = wx.getStorageSync('questionValue')
    let levelValue = wx.getStorageSync('levelValue')
    let that = this
    let questionList = []
    let url = `https://wuxiaoqing.club/i/question/unpublished?level=${levelValue}&type=${questionType}`
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        let data = res.data.data
        // console.log(data)
        if (data && data.unpublishedQuestions.length != 0) {
          questionList = data.unpublishedQuestions
        }
        for (let i in questionList) {
          let item = questionList[i]
          item.flag = false
          item.agreeUrl = that.data.agreeUrl
          item.disagreeUrl = that.data.disagreeUrl
          item.showUrl = that.data.showUrl
          item.change = ''
        }
        that.setData({
          questionList, questionType, levelValue
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
  //修改图标
  changeAgree: function (e) {
    let data = e.currentTarget.dataset
    let idx = data.id
    let change = data.change
    let questionId = data.questionid
    // console.log(change)
    if (change.length == 0) {
      let agree = '../../images/appreciate_red.png'
      let changeValue = 'changed'
      let itemAgree = `questionList[${idx}].agreeUrl`
      let itemChange = `questionList[${idx}].change`
      let pass = true
      //console.log()
      this.setData({
        [itemAgree]: agree,
        [itemChange]: changeValue,
      })
      this.resloveOpera(questionId, pass, this.data.questionType, this.data.levelValue)
    } else {
      wx.showToast({
        title: '您已经操作过此题',
        icon: 'none',
        duration: 2000
      })
    }

    // console.log(this.data.questionList)
  },
  changeDisagree: function (e) {
    let data = e.currentTarget.dataset
    // console.log(e)
    let idx = data.id
    let change = data.change
    let questionId = data.questionid
    if (change.length == 0) {
      let unAgree = '../../images/oppose_red.png'
      let changeValue = 'changed'
      let itemChange = `questionList[${idx}].change`
      let itemDisagree = `questionList[${idx}].disagreeUrl`
      let pass = false
      this.setData({
        [itemDisagree]: unAgree,
        [itemChange]: changeValue,
      })
      this.resloveOpera(questionId, pass, this.data.questionType, this.data.levelValue)
    } else {
      wx.showToast({
        title: '您已经操作过此题',
        icon: 'none',
        duration: 2000
      })
    }

  },
  changeShow: function (showUrl) {
    let show = '../../images/unfold.png'
    let unShow = '../../images/fold.png'
    let result = ''
    if (showUrl == show) {
      result = unShow
    } else {
      result = show
    }
    return result
  },
  //展开详情
  expandDetail: function (e) {
    let data = e.currentTarget.dataset
    //  console.log(data,'ddd')
    let show = data.show
    let showResult = this.changeShow(show)
    let idx = data.idx // 获取当前下标
    let flag = `questionList[${idx}].flag`
    let flagVal = this.data.questionList[idx].flag
    let itemShow = `questionList[${idx}].showUrl`
    this.setData({
      [flag]: !flagVal,
      [itemShow]: showResult
    })
    // console.log(this.data.questionList)
  },
  //操作题目
  resloveOpera: function (questionId, pass, questionType, level){
    wx.request({
      url: 'https://wuxiaoqing.club/i/question/evaluate',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        questionId,
        pass,
        type: questionType,
        level
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  //获取更多
  takeMore:function(){
    wx.showToast({ 
      title: '加载中',
      icon: 'loading',
      duration: 1000
    }) 
    let that = this
    let questionList = []
    let questionBefore = that.data.questionList
    let url = `https://wuxiaoqing.club/i/question/unpublished?level=${that.data.levelValue}&type=${that.data.questionType}`
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        let data = res.data.data
        // console.log(data)
        if (data && data.unpublishedQuestions.length != 0) {
          questionList = data.unpublishedQuestions
        }
        for (let i in questionList) {
          let item = questionList[i]
          item.flag = false
          item.agreeUrl = that.data.agreeUrl
          item.disagreeUrl = that.data.disagreeUrl
          item.showUrl = that.data.showUrl
          item.change = ''
        }
        that.setData({
          questionList: questionBefore.concat(questionList)
        })
        console.log(that.data.questionList)
      }
    })
  },
})