const BACKEND = "http://YOUR_SERVER_IP:8080";

Deno.serve(async (req) => {
  const url = new URL(req.url);

  const target = new URL(url.pathname + url.search, BACKEND);

  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("connection");

  const res = await fetch(target.toString(), {
    method: req.method,
    headers,
    body: req.body,
  });

  return new Response(res.body, {
    status: res.status,
    headers: res.headers,
  });
});
