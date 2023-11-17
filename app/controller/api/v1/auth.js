const { PrismaClient } = require('@prisma/client')
const { encryptPassword, checkPassword} = require('../../../../utils/auth')
const { JWTsign} = require('../../../../utils/jwt')

const prisma = new PrismaClient();

module.exports = {
    async login(req, res){
        const {email, password} = req.body;

        const user = await prisma.user.findFirst({
            where: {email}
        })

        if(!user){
            return res.status(404).json({
                status: "Fail",
                message: "Email tidak ditemukan!"
            })
        }

        const isPasswordCorrect = await checkPassword(
            password, user.password
        )

        if(!isPasswordCorrect){
            return res.status(401).json({
                status: "Fail",
                message: "Password Salah!"
            })
        }

        delete user.password
        const token = await JWTsign(user)

        return res.status(201).json({
            status: "Success",
            message: "Berhasil login!",
            data: { user,  token}
        })
    },
    async whoami(req,res){
        return res.status(200).json({
            status: "Success!",
            message: "OK",
            data: {
                user: req.user
            }
        })
    },
    async register(req, res){
        //coba buat fungsi register dengan mengganti password
        //dari req.body dengan password yg sudah terenkripsi
        const {email, password, name} = req.body;
        const user = await prisma.user.findFirst({
            where: {email}
        })

        if(user){
            return res.status(404).json({
                status: "Fail",
                message: "Email sudah terdaftar!"
            })
        }

        const createUser = await prisma.user.create({
            data: {
                email,
                name,
                password: await encryptPassword(password)
            }
        });

        return res.status(201).json({
            status: "Success",
            code: 200,
            message: "Berhasil register!",
            data: createUser
        })
    },

    registerForm: async (req, res) => {
        const {email, password, name} = req.body;
        const user = await prisma.user.findFirst({
            where: {email}
        })

        if(user){
            req.flash("error", "email sudah terdaftar")
            return res.redirect('/api/register')
        }

        const createUser = await prisma.user.create({
            data: {
                email,
                name,
                password: await encryptPassword(password)
            }
        });

        req.flash("success", "Berhasil Register!")
        return res.redirect('/api/login')
    },
    authUser: async (email, password, done) => {
        try{
            const user = await prisma.user.findUnique({
                where: {email}
            })

            if(!user || !await checkPassword(password, user.password)){
                return done(null, false, {message:'invalid email or password'})
            }

            return done(null, user)
        } catch (err) {
            return done(null, false, {message: err.message})
        }
    },
    dashboard: async (req, res) => {
        res.render('dashboard', { user: req.user});
    }
}