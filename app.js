//app.js
App({
  onLaunch: function () {
    console.log(this.globalData.isDebug);
    if (this.globalData.isDebug){
      host
    }
  },

  globalData: {
    hasLogin: false,
    userInfo: null,
    g_isPlayingMusic: false,
    g_currentMusicPostId: null,
    isDebug: false,
    host: 'http://t.yushu.im',
    dHost: "Jifejif"
  }
})