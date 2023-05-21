export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-sm sm:max-w-lg mx-auto px-4 h-full">
      {children}
    </div>
  );
}
