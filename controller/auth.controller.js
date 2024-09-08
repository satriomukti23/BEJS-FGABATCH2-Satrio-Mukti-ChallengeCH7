const jwt = require('jsonwebtoken')
const prisma = require('../config/prisma')
const USER = require('../model/user.model')
const bcrypt = require('bcrypt')

const signToken = (id) => {
    return jwt.sign({
        id : id 
    }, process.env.JWT_SECRET, {expiresIn : '1h'})
}

const createSendToken = (user , statusCode , res) => {

    const token = signToken(user.id)
    
    const cookieOption = {
        expire : new Date (Date.now() + {cookieExpiresIn : '1h'}),
        httpOnly : true
    }

    res.cookie('jwt', token, cookieOption)

    user.password = undefined

    res.status(statusCode).json({
        message: 'Success',
        data: user
    })
}

const create = async (req,res) => {

    if(!req.body.name|| !req.body.email || !req.body.password || !req.body.roleId){
        return res.status(400).json({
            message: 'Please fill all the fields'
        })
    }

    try {
        const user = await USER.createUser({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            roleId : req.body.roleId
        })

        createSendToken(user, 201, res)

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: 'Validasi Error'
        })
    }
}

const auth = async (req,res) => {

    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            message: 'Please fill all the fields'
        })
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        })

        if(!user){
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password.toString(), user.password)

        if(!isPasswordMatch){
            return res.status(400).json({
                message: 'Invalid Password'
            })
        }

        createSendToken(user, 200, res)

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: 'Validasi Error'
        })
    }
}

const logout = (req, res) => {
    try {
      res.cookie('jwt', '', { maxAge: 0, httpOnly: true });
  
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error logging out' });
    }
  };

const getCurrentUser = async (req,res) => {

    try{

    const currentUser = await prisma.user.findUnique({
        where:{
            id: req.user.id
        }
    })

    if(currentUser){
        return res.status(200).json({
            id : currentUser.id,
            name : currentUser.name,
            email : currentUser.email,
            roleId : currentUser.roleId,
        })
    }
    }catch(error){
        console.log(error)
        return res.status(400).json({
            message: 'Validasi Error'
        })
    }
};

const forgot = async (req,res) => {

    try {
        const result = await USER.forgotPassword(req.body.email)

        if(result.status === 'Not Found'){
            return res.status(404).json({
                message: 'User not found'
            })
        }

        return res.status(200).json({
            status: 'Success',
            message: 'Reset password link sent to your email'
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const reset = async (req,res) => {

    try {
        const token = req.params.token

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id = decoded.id

        await USER.resetPassword(id, req.body.password)

        return res.status(200).json({
            status: 'Success',
            message: 'Password reset successfully'
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    create,
    auth,
    logout,
    getCurrentUser,
    forgot,
    reset
}