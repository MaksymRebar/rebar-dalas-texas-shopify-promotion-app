import { RouteContext } from "gadget-server";
import axios from 'axios'
/**
 * Route handler for GET products/all
 *
 * @param { RouteContext } route context - see: https://docs.gadget.dev/guides/http-routes/route-configuration#route-context
 *
 */
export default async function route({ request, reply, api, logger, connections }) {

  var allProducts = await api.shopifyProduct.findMany({
    select: {
      id: true,
      title: true,
      body: true,
      compareAtPriceRange: true,
      images: {
        edges: {
          node: {
            source: true
          }
        }
      },
      shop: {
        name: true,
        domain: true
      }
    }
  });
  // var allFiles = await api.shopifyFile.findMany({
  //   filter: { type: { equals: "Video" } }
  // });
  return reply.type('application/json').send({
    products: allProducts,
  });
}
