/*
 * @Author: Shirtiny
 * @Date: 2021-06-19 17:05:31
 * @LastEditTime: 2021-06-19 17:06:26
 * @Description:
 */

export function useCatch<T extends (...args: any[]) => any>(
  callback: T,
  deps: DependencyList,
  options: CatchOptions = DEFAULT_ERRPR_CATCH_OPTIONS,
): T {
  const opt = useMemo(() => getOptions(options), [options]);

  const fn = useMemo(
    (..._args: any[]) => {
      const proxy = observerHandler(
        callback,
        undefined,
        function (error: Error) {
          commonErrorHandler(error, opt);
        },
      );
      return proxy;
    },
    [callback, deps, opt],
  ) as T;

  return fn;
}

const TestView: React.FC<Props> = function (props) {
  const [count, setCount] = useState(0);

  const doSomething = useCatch(
    async function () {
      console.log("doSomething: begin");
      throw new CatchError("doSomething error");
      console.log("doSomething: end");
    },
    [],
    {
      toast: true,
    },
  );

  const onClick = useCatch(
    async (ev) => {
      console.log(ev.target);
      setCount(count + 1);

      doSomething();

      const d = delay(3000, () => {
        setCount((count) => count + 1);
        console.log();
      });
      console.log("delay begin:", Date.now());

      await d.run();

      console.log("delay end:", Date.now());
      console.log("TestView", this);
      throw new CatchError("自定义的异常，你知道不");
    },
    [count],
    {
      message: "I am so sorry",
      toast: true,
    },
  );

  return (
    <div>
      <div>
        <button onClick={onClick}>点我</button>
      </div>
      <div>{count}</div>
    </div>
  );
};

export default React.memo(TestView);
