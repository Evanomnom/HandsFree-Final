import { useState } from "react";

export default function ForSudarshanAdmin() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  async function downloadFile(data) {
    const fileName = "output";
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("working here too");
    const result = await fetch("/api/getGrubHubData", {
      method: "POST",
      body: JSON.stringify({ url }),
    });

    const json = await result.json();
    console.log(json);

    if (json.result) {
      setError("");
      await downloadFile(json.result);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          id="url"
        />
        <label htmlFor="url">Enter grubhub url here Suds.</label>
      </form>
      <p>
        This will download a file ending in ".json" copy and paste the contents
        of this file in the content dashboard's "body" field.
      </p>
    </>
  );
}
