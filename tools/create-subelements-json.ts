// create-subelements-json 
// This script takes the subelement data and converts it into JSON data
// the text file must follow the below format:
//
// # ID-Name-Num Exam Questions-Num Groups-Num Total Questions-Groups  
// T1-COMMISSION’S RULES-6-6-67-T1A,T1B,T1C,T1D,T1E,T1F
// T2-OPERATING PROCEDURES-3-3-36-T2A,T2B,T2C
//
// Lines starting with # will be ignored
// Each field must be seperated by a -
// There must only be 5 fields or else an error will be thrown
// The list of groups in the subelement is last and each group must be seperated by a comma
//
// The JSON data will be dumped to the console so you can redirect it into a file.

import {readText} from "./utils";

const NUM_FIELDS = 6;

interface Subelement {
  subelementId: string;
  name: string;
  numExamQuestions: number;
  numGroups: number;
  numTotalQuestions: number;
  groups: string[]
}

function createSubelement(subData: string[]) {
  if(subData.length !== NUM_FIELDS ) {
    throw new Error(`Invalid data passed to createSubelement: ${subData}`);
  }

  const subelementId = subData[0];
  const name = subData[1];
  const numExamQuestions = parseInt(subData[2]);
  const numGroups = parseInt(subData[3]);
  const numTotalQuestions = parseInt(subData[4]);
  const groups = subData[5].split(",");

  const subelement: Subelement = {
    subelementId,
    name,
    numExamQuestions,
    numGroups,
    numTotalQuestions,
    groups
  };

  return subelement;
}

function parseText(fileData: string): Subelement[] {
  // ignore any lines that start with #
  const commentChar = "#";
  const lines: string[] = fileData.split("\n");
  const subelements: Subelement[] = [];

  lines.forEach((line, lineNum) => {
    if(line.charAt(0) === commentChar) {
      return;
    }
    const data = line.split("-");
    // each line of the file should have 5 items
    if(data.length !== NUM_FIELDS) {
      throw new Error(`Error in file on line ${lineNum}`);
    }
    subelements.push(createSubelement(data));
  })
  return subelements;
}


async function main() {
  if (process.argv.length !== 3) {
    console.log("Usage: node create-subelements-json.js <question-text-file>");
    return;
  }
  const fileData = await readText(process.argv[2]);

  const subelements = parseText(fileData);  
  console.log(JSON.stringify(subelements));
  
}
main();