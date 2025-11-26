type TabEmptyStateProps = {
  title: string;
  message: string;
};

export default function TabEmptyState({ title, message }: TabEmptyStateProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 text-center border border-dashed border-slate-200">
      <h2 className="text-2xl font-semibold text-slate-900">
        {title || "Coming soon"}
      </h2>
      <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
        {message ||
          "This area will hold more account controls soon. Check again later."}
      </p>
    </div>
  );
}
