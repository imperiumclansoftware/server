const errorsMiddleWare = (req,res) => {
    const errorCode = req.statusCode ?? 400;
    const message = req.message ?? 'Erreur inconue'

    return res.status(errorCode).json({
        message
    })
}

module.exports = errorsMiddleWare;