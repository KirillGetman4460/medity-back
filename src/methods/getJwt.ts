const jwt = require('jsonwebtoken');

const getJwt = (token: string) => {
  try {
    return jwt.verify(token, "gfgd@43435sdfggppgdsf");
  } catch (err) {
    return null;
  }
};

export default getJwt;