type Props = Readonly<{
  children: React.ReactNode;
  sheet: React.ReactNode;
}>;

export default function Layout({ children, sheet }: Props) {
  return (
    <>
      {sheet}
      {children}
    </>
  );
}
