import type { Metadata } from "next";

type Props = Readonly<{
  params: {
    id: string;
  };
}>;

export const metadata: Metadata = {
  // TODO: Add metadata [id]Page
};

export default async function QueueItemPage({ params: { id } }: Props) {
  return <>QueueItem {id} Page</>;
}
