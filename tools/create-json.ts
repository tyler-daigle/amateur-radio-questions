import fs from "fs";

interface Question {
  id: string;
  text: string;
  choices: string[];
  answer: number;
  subElement: string;
  group: string;
}


// parseText() 
// parse the text string into individual questions.
/*

The question file must follow the correct format: 

~~
T0C10 (A)
Why is duty cycle one of the factors used to determine safe RF radiation exposure levels?
A. It affects the average exposure to radiation
B. It affects the peak exposure to radiation
C. It takes into account the antenna feed line loss
D. It takes into account the thermal effects of the final amplifier
~~

- Each question must be seperated by ~~
- A ~~ seperator is not needed (or allowed) before the first question and after the last
- The question and the choices must each be on a single line with no breaks.

*/
function parseText(questionText: string): Question[] {
  const questions = questionText.split("\n~~\n");
  
  console.log(`Found ${questions.length} questions.`);  
  questions[410].split("\n").forEach(line => {
    console.log(line.trim());
  });
  return [];
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