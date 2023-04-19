import axios from 'axios';

export interface SearchResult {
  query: string | string[];
  platform: string[];
  ner: string[][];
  top_similar_count: number;
  top_similar_courses: string[];
}

export interface DropdownOptions {
  query: string
}

export async function search(query: string): Promise<SearchResult> {
  const response = await axios.post<SearchResult>(`${process.env.REACT_APP_SEARCH_BASE_URL}`, { body: { query } });
  return response.data;
}

export async function getDropdown(query: string): Promise<DropdownOptions[]> {
  const response = await axios.get<DropdownOptions[]>(`${process.env.REACT_APP_DROP_DOWN_URL}`, { params: { query } });
  return response.data;
}
