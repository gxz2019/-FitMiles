const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchData = async (endpoint: string, options = {}) => {
  const response = await fetch(`${apiUrl}/${endpoint}`, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
