// components/custom-checkbox/custom-checkbox.js
Component({
  properties: {
    title: {
      type: String
    }
  },
  data: {

  },

  methods: {
    labelTap: () => {
      console.log("label被点击了一下");
    }
  }
}
)