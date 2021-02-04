const _console = new WeakMap();

class Logger {
  constructor(console = window.console) {
    this.console = console;
    _console.set(this, console);
  }
  log = (...message) => {
    this.console.log(...message);
  };

  set console(console) {
    _console.set(this, console);
  }

  get console() {
    return _console.get(this);
  }
}

export default Logger;
