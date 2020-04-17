const myPromise = require("./promise.js");

describe("myPromise", () => {
  jest.useFakeTimers();
  test("constructs without errors", () => {
    expect(() => new myPromise(jest.fn()));
  });

  test("it calls a then callback", () => {
    const cb = jest.fn();
    const p = new Promise((resolve, reject) => {
      setTimeout(() => resolve("works")), 0;
    });
    p.then(cb);
    jest.runOnlyPendingTimers();
    expect(cb).toHaveBeenCalledWith("works");
  });

  test("it calls a then callback on rejection", ()=>{
    const cb = jest.fn();
    const p = new Promise((resolve, reject) => {
      setTimeout(() => reject("works")), 0;
    });
    p.then(()=>{},cb);
    jest.runOnlyPendingTimers();
    expect(cb).toHaveBeenCalledWith("works");
  })
  
  test("it calls a catch callback on rejection", ()=>{
    const cb = jest.fn();
    const p = new Promise((resolve, reject) => {
      setTimeout(() => reject("works")), 0;
    });
    p.catch(cb);
    jest.runOnlyPendingTimers();
    expect(cb).toHaveBeenCalledWith("works");
  })

  test("it can chain thens when then callback is async", ()=>{
    const cb1 = jest.fn();
    const cb2 = jest.fn();
    const p = new Promise((resolve, reject)=>{
      setTimeout(() => resolve("works"), 0);
    });
    p.then(cb1);
    jest.runOnlyPendingTimers();

    expect(cb1).toHaveBeenCalled()
    expect(cb1).toHaveBeenCalled()
  })
});
