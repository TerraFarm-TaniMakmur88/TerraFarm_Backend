import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export class AuthMiddleware {
    private jwtSecret: string;

    constructor() {
        this.jwtSecret = process.env.JWT_SECRET as string;
    }

    verifyToken(): RequestHandler {
      return (req: Request, res: Response, next: NextFunction): void => {
          const authHeader = req.headers.authorization;

          if (!authHeader || !authHeader.startsWith('Bearer ')) {
              res.status(401).json({ message: 'Access token is missing or invalid' });
              return;
          }

          const token = authHeader.split(' ')[1];

          try {
              const decoded = jwt.verify(token, this.jwtSecret);
              (req as any).user = decoded;
              next();
          } catch (error) {
              res.status(401).json({ message: 'Token is invalid or expired' });
              return;
          }
      };
  }

    getLoggedInId(req: Request): string | null {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, this.jwtSecret) as any;
            return decoded.id;
        } catch (error) {
            return null;
        }
    }
}

// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Access token is missing or invalid' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    
//     (req as any).user = decoded;
    
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Token is invalid or expired' });
//   }
// };

// export const getLoggedInId = (req: Request) => {
//   const authHeader = req.headers.authorization;
//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//     return decoded.id;
//   } catch (error) {
//     return error;
//   }
// }