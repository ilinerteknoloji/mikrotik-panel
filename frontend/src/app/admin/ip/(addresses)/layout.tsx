type Props = Readonly<{ children: React.ReactNode; sheet: React.ReactNode }>;

export default function IpAddressesLayout({ children, sheet }: Props) {
  return (
    <>
      {sheet}
      {children}
    </>
  );
}
