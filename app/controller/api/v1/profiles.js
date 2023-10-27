const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

module.exports = {
    async get(req, res){
        const profile = await prisma.profile.findMany()
        if(!profile.length) {
            return res.status(200).json({ 
                status: 'success', 
                code: 200, 
                message: 'Data Empty'
            })
        }
        
        return res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Success!',
            data: profile
        })
    },

    async getById(req, res){
        if(!req.params.id) res.status(400).json({ 
            status: 'fail', 
            code: 400, 
            message: 'Bad Request! id is required',
        })
    
        const profile = await prisma.profile.findUnique({
            where: {
                id: parseInt(req.params.id), // Ubah sesuai kebutuhan, tergantung pada field id di tabel Anda
              },
            });
    
        res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Success!',
            data: profile
        })
    },
    async create(req, res){
        const profile = await prisma.profile.create({
            data: 
            req.body
        });

        res.status(201).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data ditambahkan!',
            data: profile
        })
    },
    async update(req, res){
        const profile = await prisma.profile.update({
            where: {
              id: parseInt(req.params.id), // Sesuaikan dengan nama kolom ID yang digunakan di model Prisma
            },
            data: {
              ...req.body
            },
          });

        res.status(201).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data diupdate!',
            data: profile
        })
    },
    async destroy(req, res){
        if(!req.params.id) res.status(400).json({ 
            status: 'fail', 
            code: 400, 
            message: 'Bad Request! id is required',
        })
    
        const profile = await prisma.profile.delete({
            where: {
                id: parseInt(req.params.id), // Ubah sesuai kebutuhan, tergantung pada field id di tabel Anda
              },
        })
    
        res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Success Data terhapus!',
        })
    },
}