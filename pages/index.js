//index.js
var answers = require('../utils/answers/data/answers');

Page({
  data: {
    answer: '', // 用于展示随机抽出的答案
    answerList: [], // 存储答案的数组
    windowWidth: 0, // 窗口宽度
    windowHeight: 0, // 窗口高度
    backgroundUrl: '', // 背景图片链接
    backgroundSize: '', // 背景图片大小
    fontSize: 20, // 初始字体大小
    btn_bottom: 40,
    e_text_top: 30,
    c_text_top: 40,
    p_text_top: 60,
    countdownText: ''
  },

  // 点击按钮触发的事件处理函数
  generateAnswer: function() {
    // 从答案数组中随机抽出一个词语
    var randomIndex = Math.floor(Math.random() * this.data.answerList.length);
    var randomAnswer = this.data.answerList[randomIndex];
    console.log(randomAnswer)
    // 更新数据，展示随机抽出的答案
    this.setData({
      answer: randomAnswer
    });
  },

  // 跳转答案页面
  goAnswerPage: function() {
    // 获取倒计时文本元素
    const query = wx.createSelectorQuery();
    query.select('#countdown-text').context((res) => {
      // 设置初始倒计时文本为3
      this.setData({ countdownText: '3' });

      // 延时1秒
      setTimeout(() => {
        // 设置倒计时文本为2
        this.setData({ countdownText: '2' });

        // 延时1秒
        setTimeout(() => {
          // 设置倒计时文本为1
          this.setData({ countdownText: '1' });

          // 在倒计时结束后，执行其他操作，例如跳转页面或显示答案
          setTimeout(() => {
            // 在倒计时结束后，可以执行其他操作，例如跳转页面或显示答案
            wx.navigateTo({
              url: '/pages/answer'
            });
          }, 1200);
        }, 1200);
      }, 1200);
    }).exec();
  },

  // base64
  backgroundBase: function(path) {
    return 'data:image/jpg;base64,' + wx.getFileSystemManager().readFileSync(path, 'base64');
  },

  // 生命周期函数，页面加载时触发
  onLoad: function() {
    var that = this;

    // 获取窗口高度
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        });
      }
    });

    // 设置背景图片链接
    // 可以根据实际情况替换为你的背景图片链接
    const imgPath = this.backgroundBase('/assets/images/bg.png');
    that.setData({
      backgroundUrl: imgPath
    });

    // 设置背景图片大小为窗口大小
    that.setData({
      backgroundSize: '100% ' + that.data.windowHeight + 'px'
    });

    // 计算合适的字体大小
    that.calculateFontSize();

    // 初始化答案数组，可以在此处添加/修改答案
    // console.log(answers)
    that.setData({
      answerList: answers.default
    });
  },

  calculateFontSize: function() {
    var that = this;
    var windowWidth = that.data.windowWidth;
    var fontSize = 6; // 初始字体大小
    var textWidth = 0; // 文字宽度

    // 创建一个 SelectorQuery 实例
    var query = wx.createSelectorQuery();
    query.select('.text').boundingClientRect(function(rect) {
      textWidth = rect.width;

      // 计算合适的字体大小
      fontSize = fontSize * windowWidth / textWidth;
      that.setData({
        fontSize: fontSize
      });
    }).exec();
  }
})
