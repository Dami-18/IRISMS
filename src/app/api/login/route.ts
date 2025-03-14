import { serialize } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const secretKey = process.env.JWT_SECRET || 'secret_key'

export default function POST(req: NextApiRequest, res: NextApiResponse) {
  const { userId, username } = req.body 

  const jwtClaims = {
    userId,
    username,
  } // store userId and username as jwtclaims with token

  const token = jwt.sign(jwtClaims, secretKey, {
    expiresIn: '3d', 
  })

  const cookie = serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 3, 
    path: '/',
    sameSite: 'strict',
  })

  res.setHeader('Set-Cookie', cookie)
  res.status(200).json({ message: 'Successfully logged in!' })
}
