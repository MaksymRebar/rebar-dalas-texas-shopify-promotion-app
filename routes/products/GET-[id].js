import { RouteContext } from "gadget-server";

/**
 * Route handler for GET products/[id]
 *
 * @param { RouteContext } route context - see: https://docs.gadget.dev/guides/http-routes/route-configuration#route-context
 *
 */
export default async function route({ request, reply, api, logger, connections }) {
  const productId = request.params.id;
  const oneProduct = await api.shopifyProduct.findOne(productId, {
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
  return reply.type("application/json").send(oneProduct);

}
