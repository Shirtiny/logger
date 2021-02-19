const _option = new WeakMap();

const DefaultConsoleOption = {
  console: window.console,
  enable: true,
};

class Console {
  constructor(option = {}) {
    _option.set(this, { ...DefaultConsoleOption, ...option });
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
