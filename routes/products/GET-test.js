import { RouteContext } from "gadget-server";

/**
 * Route handler for GET products/test
 *
 * @param { RouteContext } route context - see: https://docs.gadget.dev/guides/http-routes/route-configuration#route-context
 *
 */
export default async function route({ request, reply, api, logger, connections }) {
  const accessToken = "shpua_3f97b6898ea84eea507a31d2d0272916";
  const response = await fetch(`https://test-store-for-promotion.myshopify.com/admin/api/2023-10/products.json`, {
    method: "POST",
    body: JSON.stringify({
      product: {
        title: "This is the second sample",
        body_html: "<h1>Hello, This is test product for image upload.</h1>",
        vendor: "Promotion App",
        product_type: "TEST_TYPE",
        status: "active",
        images: [
          {
            src: "https://cdn.shopify.com/s/files/1/0673/6717/4392/files/WorldClocks_Wallpaper_Features.jpg?v=1703008156"
          }
        ],
        variants: [
          {
            price: 10,
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
