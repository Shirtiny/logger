const _option = new WeakMap();

const DefaultOption = {
  console: window.console,
  enable: true,
  level: 4,
};

class Console {
  constructor(option = {}) {
    _option.set(this, { ...DefaultOption, ...option });
  }

  log = (...message) => {
    const { enable, console } = _option.get(this);

    return enable && console.log(...message);
  };

  set option(option) {
    option.set(this, option);
  }

  get option() {
    return _option.get(this);
  }
}

export default Console;
