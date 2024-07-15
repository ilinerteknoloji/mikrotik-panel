type Props = {
  children: React.ReactNode;
  sheet: React.ReactNode;
};

export default async function UsersLayout({ children, sheet }: Props) {
  return (
    <>
      {sheet}
      {children}
    </>
  );
}
