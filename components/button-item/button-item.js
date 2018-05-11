Component({
  properties: {
    title: {
      type: String
    },
    src: {
      type: String
    }
  },
  data: {

  },

  methods: {
    labelTap: function(){
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('onClick', myEventDetail, myEventOption)
    }
  }
}
)