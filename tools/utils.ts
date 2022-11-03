import fs from "fs";

export function readText(fileName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) {
        reject(err.message);
      }
      resolve(data);
    });
  });
}