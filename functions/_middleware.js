export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === '/recovery' || path === '/recovery/') {
    return Response.redirect(new URL('/recovery/index.html', url).href, 302);
  }

  return next();
}
