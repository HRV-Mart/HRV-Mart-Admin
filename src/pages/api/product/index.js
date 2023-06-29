import {getQueryFromURL, getRequest} from "@/service/network/network";

export default async function handler(req, res) {
    const authentication = req.headers.authentication;
    switch (req.method) {
        case "GET":
            const query = getQueryFromURL(req.url, 'api/product');
            const response = await getRequest(
                `${process.env.BACKEND_URL}/product${query}`,
                {"X-Auth": authentication},
                true
            );
            res.status(response.status).json(response.data);
            break;
        case "POST":
            const post_response = await postRequest(
                `${process.env.BACKEND_URL}/product/${req.query.productId}`,
                {
                    "X-Auth": authentication
                },
                false
            );
            res.status(post_response.status).json(post_response.data);
            break;
        case "PUT":
            const put_response = await putRequest(
                `${process.env.BACKEND_URL}/product/${req.query.productId}`,
                {
                    "X-Auth": authentication
                },
                false
            );
            res.status(put_response.status).json(put_response.data);
            break;
        default:
            break;
    }
}