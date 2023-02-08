const fs = require("fs/promises");
const path = require("path");
const minimist = require("minimist");

const line = async (filePath) => {
  // const filePath = path.resolve(__dirname, file);
  console.log("line the file: ", filePath);
  const content = await fs.readFile(filePath, {
    encoding: "utf-8",
  });
  const result = String(content)
    .split("\n")
    .join("")
    .split(/\s*(?:;|$)\s*/gm)
    .join(";")
    .split(/`\s+/gm)
    .join("`");
  await fs.writeFile(filePath, result);
};

const run = async () => {
  const argv = minimist(process.argv.slice(2));
  const { files } = argv;
  await Promise.all(files.split(",").map(line));
};

run();
