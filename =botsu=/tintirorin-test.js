function hand(pips) {

  var hand = [];

  if (pips[0] === pips[2]) {
    hand.push("zoro");
    return hand.join();
  }

  if (pips[0] === pips[2]) {

  }
}

var pips = [3, 3, 3];
console.log(hand(pips));

let promise = new Promise((resolve, reject) => { // #1
  console.log('#1')
  resolve('Hello ')
})

promise.then((msg) => { // #2
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('#2')
      resolve(msg + "I'm ")
    }, 500)
  })
}).then((msg) => { // #3
  console.log('#3')
  return msg + 'Jeccy.'
}).then((msg) => { // #4
  console.log('#4')
  console.log(msg)
}).catch(() => { // エラーハンドリング
  console.error('Something wrong!')
})