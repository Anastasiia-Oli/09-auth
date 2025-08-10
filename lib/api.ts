import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const nextServer = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  query: string,
  page: number,
  tag?: Exclude<NoteTag, "All">
): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = {
    page: page,
    perPage: 12,
  };

  if (tag && tag !== undefined) {
    params.tag = tag;
  }

  if (query && query.trim() !== "") {
    params.search = query;
  }

  console.log("Request params:", params);

  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params,
  });
  return response.data;
}

export async function createNote(
  params: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> {
  const response = await nextServer.post<Note>("/notes", params, {
    // headers: {
    //   Authorization: `Bearer ${API_KEY}`,
    // },
  });
  return response.data;
}

export async function deleteNote(id: number): Promise<Note> {
  const response = await nextServer.delete<Note>(`/notes/${id}`, {
    // headers: {
    //   Authorization: `Bearer ${API_KEY}`,
    // },
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    // headers: {
    //   Authorization: `Bearer ${API_KEY}`,
    // },
  });
  return response.data;
}
