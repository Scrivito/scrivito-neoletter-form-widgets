const fs = require("fs");
const { exec, execSync } = require("child_process");
const path = require("path");

// Define paths
const buildFolderPath = "/Users/amier/workspace/scrivito-form-widgets/build";
const projectPath = "/Users/amier/workspace/scrivito_example_app_js";

// Command to manage the `npm start` process
let npmStartProcess = null;

// Function to kill process on port 8080
function killPort(port) {
  try {
    const pid = execSync(`lsof -ti:${port}`);
    if (pid) {
      console.log(`Killing process on port ${port}...`);
      execSync(`kill -9 ${pid}`);
      console.log(`Process on port ${port} killed.`);
    }
  } catch (error) {
    console.log(`No process running on port ${port}.`);
  }
}

// Function to run the `npm start` command
function startProject() {
  console.log("Starting npm start...");

  // Kill any existing process on port 8080 before starting a new one
  killPort(8080);

  npmStartProcess = exec("npm start", { cwd: projectPath });

  // Log output from the `npm start` process
  npmStartProcess.stdout.on("data", (data) => {
    console.log(`npm start output: ${data}`);
  });

  npmStartProcess.stderr.on("data", (data) => {
    console.error(`npm start error: ${data}`);
  });

  npmStartProcess.on("close", (code) => {
    console.log(`npm start process exited with code ${code}`);
    npmStartProcess = null; // Ensure it's cleared after exit
  });
}

// Function to stop the `npm start` process
function stopProject() {
  if (npmStartProcess) {
    console.log("Stopping npm start...");
    npmStartProcess.kill();
  }
}

// Watch for changes in the build folder
console.log(`Watching for changes in ${buildFolderPath}...`);

fs.watch(buildFolderPath, { recursive: true }, (eventType, filename) => {
  if (filename) {
    console.log(`Change detected in ${filename}. Restarting npm start...`);
    stopProject(); // Stop the current npm start process
    startProject(); // Restart npm start
  }
});
