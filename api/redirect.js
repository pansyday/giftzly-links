module.exports = function (req, res) {
  try {
    const url = new URL(req.url, `https://${req.headers.host}`);

    const path = url.searchParams.get("path");
    const token = url.searchParams.get("token");

    const routes = {
      confirm: "giftzly://confirm",
      reset: "giftzly://reset-password",
      "create-list": "giftzly://create-list",
      "change-email": "giftzly://change-email",
    };

    const base = routes[path];
    if (!base) {
      return res.status(404).send("Invalid redirect path");
    }

    const finalUrl = token ? `${base}?token=${token}` : base;
    return res.redirect(302, finalUrl);

  } catch (err) {
    console.error("Redirect error:", err);
    return res.status(500).send("Server error");
  }
};
