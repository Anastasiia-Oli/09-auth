import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNoteByIdServer } from "@/lib/serverApi";
import NoteDetails from "./NoteDetails.client";
import { Metadata } from "next";

type NoteDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: NoteDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteByIdServer(id);
  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 100),
      url: `https://09-auth-lemon-nine.vercel.app/notes/${id}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Note Hub",
        },
      ],
      type: "article",
    },
  };
}

const NoteDetailsPage = async ({ params }: NoteDetailsPageProps) => {
  const queryClient = new QueryClient();
  const { id } = await params;
  const noteId = String(id);

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteByIdServer(noteId),
  });

  return <NoteDetails dehydratedState={dehydrate(queryClient)} />;
};

export default NoteDetailsPage;
