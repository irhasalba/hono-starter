export class ResponseHandler {
    static responseOk(c, data, statusCode) {
        c.status(statusCode);
        return c.json({
            message: "Berhasil mendapatkan data !",
            code: statusCode,
            data: data
        });
    }
    static responseError(c, data, statusCode) {
        c.status(statusCode);
        return c.json({
            message: "Terjadi kesalahan di sisi server !",
            code: statusCode,
            data: data
        });
    }
}
