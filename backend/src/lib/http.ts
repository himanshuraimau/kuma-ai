export function json(body: unknown, init?: ResponseInit) {
  return Response.json(body, init);
}

export function notFound() {
  return json({ error: "Not Found" }, { status: 404 });
}