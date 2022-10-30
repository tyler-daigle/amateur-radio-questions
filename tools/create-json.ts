import fs from "fs";

interface Question {
  id: string;
  text: string;
  choices: string[];
  answer: number;
  subElement: string;
  group: string;
}

function parseText(questionText: string) {
  const questions = questionText.split("~~");
  console.log(questions.length);
  // console.log(questions[0]);
  questions[1].split("\r\n").forEach(line => {
    console.log("line: ", line.length, line.trim());
  })
}

function readText(fileName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) {
        reject(err.message);
      }
      resolve(data);
    });
  });
}

async function main() {
  if (process.argv.length !== 4) {
    console.log("Usage: node create-json.js <question-text-file> <question-output-json>");
    return;
  }
  const fileData = await readText(process.argv[2]);

  parseText(fileData);
}
main();


// find the file
// split it on ~~