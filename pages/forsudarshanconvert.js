import Papa from "papaparse";
import { useState, useRef, useEffect } from "react";

export default function ForSudarshanConvert() {
  const [data, setData] = useState(null);
  const ref = useRef(null);

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

  function processResults(results) {
    if (results && results.error && results.error.type) {
      return null;
    }

    let final = [];

    results.data.forEach((row) => {
      if (
        final &&
        final.length &&
        final.find((f) => f.name === row["Category Name"])
      ) {
        final
          .find((f) => f.name === row["Category Name"])
          .menuItems.push({
            name: row["Item Name"],
            description: row["Item Description"],
            price: row["Item Price (with the $)"],
          });
      } else {
        final.push({
          name: row["Category Name"],
          menuItems: [
            {
              name: row["Item Name"],
              description: row["Item Description"],
              price: row["Item Price (with the $)"],
            },
          ],
        });
      }
    });

    return final.filter((f) => !!f.name);
  }

  function handleSubmit(e) {
    e.preventDefault();

    Papa.parse(ref.current.files[0], {
      header: true,
      complete: function (results) {
        setData(processResults(results));
      },
    });
  }

  useEffect(() => {
    if (data) {
      downloadFile(data);
    }
  }, [data]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" id="file" accept=".csv" ref={ref} />
        <label htmlFor="file">
          Sudarshan, choose a .csv file that is in the format I told you to use
        </label>
        <button type="submit">submit</button>
      </form>
      <p>
        This will convert it to the same output.json format that the normal
        GrubHub scraper does. Then you can put the data into the Storyblok
      </p>
    </>
  );
}
