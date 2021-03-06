/**
Some credit for this helper goes to http://github.com/YuzuJS/setImmediate
*/

let nextHandle = 0;

const tasksByHandle: { [handle: string]: () => void } = {};

function runIfPresent(handle: number) {
  const cb = tasksByHandle[handle];
  if (cb) {
    cb();
  }
}

export const Immediate = {
  setImmediate(cb: () => void): number {
    const handle = nextHandle++;
    tasksByHandle[handle] = cb;
    Promise.resolve().then(() => runIfPresent(handle));
    return handle;
  },

  clearImmediate(handle: number): void {
    delete tasksByHandle[handle];
  },
};
