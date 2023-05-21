export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-sm sm:max-w-lg mx-auto m-4 p-4 h-full">
      {children}
    </div>
  );
}
