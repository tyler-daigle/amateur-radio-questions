// create-groups-json.ts
// This script converts the text for the groups data into JSON
//
// The format of the text file must be:
// GROUPID|Description text
//
// | is used as the delimeter.

import {readText} from "./utils";

interface Group {
  groupId: string;
  description: string;
}

function createGroup(line: string): Group {
  // use | as a delimeter because some group descriptions use the - character
  const data = line.split("|");
  if(data.length !== 2) {
    throw new Error(`Error on line: ${line}`);
  }
  const groupId = data[0];
  const description = data[1];

  return {
    groupId,
    description
  };
}

function parseText(lines: string): Group[] {
  const data = lines.split("\n");
  const groups: Group[] = [];

  data.forEach(line => groups.push(createGroup(line)));
  return groups;
}

async function main() {
  if (process.argv.length !== 3) {
    console.log("Usage: node create-groups-json.js <group-text-file>");
    return;
  }
  const fileData = await readText(process.argv[2]);

  const groups = parseText(fileData);  
  console.log(JSON.stringify(groups));
  
}
main();