export function Redirect(res, path) {
  res.writeHead(301, {
    Location: path,
  });
  res.end();
}
