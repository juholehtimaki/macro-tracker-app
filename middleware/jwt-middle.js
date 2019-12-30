const jwt = require("jsonwebtoken");

module.exports = {
  ensureAuthentication: ensureAuthentication,
  ensureRole: ensureRole
};

function ensureAuthentication(req, res, next) {
  if (!req.cookies || !req.cookies.token) {
    return res.status(401).json({
      ok: false,
      error: {
        reason: "Authentication required",
        code: 401
      }
    });
  }
  try {
    const result = jwt.verify(req.cookies.token, "ASDASD123");
    req.token = result;
    console.log(result);
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      ok: false,
      error: {
        reason: "Authentication required",
        code: 401
      }
    });
  }
  return next();
}

const roles = Object.freeze({
  user: 1,
  admin: 2
});

function ensureRole(role) {
  role = role.toLowerCase();
  return (
    ensureRole[role] ||
    (ensureRole[role] = function(req, res, next) {
      ensureAuthentication(req, res, function() {
        if (!req.token || roles[req.token.role] < roles[role]) {
          return res.status(403).json({
            ok: false,
            error: {
              reason: "Access denied",
              code: 403
            }
          });
        }
        return next();
      });
    })
  );
}
