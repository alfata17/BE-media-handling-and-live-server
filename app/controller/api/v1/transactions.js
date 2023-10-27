const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

module.exports = {
    async get(req, res){
        try {
            const transactions = await prisma.transaction.findMany();
        
            if (!transactions.length) {
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
              data: transactions
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
    
        try {
            const transaction = await prisma.transaction.findUnique({
              where: {
                id: parseInt(req.params.id),
              },
              include: {
                sourceNumber: true,   // Menambahkan informasi pengirim
                destinationNumber: true, // Menambahkan informasi penerima
              },
            });
        
            if (!transaction) {
              return res.status(200).json({
                status: 'success',
                code: 200,
                message: 'Data not found',
              });
            }
        
            return res.status(200).json({
              status: 'success',
              code: 200,
              message: 'Success!',
              data: {
                transaction,
              },
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
    async create(req, res){
        const { source_account_number, destination_account_number, amount } = req.body;

        try {
            // Kurangkan saldo dari sumber
            const sourceAccount = await prisma.bankAccount.findUnique({
                where: { account_number: source_account_number },
            });
            // Periksa apakah sumber valid
            if (!sourceAccount) {
                throw new Error('Sumber tidak valid');
            }

            // Periksa apakah saldo mencukupi
            if (sourceAccount.balance < amount) {
                throw new Error('Saldo tidak cukup');
            }
              await prisma.bankAccount.update({
                where: {account_number: source_account_number,},
                data: {balance: {decrement: amount,},},
              });
        
            // Tambahkan saldo ke tujuan
            const destinationAccount = await prisma.bankAccount.findUnique({
                where: {account_number: destination_account_number,},
            });

            if (!destinationAccount) {
                throw new Error('Tujuan tidak ditemukan');
            }
              await prisma.bankAccount.update({
                where: {account_number: destination_account_number,},
                data: {balance: {increment: amount,}},
              });
        
              // Buat input transaksi
              const transaction = await prisma.transaction.create({
                data: req.body,
              });
        
            res.status(201).json({
              status: 'success',
              code: 200,
              message: 'Data ditambahkan!',
              data: transaction,
            });
          } catch (error) {
            console.error(error);
            return res.status(400).json({
              status: 'fail',
              code: 400,
              message: error.message,
            });
          }
    },
    async update(req, res){
        const transaction = await prisma.transaction.update({
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
            data: transaction
        })
    },
    async destroy(req, res){
        if(!req.params.id) res.status(400).json({ 
            status: 'fail', 
            code: 400, 
            message: 'Bad Request! id is required',
        })
    
        const transaction = await prisma.transaction.delete({
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