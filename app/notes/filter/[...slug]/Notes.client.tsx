"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import css from "./Notes.module.css";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import { FetchNotesResponse } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import Link from "next/link";

type NotesProps = {
  tag?: NoteTag;
  initialData: FetchNotesResponse;
  // notes: Note[];
  // totalPages: number; - FetchNotesResponse
};

function Notes({ tag, initialData }: NotesProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedQuery] = useDebounce(query, 300);

  const shouldUseInitialData = page === 1 && debouncedQuery === "";

  const { data } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", debouncedQuery, page, tag],
    queryFn: () => fetchNotes(debouncedQuery, page, tag),
    // enabled: debouncedQuery !== "",
    placeholderData: keepPreviousData,
    ...(shouldUseInitialData && { initialData }),
  });

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onChange={handleSearch} />
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {data && data.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}
      {data?.notes.length === 0 && <p>No notes found</p>}
      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}

export default Notes;
