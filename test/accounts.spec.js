// unit testing
const base = require('../app/controller/api/v1/accounts')
const mockRequest = (body = {}, query = {}, params = {}) => 
                    ({ body, query, params })

const mockResponse = () => {
    const res = {}
    res.json = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    return res
}
// get user test, test suite untuk user get
describe("accounts.get function", () => {
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
                data: expect.any(Object)
            })
        )
    })
    //uji edge case ketika data kosong
    test("res.json called with no result", async () => {
        const req = mockRequest({}, {
            page:5
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
describe("accounts.ById function", () => {
    //uji fungsionalitas
    test("res.json called with users data", async () => {
        const req = mockRequest({}, {}, { id: 1})
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

describe("accounts.create function", () => {
    test("res.json called with status 201", async () => {
        const req = mockRequest({
            bank_name: "BCA",
            account_number: 12423,
            balance: 324231,
            userId: 3
        })
        const res = mockResponse()
        await base.create(req, res)
        expect(res.status).toBeCalledWith(201)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Data ditambahkan!',
                data: expect.any(Object)
            })
        )
    })
})

describe("accounts.update function", () => {
    test("res.json called with status 201", async () => {
        const req = mockRequest({}, {}, {
            id:1
        })
        const res = mockResponse()
        await base.update(req, res)
        expect(res.status).toBeCalledWith(201)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Data diupdate!',
                data: expect.any(Object)
            })
        )
    })
})

describe("accounts.destroy function", () => {
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