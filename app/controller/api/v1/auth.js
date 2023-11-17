const { PrismaClient } = require('@prisma/client')
const { encryptPassword, checkPassword} = require('../../../../utils/auth')

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

        return res.status(201).json({
            status: "Success",
            message: "Berhasil login!",
            data: user
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
            return res.redirect('/register')
        }

        const createUser = await prisma.user.create({
            data: {
                email,
                name,
                password: await encryptPassword(password)
            }
        });

        req.flash("success", "Berhasil Register!")
        return res.redirect('/login')
    }
}