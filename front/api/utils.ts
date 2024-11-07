const SERVER = "http://91.210.169.254:8080";

export const post = async (tail: string, data: object) => {
  const response = await fetch(SERVER + tail, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to post data. Status: ${response.status}`);
  }
  return response;
};

export const get = async (tail: string) => {
  const res = await fetch(SERVER + tail, {
    mode: "cors",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data. Status: ${res.status}`);
  }

  return res.json();
};
