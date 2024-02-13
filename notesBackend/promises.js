const cart = ['shoes', 'pants', 'shirts']

const promise = createOrder(cart)
console.log(promise)

promise
  .then(orderId =>
    new Promise ((resolve, reject) => {
      const error = new Error(orderId)
      reject(error)
    })
  )
  .then(status => console.log(status))
  .catch(error => console.log(error))

console.log('start')

//returns a promise
function createOrder (cart) {
  const pr = new Promise((resolve, reject) => {
    if(validateCart(cart)) {
      const orderId = '123'
      setTimeout(function () {
        resolve(orderId) }
      , 5000)
    }
    else {
      const error = new Error('Invalid Cart!')
      reject(error)
    }
  })

  return pr
}

function validateCart (cart) {
  if (cart) {
    return true
  }
}