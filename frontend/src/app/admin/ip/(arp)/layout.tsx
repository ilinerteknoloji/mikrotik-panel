type Props = Readonly<{ children: React.ReactNode; sheet: React.ReactNode }>;

export default function ArpLayout({ children, sheet }: Props) {
  return (
    <>
      {sheet}
      {children}
    </>
  );
}
