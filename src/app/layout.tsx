// src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // html/body در لایه‌ی [locale] رندر می‌شود
  return <>{children}</>;
}
