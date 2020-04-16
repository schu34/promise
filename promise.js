class myPromise {
  constructor(func) {
    const resolve = (value) => {
      const next = this.chain.shift()
      if(next.resolveHandler){
        next.resolveHandler(value);
      }

    };
    const reject = (value) => {
      const next = this.chain.shift()
      if(next.rejectHandler){
        next.rejectHandler(value);
      }
    };

    func(resolve, reject);
  }

  thenCbs = {}

  //TODO: needs to return a promise that resolves when resolveHandler returns or the promise it returns resolves
  then(resolveHandler, rejectHandler) {
    this.chain.push({type:"then", resolveHandler, rejectHandler})
  }

  catch(rejectHandler) {
    this.chain.push({type:"catch", rejectHandler})
  }

  finally() {}
}

module.exports = myPromise;
