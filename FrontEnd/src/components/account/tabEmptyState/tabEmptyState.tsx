type TabEmptyStateProps = {
  title: string;
  message: string;
};

export default function TabEmptyState({ title, message }: TabEmptyStateProps) {
  return (
    <div className="bg-card rounded-3xl p-6 sm:p-10 text-center border border-dashed border-card-border">
      <h2 className="text-2xl font-semibold text-foreground">
        {title || "Coming soon"}
      </h2>
      <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
        {message ||
          "This area will hold more account controls soon. Check again later."}
      </p>
    </div>
  );
}
