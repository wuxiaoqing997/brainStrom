Page({

  /**
   * 页面的初始数据
   */
  data: {
    describe:'', //题目描述
    name: '',//题目名字
    answerList:[], //答案
    num: '', //当前点击答案索引
    questionId: '',//题目id，
    openId: '',//用户id
    second: 180, //倒计时
    level: '',//题目难度
    typeValue: '',//题目类型
    lives: '',//剩余生命值,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    let level = options.levelValue || 1
    let typeValue = options.questionValue || 2
    let lives = options.livesCount || 100
    _this.setData({
      level,typeValue,lives
    })
    let url = `https://wuxiaoqing.club/i/question/get?level=${level}&type=${typeValue}`
    wx.request({
      url: url,
      method: 'get',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        if(res && res.data != null){
          let data = res.data.data
          console.log(data,'data')
          let answerList = data.answers
          let describe = data.describe
          let questionId = data.questionId
          let name = data.questionName
          _this.setData({
            answerList, describe, questionId,name
          })
         // console.log(_this.data)
        }
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
   // let openId = this.returnOpenId()
    this.count(this);
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
  //用户结束答题
  endResult: function(){
    let livesCount = this.data.lives
    let url = `../result/index?livesCount=${livesCount}`
    wx.redirectTo({
      url: url,
    })
  },
  //点击答案
  chooseAnswer: function(e){
    let that = this
    let id = e.currentTarget.dataset.num;
    //设置当前样式
    that.setData({
       num : id,
    })
  },
  //提交答案
  submitResult: function(){
    let that = this
    let answerNum = this.data.num || 0
    let id = this.data.questionId
    let name = this.data.name
    let answer = this.data.answerList[answerNum]
    let describe = this.data.describe
    let rightAnswerNum = ''
    let rightAnswer = ''
    let openId = this.returnOpenId()
    let url = `https://wuxiaoqing.club/i/question/submit`
    wx.request({
      url: url,
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        uuid:openId,
        questionId:id,
        answer:answerNum
      },
      success: function (res) {
        let data = res.data.data
        console.log(data,'dat')
        that.setData({
          lives: data.powerCount
        })
        rightAnswerNum = data.rightAnswer
        rightAnswer = that.data.answerList[rightAnswerNum]
        let isRight = data.isRight
        console.log('name', name, describe, rightAnswer, answer)
        let obj = {
          'name': name,
          'describe': describe,
          'isRight': isRight,
          'answer': answer,
          'rightAnswer': rightAnswer,
        }
        that.saveResult(obj)
        let questionObj = {
          id,
          answer,
          name,
          describe,
          rightAnswer
        }
        that.saveQuestion(questionObj)
        let urlTo = `../explain/index?id=${id}&lives=${that.data.lives}`
        wx.redirectTo({
          url: urlTo,
        })
      }
    })
   
  },
  //获取用户id
  returnOpenId: () =>{
    let value = wx.getStorageSync('openId')
    if(value != null){
      return value
    }else{
      wx.showToast({
        title: '请稍候再试',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  //倒计时
  count: function(that) {
    var second = that.data.second
    if (second == 0) {
      that.skipQuestion()
    }
    var time = setTimeout(function () {
      that.setData({
        second: second - 1
      });
      that.count(that);
    }
      , 1000)
  },
  //跳过此题
  skipQuestion: function(){
    // let data = {
    //   'id': this.data.questionId,
    //   'isRight': false,
    //   'answer': '',
    // }
    // let myDate = new Date()
    // let year = myDate.getFullYear()
    // let month = myDate.getMonth() + 1
    // let day = myDate.getDay()
    // let key = `resultList${year}-${month}-${day}`
    // let value = wx.getStorageSync(key) 
    // value.push(data)
    // wx.setStorageSync(key, value)
    let url = `../answer/index?questionValue=${this.data.typeValue}&levelValue=${this.data.level}&livesCount=${this.data.lives}`
    wx.redirectTo({
      url: url
    })
  },
  //存储答案
  saveResult:function(obj){
    let data = {
      'name': obj.name,
      'describe': obj.describe,
      'isRight': obj.isRight,
      'answer': obj.answer,
      'rightAnswer': obj.rightAnswer,
    }
    let myDate = new Date()
    let year = myDate.getFullYear()
    let month = myDate.getMonth() + 1
    let day = myDate.getDay()
    let key = `resultList${year}-${month}-${day}`
    let value = wx.getStorageSync(key) 
    value.push(data)
    wx.setStorageSync(key, value)
    console.log(wx.getStorageSync(key) ,'key5')
  },
  //存储题目
  saveQuestion:function(obj){
    let id = obj.id
    let result = obj
    wx.setStorageSync(id, result)
  }
})