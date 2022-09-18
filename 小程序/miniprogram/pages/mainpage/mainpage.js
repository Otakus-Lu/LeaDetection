// pages/mainpage/mainpage.js
import {request} from '../../utils/request'
// var resData
Page({

    /**
     * 页面的初始数据
     */
    data: {
        aboutlist:[{
            title:"项目简介",
            content:"对提供的树叶图片使用目标检测的AI算法，识别标识出病残的树叶的位置。基于训练好的深度学习模型，建立web 服务。提供上传图片，同时识别图片中病残树叶的位置，并绘制出来。",
            show:false
        },{
            title:"人员名单",
            content:'赵天成：深度学习算法\n陈思源：深度学习算法\n闫韵冰：数据分析与处理\n吴泽昊：数据分析与处理\n陆琦暄：前端开发\n王凯博：后端开发\n夏益君：前端开发\n熊静飞：深度学习部署\n刘敬炜：深度学习部署\n庞长颢：机器学习算法\n',
            show:false
        }],
        // cardCur: 0,
        // swiperList: [{
        //     id: 0,
        //     type: 'image',
        //     url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
        //   }, {
        //     id: 1,
        //       type: 'image',
        //       url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
        //   }, {
        //     id: 2,
        //     type: 'image',
        //     url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
        //   }, {
        //     id: 3,
        //     type: 'image',
        //     url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
        //   }, {
        //     id: 4,
        //     type: 'image',
        //     url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
        //   }, {
        //     id: 5,
        //     type: 'image',
        //     url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
        //   }, {
        //     id: 6,
        //     type: 'image',
        //     url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
        //   }],
    },
    showModal(e) {
        this.setData({
          modalName: e.currentTarget.dataset.target
        })
      },
      hideModal(e) {
        this.setData({
          modalName: null
        })
      },
      panel: function (e) {
        this.data.aboutlist[e.currentTarget.dataset.index].show = !this.data.aboutlist[e.currentTarget.dataset.index].show
        this.setData({
            aboutlist:this.data.aboutlist
        })
      },
      cardSwiper(e) {
        this.setData({
          cardCur: e.detail.current
        })
      },
      goHistory(e){
        wx.switchTab({
          url: '../history/history',
        })
      },
      toAlgIntroduce(e){
          wx.navigateTo({
            url: '../AlgIntroduce/AlgIntroduce',
          })
      },
      TakePhoto(e) {
        wx.chooseImage({
          count: 1,
          sizeType:['original','compressed'],
          sourceType:['camera'],
          success(res){
            console.log("res:",res)
            const tempFilePaths=res.tempFilePaths
            wx.uploadFile({
                filePath: tempFilePaths[0],
                name: 'file',
                // url:' http://192.168.0.104:8080/wxupload',
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
                    // url:' http://192.168.0.104:8080/wxupload',
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