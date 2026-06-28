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
      <section className="container mx-auto py-20 px-6 text-white text-center">
        <h2 className="text-4xl font-bold mb-12">
          Learn More About Us
        </h2>

        <div className="max-w-4xl mx-auto overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
          <iframe
            className="w-full aspect-video"
            src="https://www.youtube.com/embed/ojuUnfqnUI0?si=wMUv4DG3ia6Wt4zn"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </>
  );
}
