const { PrismaClient } = require('@prisma/client')
const { encryptPassword} = require('../../../../utils/auth')
const prisma = new PrismaClient();

module.exports = {
    
    async resetP(req, res){
        const {email, password} = req.body;
        const user = await prisma.user.findFirst({
            where: {email}
        })

        if(!user){
            return res.status(404).json({
                status: "Fail",
                message: "Email salah!"
            })
        }
        const createUser = await prisma.user.update({
            where: {
                email
              },
            data: {
                email,
                password: await encryptPassword(password)
            }
        });

        res.status(201).json({ 
            status: 'success', 
            code: 200, 
            message: 'Password Berhasil di Reset!',
            data: createUser
        })
    },
}