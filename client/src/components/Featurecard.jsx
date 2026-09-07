export default function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
      <div className="text-5xl mb-4">{icon}</div>

      <h2 className="text-2xl font-bold mb-3">
        {title}
      </h2>

      <p className="text-gray-400">
        {description}
      </p>
    </div>
  );
}