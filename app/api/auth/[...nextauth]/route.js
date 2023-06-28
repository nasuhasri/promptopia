// set up providers - google application

import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from "@utils/database";
import User from "@models/user";

// console.log({
//   clientId: process.env.GOOGLE_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// });

const handler = NextAuth({
  // options object
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    // function - to keep data about the user every single time
    // reason: to keep an existing and running session
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email
      })
  
      session.user.id = sessionUser._id.toString();
  
      return session; // know which user currently online
    },
    async signIn({ profile }) {
      // every next js route is serverless route
      // serverless -> lambda function -> dynamodb : open up when its get called
      try {
        await connectToDB();
  
        // check if a user already exists
        const userExists = await User.findOne({
          email: profile.email // check by email
        })
  
        // if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture
          })
        }
  
        // successfully sign in, return true
        return true;
      } catch (error) {
        console.log(error);
        return false
      }
    }
  }
})

export { handler as GET, handler as POST }