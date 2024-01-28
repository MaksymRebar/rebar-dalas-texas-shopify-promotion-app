import { RouteContext } from "gadget-server";
import axios from 'axios'
/**
* Route handler for POST products/save
*
* @param { RouteContext } route context - see: https://docs.gadget.dev/guides/http-routes/route-configuration#route-context
*
*/
export default async function route({ request, reply, api, logger, connections }) {

  const title = request.body.title;
  const body_html = request.body.body_html;
  const price = request.body.price;
  const product_type = request.body.product_type;
  const status = request.body.status;
  const images = request.body.images;
  const vendor = request.body.vendor;
  const handle = request.body.handle;
  const accessToken = "shpua_3f97b6898ea84eea507a31d2d0272916";
  const response = await fetch(`https://test-store-for-promotion.myshopify.com/admin/api/2023-10/products.json`, {
    method: "POST",
    body: JSON.stringify({
      product: {
        title: title,
        body_html: body_html,
        handle: handle ? handle : "NoiErrDev",
        vendor: vendor ? vendor : "Promotion App",
        product_type: product_type ? product_type : "NO_TYPE",
        status: status ? status : "active",
        images: images ? images : [],
        variants: [
          {
            price: price ? price : 0,
            sku: 'USD',
          },
        ]
      }
    }),
    headers: {
      "X-Shopify-Access-Token": accessToken,
      'Content-Type': "application/json"
    }
  })
  const responseData = await response.json();
  return reply.type('application/json').send(responseData);
}
