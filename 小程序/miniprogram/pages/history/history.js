// pages/history/history.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Imginfo_data:[]
    },
    toDetail(e) {
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '../detail/detail?id=' + id,
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
    let storage_key = wx.getStorageInfoSync();
    storage_key = storage_key.keys;
    let Imginfo_key = [];
    for (let i = 0; i < storage_key.length; i++) {
      let key = storage_key[i].split("-");
      if (key[0] == "ImgInfo") {
        Imginfo_key.push(key[1]);
      }
    }
    Imginfo_key = Imginfo_key.sort().reverse();

    let Imginfo_data = []
    for (let i = 0; i < Imginfo_key.length; i++) {
      let temp = JSON.parse(wx.getStorageSync("ImgInfo-" + Imginfo_key[i]));
      temp["id"] = Imginfo_key[i];
      let now = new Date(parseInt(Imginfo_key[i]) * 1000);
      let month = now.getMonth() + 1;
      let date = now.getDate();
      let hour = (now.getHours() < 10)?"0"+now.getHours():now.getHours();
      let minute = (now.getMinutes() < 10)? "0"+now.getMinutes():now.getMinutes();
      let day = now.getDay(); //获取存储当前日期
      let weekday = ["日", "一", "二", "三", "四", "五", "六"];
      temp["time_format"] = month + "月" + date + "日 " + hour + ":" + minute + " 周" + weekday[day];
      Imginfo_data.push(temp);
    }
    this.setData({
      Imginfo_data: Imginfo_data
    });
    console.log(JSON.stringify(Imginfo_data));
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