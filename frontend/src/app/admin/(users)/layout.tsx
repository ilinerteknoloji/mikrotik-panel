type Props = {
  children: React.ReactNode;
  sheet: React.ReactNode;
};

export default function UsersLayout({ children, sheet }: Props) {
  return (
    <>
      {sheet}
      {children}
    </>
  );
}
