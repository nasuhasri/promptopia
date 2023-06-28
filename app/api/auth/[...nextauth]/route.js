// set up providers - google application

import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

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
  // function
  async session({ session }) {

  },
  async signIn({ profile }) {
    // every next js route is serverless route
    // serverless -> lambda -> dynamodb : open up when its get called
    try {
      
    } catch (error) {
      
    }
  }
})

export { handler as GET, handler as POST }