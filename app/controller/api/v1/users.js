const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

module.exports = {
    async get(req, res){
        try {
          const { search, page = 1, limit = 10 } = req.query;
          console.log(req.query);
          let result = await prisma.user.findMany({
            skip: (page - 1) * limit,
            take: limit,
          })

            if (!result.length) {
              return res.status(200).json({ 
                status: 'success', 
                code: 200, 
                message: 'Data Empty'
              });
            }
        
            return res.status(200).json({ 
              status: 'success', 
              code: 200, 
              message: 'Success!',
              data: result
            });
          } catch (error) {
            console.error(error);
            return res.status(500).json({
              status: 'error',
              code: 500,
              message: 'Internal Server Error',
            });
          }
    },

    async getById(req, res){
        if(!req.params.id) res.status(400).json({ 
            status: 'fail', 
            code: 400, 
            message: 'Bad Request! id is required',
        })
    
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id),},
                include: {profile: true,},
            });
    
        res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Success!',
            data: user
        })
    },
    async create(req, res){
        const user = await prisma.user.create({
            data: 
            req.body
        });

        res.status(201).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data ditambahkan!',
            data: user
        })
    },
    async update(req, res){
        const user = await prisma.user.update({
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
            data: user
        })
    },
    async destroy(req, res){
        if(!req.params.id) res.status(400).json({ 
            status: 'fail', 
            code: 400, 
            message: 'Bad Request! id is required',
        })
    
        const user = await prisma.user.delete({
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