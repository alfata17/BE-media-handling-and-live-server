// unit testing
const base = require('../app/controller/api/v1/auth')
const mockRequest = (body = {}, query = {}, params = {}) => 
                    ({ body, query, params })

const mockResponse = () => {
    const res = {}
    res.json = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    return res
}
// get user test, test suite untuk user get
describe("auth.get function", () => {
    
    test("res.json called with users data", async () => {
        const req = mockRequest({
            email: "0x@gmail.com",
            password: "1234"
        })
        const res = mockResponse()
        await base.login(req, res)
        expect(res.status).toBeCalledWith(201)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: "Success",
                message: "Berhasil login!",
                data: expect.any(Object)
            })
        )
    })
    
    test("res.json called with no result", async () => {
        const req = mockRequest({
            email: "al@gmail.com",
            password: "1234"
        })
        const res = mockResponse()
        await base.login(req, res)
        expect(res.status).toBeCalledWith(404)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: "Fail",
                message: "Email tidak ditemukan!"
            })
        )
    })

    test("res.json called with users data", async () => {
        const req = mockRequest({
            email: "khun@gmail.com",
            password: "1234"
        })
        const res = mockResponse()
        await base.login(req, res)
        expect(res.status).toBeCalledWith(401)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: "Fail",
                message: "Password Salah!"
            })
        )
    })
    
})

describe("auth.whoami function", () => {
    test("res.json called with users data", async () => {
        const req = mockRequest({
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiIweEBnbWFpbC5jb20iLCJuYW1lIjoiMHgiLCJpYXQiOjE2OTkzNjg2NjIsImV4cCI6MTY5OTM3MjI2Mn0.VTBq0jA_UqmEb1wn8fVSnATbIfLU92s_8E7o_LUeccY"
        })
        const res = mockResponse()
        await base.whoami(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: "Success!",
                message: "OK",
                data: {user: req.user}
            })
        )
    })
})

describe("auth.register function", () => {
    test("res.json called with users data", async () => {
        const req = mockRequest({
            email: "rio@gmail.com",
            name: "satrio",
            password: "1234"
        })
        const res = mockResponse()
        await base.register(req, res)
        expect(res.status).toBeCalledWith(201)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: "Success",
                code: 200,
                message: "Berhasil register!",
                data: expect.any(Object)
            })
        )
    })

    test("res.json called with users data", async () => {
        const req = mockRequest({
            email: "0x@gmail.com",
            name: "0x",
            password: "1234"
        })
        const res = mockResponse()
        await base.register(req, res)
        expect(res.status).toBeCalledWith(404)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: "Fail",
                message: "Email sudah terdaftar!"
            })
        )
    })
})
