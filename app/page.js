import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col justify-center items-center text-white px-6 text-center">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Get Me a Chai
          </h1>
          <img src="/tea.gif" width={60} alt="Tea" />
        </div>

        <p className="max-w-2xl text-gray-300 text-lg md:text-xl mb-8">
          A crowdfunding platform for creators. Get support from your fans and
          followers. Turn your passion into reality, one chai at a time.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/login">
            <button className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/30">
              Start Here
            </button>
          </Link>

          <Link href="/about">
            <button className="px-6 py-3 rounded-xl border border-purple-500 hover:bg-purple-500/10 transition-all duration-300">
              Read More
            </button>
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>

      {/* Features Section */}
      <section className="container mx-auto py-20 px-6 text-white">
        <h2 className="text-4xl font-bold text-center mb-16">
          Why Choose Get Me a Chai?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center hover:scale-105 transition duration-300">
            <img
              className="mx-auto bg-slate-700 rounded-full p-3"
              src="/man.gif"
              width={90}
              alt=""
            />

            <h3 className="font-bold text-xl mt-5 mb-3">
              Support Creators
            </h3>

            <p className="text-gray-300">
              Your fans can directly support your creative journey with simple
              contributions.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center hover:scale-105 transition duration-300">
            <img
              className="mx-auto bg-slate-700 rounded-full p-3"
              src="/coin.gif"
              width={90}
              alt=""
            />

            <h3 className="font-bold text-xl mt-5 mb-3">
              Easy Payments
            </h3>

            <p className="text-gray-300">
              Fast, secure, and hassle-free payments for creators and supporters.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center hover:scale-105 transition duration-300">
            <img
              className="mx-auto bg-slate-700 rounded-full p-3"
              src="/group.gif"
              width={90}
              alt=""
            />

            <h3 className="font-bold text-xl mt-5 mb-3">
              Build Community
            </h3>

            <p className="text-gray-300">
              Connect with supporters who genuinely want to help your work grow.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>

      {/* Video Section */}
      <section className="py-20 px-6">
  <div className="max-w-6xl mx-auto">

    <h2 className="text-4xl font-bold text-center text-white mb-4">
      Why Choose <span className="text-green-400">Get Me A Chai?</span>
    </h2>

   <p className="text-center text-gray-400 max-w-2xl mx-auto mb-14">
  Get Me A Chai is a crowdfunding platform that enables fans to support their
  favorite creators through secure online payments. Whether you're a developer,
  artist, musician, writer, or content creator, your community can contribute
  and help bring your ideas to life.
</p>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:border-green-400 transition-all duration-300 hover:-translate-y-2">
        <div className="text-5xl mb-4">☕</div>
        <h3 className="text-xl font-semibold text-white mb-2">
          Support Creators
        </h3>
        <p className="text-gray-400">
          Help your favorite creators by buying them a chai with just a few
          clicks.
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2">
        <div className="text-5xl mb-4">💳</div>
        <h3 className="text-xl font-semibold text-white mb-2">
          Secure Payments
        </h3>
        <p className="text-gray-400">
          Integrated with Razorpay to ensure safe, fast, and reliable
          transactions.
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:border-purple-400 transition-all duration-300 hover:-translate-y-2">
        <div className="text-5xl mb-4">🔐</div>
        <h3 className="text-xl font-semibold text-white mb-2">
          User Authentication
        </h3>
        <p className="text-gray-400">
          Sign in securely using NextAuth and manage your creator profile with
          ease.
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
        <div className="text-5xl mb-4">⚡</div>
        <h3 className="text-xl font-semibold text-white mb-2">
          Fast & Responsive
        </h3>
        <p className="text-gray-400">
          Built with Next.js, MongoDB, and Tailwind CSS for a smooth experience
          on every device.
        </p>
      </div>

    </div>

    <div className="text-center mt-16">
      <Link href="/login">
      <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-green-500/30">
        🚀 Start Supporting
      </button>
      </Link>
    </div>

  </div>
</section>
    </>
  );
}
