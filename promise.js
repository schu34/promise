class myPromise {
  constructor(func) {
    this.thenCbs = {}
    const resolve = (value) => {
      if(typeof this.thenCbs.resolve === "function"){
        this.thenCbs.resolve(value);
      }

    };
    const reject = (value) => {
      if(typeof this.thenCbs.reject === "function"){
        return this.thenCbs.reject(value);
      }
      if(typeof this.catchCb === "function"){
        return this.catchCb(value);
      }
    };

    func(resolve, reject);
  }


  //TODO: needs to return a promise that resolves when resolveHandler returns or the promise it returns resolves
  then(resolveHandler, rejectHandler) {
    this.thenCbs = {resolve:resolveHandler, reject:rejectHandler}
  }

  catch(rejectHandler) {
    this.catchCb = rejectHandler;
  }

  finally() {}
}

module.exports = myPromise;
