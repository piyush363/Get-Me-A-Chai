import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            About Get Me A Chai ☕
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            A crowdfunding platform where supporters can help creators,
            developers, artists, and innovators by contributing towards their
            journey—one chai at a time.
          </p>
        </div>

        <div className="bg-gray-800 rounded-3xl p-8 mb-8">
          <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-300 leading-relaxed">
            Get Me A Chai is a crowdfunding platform built with Next.js as part
            of the Sigma Web Development Course. The platform allows creators to
            receive support from their audience through secure online payments
            and personalized creator pages.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800 rounded-3xl p-8">
            <h3 className="text-2xl font-semibold mb-3">🎯 Mission</h3>
            <p className="text-gray-300">
              To empower creators by making it simple for supporters to
              contribute and help bring ideas to life.
            </p>
          </div>

          <div className="bg-gray-800 rounded-3xl p-8">
            <h3 className="text-2xl font-semibold mb-3">🚀 Vision</h3>
            <p className="text-gray-300">
              Building a community where every contribution helps creativity,
              innovation, and passion grow.
            </p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-3xl p-8 mb-8">
          <h2 className="text-3xl font-semibold mb-6">✨ Features</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-xl mb-2">☕ Support Creators</h4>
              <p className="text-gray-300">
                Contribute directly to your favorite creators.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-xl mb-2">🔒 Secure Payments</h4>
              <p className="text-gray-300">
                Razorpay integration for safe transactions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-xl mb-2">👤 Creator Profiles</h4>
              <p className="text-gray-300">
                Personalized pages for every creator.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-xl mb-2">📊 Transparency</h4>
              <p className="text-gray-300">
                Track support and contributions easily.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-3xl p-8 mb-8">
          <h2 className="text-3xl font-semibold mb-4">🛠 Tech Stack</h2>

          <div className="flex flex-wrap gap-3">
            {[
              "Next.js",
              "React.js",
              "Tailwind CSS",
              "MongoDB",
              "NextAuth",
              "Razorpay",
            ].map((tech) => (
              <span
                key={tech}
                className="bg-purple-600 px-4 py-2 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-3">
            Made with ❤️ by Piyush Bharti
          </h3>
          <p className="text-gray-400">
            A project built during the Sigma Web Development Journey.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;

export const metadata = {
    title: "About - Get Me A Chai",
  }