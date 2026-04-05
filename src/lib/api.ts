const BASE_URL = 'https://pokeapi.co/api/v2';

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

export async function fetcher<T>(
  endpoint: string,
  { params, ...customConfig }: FetchOptions = {}
): Promise<T> {
  const url = new URL(
    endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`
  );

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const response = await fetch(url.toString(), {
    headers: { 'Content-Type': 'application/json', ...customConfig.headers },
    ...customConfig,
  });

  if (!response.ok) {
    let errorMessage = 'Failed to fetch data';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      errorMessage = response.statusText || errorMessage;
    }

    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}
