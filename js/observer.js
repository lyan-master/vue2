class Observer {
  constructor(data) {
    this.walk(data)
  }

  walk(data) {
    //  1. 判断 data 是否为对象
    if (!data || typeof data !== 'object') return

    //  2. 遍历 data 中所有属性
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }

  defineReactive(object, key, value) {
    //  如果 value 是对象，则将它转变成响应式数据
    this.walk(value)

    Object.defineProperty(object, key, {
      enumerable: true,
      configurable: true,
      get() {
        return value
      },
      set(newValue) {
        if (newValue === value) return

        value = newValue
      }
    })
  }
}
