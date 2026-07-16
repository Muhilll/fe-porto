export default function ErrorLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col items-center justify-center p-6 text-center">
      {children}
    </div>
  );
}
