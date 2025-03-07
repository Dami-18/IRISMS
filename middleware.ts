// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';

// export default function requireAuth(req: Request, res: Response, next: NextFunction) {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//     try {
//       jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key'); // yet to handle the env variables
//       next();
//     } catch (err) {
//       res.status(401).json({ message: 'Unauthorized' });
//     }
//   }

// export { auth as middleware } from "@/auth";
