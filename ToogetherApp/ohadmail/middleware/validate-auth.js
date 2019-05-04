const jwt = require('jsonwebtoken');

module.exports = async (req,res) => {

    try {
        const token = req.headers.authorization.split(" ")[1]
        await jwt.verify(token, "OHAD_SAHAR_SERIAL_KEY_NEVER_GONNA_GUESS_IT");
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}