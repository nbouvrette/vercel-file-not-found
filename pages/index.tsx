import { useEffect, useState } from "react";

export default function Home() {
  const [apiResponse, setApiResponse] = useState("");

  useEffect(() => {
    fetch("/api/hello", {
      method: "GET",
    })
      .then((response) => {
        if (response?.status === 200 && response?.body) {
          return response.text();
        } else {
          return "The API returned an error";
        }
      })
      .then((result) => {
        setApiResponse(result);
      })
      .catch((error) => {
        setApiResponse("Unexpected while calling the API");
      });
  }, []);

  return <>Response from /api/hello: {apiResponse}</>;
}
