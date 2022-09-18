// pages/AlgIntroduce/AlgIntroduce.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        TabCur: 0,
        MainCur: 0,
        VerticalNavTop: 0,
        list: [{
            name:'综述',
            id:0,
            content:"YOLOv5(You Only Look Once)是由 UitralyticsLLC公司发布的一种单阶段目标检测算法，YOLOv5 相比YOLOv4 而言，在检测平均精度降低不多的基础上，具有均值权重文件更小，训练时间和推理速度更短的特点。YOLOv5 的网络结构分为输入端、Backbone、Neck、Head 四个部分。"
        },{
            name:'输入端',
            id:1,
            content:"输入端主要包括 Mosaic 数据增强、图片尺寸处理以及自适应锚框计算三部分。Mosaic数据增强将四张图片进行组合，达到丰富图片背景的效果；图片尺寸处理对不同长宽的原始图像自适应的添加最少的黑边，统一缩放为标准尺寸；自适应锚框计算在初始锚框的基础上，将输出预测框与真实框进行比对，计算差距后再反向更新，不断迭代参数来获取最合适的锚框值。" 
        },{
            name:'BackboneNeck',
            id:2,
            content:"Backbone 主要包含了 BottleneckCSP和 Focus 模块。BottleneckCSP 模块在增强整个卷积神经网络学习性能的同时大幅减少了计算量；Focus 模块对图片进行切片操作，将输入通道扩充为原来的 4 倍，并经过一次卷积得到下采样特征图，在实现下采样的同时减少了计算量并提升了速度" 
        },{
            name:'Neck',
            id:3,
            content:"Neck 中采用了 FPN 与 PAN 结合的结构，将常规的 FPN 层与自底向上的特征金字塔进行结合，将所提取的语义特征与位置特征进行融合，同时将主干层与检测层进行特征融合，使模型获取更加丰富的特征信息。" 
        },{
            name:'Head',
            id:4,
            content:"Head 输出一个向量，该向量具有目标对象的类别概率、对象得分和该对象边界框的位置。检测网络由三层检测层组成，不同尺寸的特征图用于检测不同尺寸的目标对象。每个检测层输出相应的向量，最后生成原图像中目标的预测边界框和类别并进行标记。" 
        }],
        load: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.showLoading({
            title: '加载中...',
            mask: true
          });
          var list=this.data.list
          this.setData({
            listCur: list[0]
          })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        wx.hideLoading()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    tabSelect(e) {
        this.setData({
          TabCur: e.currentTarget.dataset.id,
          MainCur: e.currentTarget.dataset.id,
          VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
        })
      },
      VerticalMain(e) {
        let that = this;
        let list = this.data.list;
        let tabHeight = 0;
        if (this.data.load) {
          for (let i = 0; i < list.length; i++) {
            let view = wx.createSelectorQuery().select("#main-" + list[i].id);
            view.fields({
              size: true
            }, data => {
              list[i].top = tabHeight;
              tabHeight = tabHeight + data.height;
              list[i].bottom = tabHeight;     
            }).exec();
          }
          that.setData({
            load: false,
            list: list
          })
        }
        let scrollTop = e.detail.scrollTop + 20;
        for (let i = 0; i < list.length; i++) {
          if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
            that.setData({
              VerticalNavTop: (list[i].id - 1) * 50,
              TabCur: list[i].id
            })
            return false
          }
        }
      }
})