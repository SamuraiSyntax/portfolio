export function ErrorMessage({ error }: { error: Error }) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <p className="text-red-500">
        {error.message || "Une erreur est survenue"}
      </p>
    </div>
  );
}
