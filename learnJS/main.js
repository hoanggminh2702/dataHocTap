function countFrom (a, b) {
  var newPromise = null
  if (a <= b) {
    newPromise = new Promise(function (resolve) {
      resolve(a)
    })
  } else {
    newPromise = new Promise(function (resolve) {
      resolve()
    })
  }
  if (a <= b) {
    newPromise.then(function (a) {
      console.log(a)
    })
    return countFrom(++a, b)
  } else {
    return newPromise
  }
}

countFrom(1, 10).then(function () {
  console.log('Done')
})
