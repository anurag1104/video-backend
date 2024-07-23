export {asyncHandler}

// const asyncHandler = (func) => { () => {} } func is being passed into another function

// const asyncHandler = (func) =>  async (req, res, next) => {
    
//     try {
//         await func(req, res, next)        
//     } catch (error) {
//         res.status(err.code || 500 ).json({
//             sucess : false,
//             message : err.message
//         })
//     }
// } 

//using promise method

const asyncHandler = (reqHandler) => {
    return (req, res, next) => {
        Promise.resolve(reqHandler(req, res, next)).catch( (err) => next(err) )
    }
}
