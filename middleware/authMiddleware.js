import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import statusCodes from '../constantKeys/statusCode.js';
import textMessages from '../constantKeys/constantKeys.js';
import localStorage from 'localStorage'
dotenv.config();
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] 
  if (!token ) {
    res.status(statusCodes.NOT_FOUND).send({ message: textMessages.authTextKeys.tokenNotFound });
  }
  if(localStorage.getItem(textMessages.userTextKeys.loginToggle)==textMessages.userTextKeys.loginToggleTrue)
  {
  try {
   
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) 
      {
         if (err.message === textMessages.authTextKeys.jwtExpired) {
           res.status(statusCodes.UNAUTHORIZED).send({ message: textMessages.authTextKeys.tokenExpired });
         }
        
        if (err.message === textMessages.authTextKeys.invalidSignature) {
          res.status(statusCodes.UNAUTHORIZED).send({ message: textMessages.authTextKeys.unAuthorized });
        }
      }
     next()
    })
  
  }
  catch (e) {
    res.status(statusCodes.OK).send(textMessages.errorTextKeys.tokenVerifyError);
  }
}
else{
  res.status(statusCodes.OK).send({message:textMessages.userTextKeys.loginFirst})
}
}
export default authMiddleware;