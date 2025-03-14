// this api will fetch user details and then we will call on frontend to display user details on dashboard
import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../../../../auth"; // probably we can move auth.ts in lib folder
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req:NextApiRequest, res:NextApiResponse) {
    const userData = await verifyToken(req)

    if (!userData) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const user = await prisma.user.findUnique({
        where: {
          id: userData.userId,
        },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.status(200).json({
        message: 'User details fetched successfully',
        data: user, // send whole user object
      })

    // using above userData we fetch all the details of user from database and then send it as json 
    // then further with this api call, all such details can be displayed on dahsboard or whatever
}