const errorMiddleware = (err, req, res, next) => {
    try{
        let error ={...err};

        error.message = err.message;

        console.error(err);
// Mongodb cast error
        if(err.name === 'CastError'){
            const message = `Resource not found. Invalid`;
            error.statusCode = 404;
        }
// Mongodb duplicate key error
        if(err.code === 11000){
            const message = `Duplicate field value entered`;
            error.statusCode = 400;
        }
// Mongoose validation error
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map((val) => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Internal Server Error'
    });

    } catch(error){
        next(error);
    }


};

export default errorMiddleware;