import axios from 'axios';

export interface SearchResult {
    UserID: string;
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
}

export async function search(query: string): Promise<SearchResult[]> {
  const response = await axios.get<SearchResult[]>(`${process.env.REACT_APP_SEARCH_BASE_URL}`, { params: { query } });
  return response.data;
}
