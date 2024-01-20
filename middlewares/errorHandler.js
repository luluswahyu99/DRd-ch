

function errorHandler(error, req, res, next) {
    switch (error.name) {
        case 'BadRequest':
            res.status(400).json({message: error.message})
            break;
        case 'NotFound':
            res.status(404).json({message: error.message})
            break;
        default:
            res.status(500).json({message: 'Internal Server Error'})
            break;
    }
}

module.exports = errorHandler