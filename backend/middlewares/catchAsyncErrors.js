//catching async errors without try - catch
//take in async function as a parameter
module.exports = (func) => (req,res,next) =>
            Promise.resolve(func(req,res,next))
                   .catch(next)

                //    const add = x => y => x + y
                //    const add = function (x) {
                //     return function (y) {
                //       return x + y
                //     }
                //   }