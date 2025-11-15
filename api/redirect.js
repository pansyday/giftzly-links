export default function handler(req, res) {
  const { path, ...params } = req.query;
  const search = new URLSearchParams(params).toString();

  // Les routes que tu veux gérer
  const routes = {
    confirm: "giftzly://confirm",
    reset: "giftzly://reset-password",
    "create-list": "giftzly://create-list"
  };

  const base = routes[path];
  if (!base) {
    return res.status(404).send("Invalid redirect path");
  }

  const url = search ? `${base}?${search}` : base;
  return res.redirect(302, url);
}
