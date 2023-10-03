#!/usr/bin/env node
import { cpSync, renameSync } from "fs";
import { execSync } from "child_process";

const LIBRARY_PATH = "./node_modules/starter-kit";
const TEMPLATES_PATH = `${LIBRARY_PATH}/templates`;

function run() {
  copyFiles();
  renameFiles();
  updatePkgJson();
  installPackages();
}

const ESLINT = [
  "@typescript-eslint/eslint-plugin",
  "eslint",
  "eslint-config-standard-with-typescript",
  "eslint-plugin-import",
  "eslint-plugin-n",
  "eslint-plugin-prettier",
  "eslint-plugin-promise",
];

const PRETTIER = ["prettier"];

const NODE = ["ts-node", "typescript", "dotenv"];

function installPackages() {
  console.log("Instaling packages");
  const devPackages = [ESLINT, PRETTIER, NODE].flat();
  execSync(`npm i --save-dev ${devPackages.join(" ")}`, { stdio: "inherit" });
}

function copyFiles() {
  cpSync(TEMPLATES_PATH, process.cwd(), { recursive: true });
}

function renameFiles() {
  console.log("Rename files");
  const namesToRename = ["!.gitignore"];
  namesToRename.forEach((name) => {
    renameSync(`./${name}`, `./${name.slice(1)}`);
  });
}

function updatePkgJson() {
  execSync(
    'npm pkg set "scripts.start:dev"="node -r ts-node/register -r dotenv/config  ./src/index.ts"'
  );
}

run();
