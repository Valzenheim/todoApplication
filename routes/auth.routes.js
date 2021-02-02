const {Router} = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const router = Router();
const User = require('../models/User');

router.post(
    '/login',[
        check('login', 'Wrong login. Please, try again.').isLength({ min: 3 }),
        check('password', 'Wrong password. Please try again.' ).isLength({ min: 6 })
    ],
    async (req, res) => {

    try{

        const errors = validationResult(req);

        if ( !errors.isEmpty() ){
            res.status(400).json({
                message: errors.array()[0].msg
            });
        }

        let user = await User.findOne({ Login: req.body.login });

        if(!user){
            return res.status(400).json({ message: 'Wrong user login. Please try again.' });
        }

        if (req.body.password !== user.Password){
            return res.status(400).json({message:'Wrong password. Please try again.'});
        }

        const token = jwt.sign(
            { userId: user._id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        );

        res.status(200).json({token, userId: user._id, userName: user.Login, filter: user.filter});

    }catch (e) {

        res.status(500).json({ message: e.message});

    }
});

router.post(
    '/createUser', [
        check('login', 'Login must be longer, than 3 characters').isLength({ min: 3 }),
        check('password', 'password must be longer than 6 characters' ).isLength({ min: 6 })
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req);

         if ( !errors.isEmpty() ){
             res.status(400).json({
                 message: errors.array()[0].msg
             });
         }

        let oldUser = await User.findOne({Login: req.body.login});

        if(oldUser){
            return res.status(400).json({ message: `This user already exists` });
        }

        const user = new User ({
            Login: req.body.login,
            Password: req.body.password,
            filter: 'all'
        });



        const token = jwt.sign(
            { userId: user._id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        );

        await user.save();

        res.status(200).json({token, userId: user._id, userName: user.Login, filter: user.filter});

    }catch (e) {

        res.status(500).json({ message: e.message});

    }
});

module.exports = router;


