import NextAuth from 'next-auth'
//import AppleProvider from 'next-auth/providers/apple'
//import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
//import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import mongoose, { startSession } from 'mongoose'
import User from '@/app/models/User'
import Payment from '@/app/models/Payment'
import connectDb from '@/app/db/connectDb'

export const authoptions = NextAuth({//
 // adapter: MongoDBAdapter(clientPromise),
  providers: [
    GitHubProvider({
     clientId: process.env.GITHUB_ID,
     clientSecret: process.env.GITHUB_SECRET
    }),
   // AppleProvider({
   //   clientId: process.env.APPLE_ID,
   //   clientSecret: process.env.APPLE_SECRET
   // }),
   // FacebookProvider({
    //  clientId: process.env.FACEBOOK_ID,
   // //  clientSecret: process.env.FACEBOOK_SECRET
   // }),
   GoogleProvider({
     clientId: process.env.GOOGLE_ID,
     clientSecret: process.env.GOOGLE_SECRET
    //}),
    //EmailProvider({
    //  server: process.env.MAIL_SERVER,
    //  from: 'NextAuth.js <no-reply@example.com>'
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const allowedProviders = ["github", "google", "facebook", "apple", "email"]
      
      if (allowedProviders.includes(account.provider)) {
        await connectDb()
        
        // 1. Check if user already exists in the database
        const currentUser = await User.findOne({ email: user.email })
        
        if (!currentUser) {
          // 2. Create a clean default username from their email prefix
          const baseUsername = user.email.split("@")
          
          const newUser = new User({
            email: user.email,
            username: baseUsername,
            name: user.name || baseUsername, // Fallback for email login which doesn't provide a name
            image: user.image || ""
          })
          
          await newUser.save()
        }
        
        return true
      }
      return false
    },

    async session({ session, token }) {
      await connectDb() // Ensure the database is connected
      
      if (session?.user?.email) {
        const dbUser = await User.findOne({ email: session.user.email })
        
        if (dbUser) {
          // Map the database username directly to session.user.username
          session.user.username = dbUser.username
        }
      }
      
      return session
    }
  }
})

export { authoptions as GET, authoptions as POST }

