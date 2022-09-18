// pages/imgpage/imgpage.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        originImg:'../../images/树叶.png',
        resultImg:'../../images/树叶2.jpg',
        timeconsume:0.01
    },
    save(e){
        let id = parseInt(Date.now() / 1000)
        wx.setStorageSync('ImgInfo-' + id, JSON.stringify({
            originImg: this.data.originImg,
            resultImg:this.data.resultImg,
            date:Date.now()
          }))
    },
    ChoosePhoto(e){
        wx.chooseImage({
          count: 1,
          sizeType:['original'],
          sourceType:['album'],
          success(res){
            console.log("res:",res)
            const tempFilePaths=res.tempFilePaths
      wx.uploadFile({
        filePath: tempFilePaths[0],
        name: 'file',
        url: 'http://localhost:8080/wxupload',
        success(res){
          console.log(res)
          console.log(res.data)
          // resData=JSON.parse(res.data)
          // console.log("转换后:",resData)
          // res.data=JSON.stringify(resData)
          wx.navigateTo({
            url: '/pages/imgpage/imgpage?id=' + encodeURIComponent(res.data),
          })
        }
      })
          }
        })
      },
    download(e){
        const that = this;
        var base64=that.data.resultImg.slice(22)
        console.log("base64:",base64)
        var number = Math.random();
        var filepath = wx.env.USER_DATA_PATH+'/pic' + number + '.png';
        //获取文件管理器对象
        var aa = wx.getFileSystemManager();
        aa.writeFile({
            filePath: filepath,
            data: base64,
            encoding:'base64',
            success: res => {
                wx.showLoading({
                    title: '正在保存...',
                    mask: true
                });
                //保存图片到相册
                wx.saveImageToPhotosAlbum({
                    filePath: filepath,
                    success: function (res) {
                        wx.hideLoading();
                        wx.showToast({
                            title: '保存成功！',
                            icon: 'success',
                            duration: 2000//持续的时间
                        })
                    },
                    fail: function (err) {
                        wx.hideLoading();
                        if(errerrMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response"){
                            wx.showModal({
                                title: '提示',
                                content: '需要您授权保存相册',
                                showCancel: false,
                                success: modalSuccess => {
                                  wx.openSetting({
                                    success(settingdata) {
                                      console.log("settingdata", settingdata)
                                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                        wx.showModal({
                                          title: '提示',
                                          content: '获取权限成功,再次点击下载按钮进行保存',
                                          showCancel: false,
                                        })
                                      } else {
                                        wx.showModal({
                                          title: '提示',
                                          content: '获取权限失败，将无法保存到相册哦~',
                                          showCancel: false,
                                        })
                                      }
                                    },
                                    fail(failData) {
                                      console.log("failData", failData)
                                    },
                                    complete(finishData) {
                                      console.log("finishData", finishData)
                                    }
                                  })
                                }
                            })
                        }
                    }
                })
            }, fail: err => {
                console.log(err)
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        let jsonStr=options.id
        var OPT=JSON.parse(decodeURIComponent(jsonStr))
        options=OPT
        console.log("转换后：",options)
        this.setData({
            originImg:options.originimg,
            resultImg:options.resultimg,
            timeconsume:Math.floor(options.time*1000)/1000
        })
        let id = parseInt(Date.now() / 1000)
        wx.setStorageSync('ImgInfo-' + id, JSON.stringify({
             originImg: this.data.originImg,
             resultImg:this.data.resultImg,
             timeconsume:this.data.timeconsume,
             date:Date.now()
           }))
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