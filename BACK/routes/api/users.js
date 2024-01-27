const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const User = require('../../models/user.model');

//POST /api/users/register
router.post('/register', (req, res, next) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 12)
        User.create(req.body)
            .then(user => res.json(user));
    } catch (error) {
        res.json({ error: error.message })
    }
});

router.post('/login', (req, res) => {
    // Comprobar si el correo existe
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                // No indicar si el correo existe o no para mejorar la seguridad
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }
            const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }
            // Login correcto, generar token y responder con éxito
            res.status(200).json({ success: "Login correcto", token: createToken(user) });
        })
        .catch(err => {
            console.error("Error durante el inicio de sesión:", err);
            res.status(500).json({ error: "Error del servidor" });
        });
});

function createToken(user) {

    const payload = {
        user_id: user._id,
        user_role: user.role,
    }
    return jwt.sign(payload, "Cabalgamos Sancho");
}


module.exports = router;

//POST /api/users/login
/* router.post('/login', (req, res) => {
    //comprobar si el mail existe
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.json({ message: 'Invalid password/email' });
            }
            const eq = bcrypt.compareSync(req.body.password, user.password);
            if (!eq) {
                return res.json({ error: 'Invalid password/email' });
            }
            res.json({ 
                succes: "login Correcto", 
                token: createToken(user) 
            });
        });

}) */