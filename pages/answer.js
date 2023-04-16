var answers = require('../utils/answers/data/answers');

Page({
  data: {
    answer: '', // 用于展示随机抽出的答案
    answerList: [], // 存储答案的数组
    windowWidth: 0, // 窗口宽度
    windowHeight: 0, // 窗口高度
    backgroundUrl: '', // 背景图片链接
    backgroundSize: '', // 背景图片大小
    fontSize: 50, // 初始字体大小
    btn_bottom: 40,
    answer_top: 50,
    typingAnimationData: "", // 打字机动画数据
    typingAnimationData2: "", // 打字机动画数据
  },
  
  onShow: function () {
    // 页面显示时开始打字机动画
    this.startTypingAnimation("chinese", 300);
    this.startTypingAnimation("english", 100);
    // this.startTypingAnimation(); // 开始打字机动画
  },

  onHide: function () {
    // 页面隐藏时清除动画定时器
    clearTimeout(this.data.animationTimer);
  },

  startTypingAnimation: function (lang, speed) {
    const { answer } = this.data;
    let currentIndex = 0;
    let animationText = '';

    // 根据传入的语言信息判断使用中文还是英文进行动画效果
    const targetText = lang === 'chinese' ? answer.chinese : answer.english;
    const targetField = lang === 'chinese' ? 'typingAnimationData' : 'typingAnimationData2';

    // console.log("answer", targetText);

    const animationTimer = setInterval(() => {
      if (currentIndex < targetText.length) {
        animationText = targetText.substring(0, currentIndex + 1);
        currentIndex++;
        // console.log("animationText", animationText);
        this.setData({
          [targetField]: animationText,
        });
      } else {
        clearInterval(animationTimer);
      }
    }, speed);

    this.setData({ animationTimer });
  },

  // 点击按钮触发的事件处理函数
  generateAnswer: function() {
    // 从答案数组中随机抽出一个词语
    var randomIndex = Math.floor(Math.random() * this.data.answerList.length);
    var randomAnswer = this.data.answerList[randomIndex];
    // console.log(randomAnswer)
    // 更新数据，展示随机抽出的答案
    this.setData({
      answer: randomAnswer
    });
  },

  // 跳转答案页面
  goIndexPage: function() {
    this.setData({
      typingAnimationData: "",
      typingAnimationData2: ""
    });
    // 页面跳转到answer页面
    wx.navigateTo({
      url: '/pages/index' // 替换成您要跳转的页面路径
    });
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

    // 初始化答案数组，可以在此处添加/修改答案
    // console.log(answers)
    that.setData({
      answerList: answers.default
    });

    // 展示答案
    that.generateAnswer();
    // that.startTypingAnimation();
  },

})
