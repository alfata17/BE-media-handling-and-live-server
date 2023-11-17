// unit testing
const base = require('../app/controller/api/v1/transactions')
const mockRequest = (body = {}, query = {}, params = {}) => 
                    ({ body, query, params })

const mockResponse = () => {
    const res = {}
    res.json = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    return res
}
// get user test, test suite untuk user get
describe("transactions.get function", () => {
    //uji fungsionalitas
    test("res.json called with users data", async () => {
        const req = mockRequest()
        const res = mockResponse()
        await base.get(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Success!',
                data: expect.any(Array)
            })
        )
    })
    //uji edge case ketika data kosong
    test("res.json called with no result", async () => {
        const req = mockRequest({}, {
            page:3
        })
        const res = mockResponse()
        await base.get(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Data Empty',
            })
        )
    })
    
})

// get byid
describe("transactions.ById function", () => {
    //uji fungsionalitas
    test("res.json called with users data", async () => {
        const req = mockRequest({}, {}, {id: 3})
        const res = mockResponse()
        await base.getById(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Success!',
                data: expect.any(Object)
            })
        )
    })
    
})

describe("transactions.create function", () => {
    test("res.json called with status 201", async () => {
        const req = mockRequest({
            source_account_number: 12342,
            destination_account_number: 2342,
            amount: 345555,
            type: "withdraw"
        })
        const res = mockResponse()
        await base.create(req, res)
        expect(res.status).toBeCalledWith(201)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Data ditambahkan!',
                data: expect.any(Array)
            })
        )
    })
})

describe("transactions.destroy function", () => {
    test("res.json called with status 201", async () => {
        const req = mockRequest({},{},{id:2})
        const res = mockResponse()
        await base.destroy(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Success Data terhapus!'
            })
        )
    })
})