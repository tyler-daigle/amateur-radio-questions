// create-questions-json
// This script will read in the questions from the text file (they must follow the format below)
// and convert it to JSON. The JSON data will be printed to the console so you can just redirect
// it into a file.

import {readText} from "./utils";

interface Question {
  id: string;
  text: string;
  choices: string[];
  answer: number;
  subelement: string;
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
  const questionList: Question[] = [];  
  
  questions.forEach(question => {
    const q = createQuestion(question);
    if(q) {
      questionList.push(q);
    } else {
      throw new Error(`Failed to add question ${question.substring(0,5)}`);
    }
  });
  return questionList;
}

// questionText is the whole question and it needs to be split up by newlines
// and then inserted into the object.
function createQuestion(questionBlob: string): Question | undefined {
  const numRequiredLines = 6; // every question should have 6 lines, otherwise there is an error in the file
  const lines = questionBlob.split("\n");
  if(lines.length !== numRequiredLines) {
    return undefined;
  }

  // the question id is the first 5 characters on line 0
  const questionId = lines[0].substring(0,5);

  // the subelement is the first 2 characters (such as T1)
  // the group is the first 3 characters (such as T1A)
  const subelement = lines[0].substring(0,2);
  const group = lines[0].substring(0,3);

  // the correct answer is located between the () on the first line
  const answerLocation = lines[0].indexOf("(") + 1; //space after the first (

  // the correct answer should be a number - the correct index in the choices array
  // so convert the letter to a number
  let correctAnswer: number;

  switch(lines[0].substring(answerLocation, answerLocation + 1)) {
    case "A":
      correctAnswer = 0;
      break;
    case "B":
      correctAnswer = 1;
      break;
    case "C":
      correctAnswer = 2;
      break;
    case "D":
      correctAnswer = 3;
      break;
    default:
      return undefined; // something is wrong if we get here
  }  

  // line 1 contains the question text
  const questionText = lines[1];

  // the final 4 lines are the choices - they will be added to an array without the line identifiers A,B,C,D 
  // so we ignore the first 3 characters
  const choices = [];
  for(let i = 2; i < lines.length; i++) {
    choices.push(lines[i].substring(3));
  }

  const questionObj: Question = {
    id: questionId,
    text: questionText,
    choices: choices,
    answer: correctAnswer,
    subelement,
    group
  };
  
  return questionObj;
}


async function main() {
  if (process.argv.length !== 3) {
    console.log("Usage: node create-json.js <question-text-file>");
    return;
  }
  const fileData = await readText(process.argv[2]);

  const questions = parseText(fileData);
  
  // dump the json
  console.log(JSON.stringify(questions));
}
main();


// find the file
// split it on ~~