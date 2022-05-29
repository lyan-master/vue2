class Vue {
  constructor(options) {
    //  1. 通过 $options 保存传递的选项
    this.$options = options || {}
    this.$data = options.data || {}
    this.$el =
      typeof options.el === 'string'
        ? document.querySelector(options.el)
        : options.el

    //  2. 将 data 内的数据进行劫持，并将内部所有属性注入到 vue 实例中
    this._proxyData(this.$data)

    //  3. 调用 observer 对象，监听数据的变化
    new Observer(this.$data)
    //  4. 调用 compiler 对象，解析指令和表达式
  }

  _proxyData(data) {
    //  遍历 data 中所有属性，并将属性注入到 vue 实例中
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key]
        },
        set(value) {
          data[key] = value

          //  如果新值是一个对象，则需要对该对象进行数据劫持管理
          new Observer(value)
        }
      })
    })
  }
}
