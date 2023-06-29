import {getRequest, postRequest, putRequest} from "@/service/network/network";

export default async function handler(req, res) {
    const authentication = req.headers.authentication;
    switch (req.method) {
        case "GET":
            const get_response = await getRequest(
                `${process.env.BACKEND_URL}/product/${req.query.productId}`,
                {
                    "X-Auth": authentication
                },
                true
            );
            res.status(get_response.status).json(get_response.data);
            break;
        default:
            break;
    }
}