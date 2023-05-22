export default function RoomCreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-sm sm:max-w-lg mx-auto py-10 px-4 h-full">
      {children}
    </div>
  );
}
