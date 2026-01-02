type Props = Readonly<{ children: React.ReactNode; sheet: React.ReactNode }>;

export default function QueuesLayout({ children, sheet }: Props) {
  return (
    <>
      {sheet}
      {children}
    </>
  );
}
