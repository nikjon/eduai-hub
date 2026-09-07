export default function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6 bg-slate-950 text-white">
      <h1 className="text-6xl font-extrabold">
        Learn Smarter with{" "}
        <span className="text-cyan-400">EduAI Hub</span>
      </h1>

      <p className="mt-6 text-xl text-gray-400 max-w-2xl">
        AI Tutor • Notes • Quiz • Study Planner • Previous Year Papers
      </p>

      <button className="mt-10 bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl text-lg font-semibold">
        Get Started
      </button>
    </section>
  );
}