import axios from 'axios';

export interface SearchResult {
    UserID: string;
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
}

export async function search(query: string): Promise<SearchResult[]> {
  const response = await axios.get<SearchResult[]>('http://localhost:8080/api/v1/userinfo/user/a', { params: { query } });
  return response.data;
}
