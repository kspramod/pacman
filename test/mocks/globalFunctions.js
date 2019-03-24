class SessionStorageMock {
  constructor () {
    this.store = {}
  }

  clear () {
    this.store = {}
  }

  getItem (key) {
    return this.store[key]
  }

  setItem (key, value) {
    this.store[key] = value && value.toString()
  }

  removeItem (key) {
    delete this.store[key]
  }
}

global.sessionStorage = new SessionStorageMock()

global.requestAnimationFrame = function (callback) {
  setTimeout(callback, 0)
}

global.console.debug = () => {}
