const { execSync } = require('child_process');
const path = require('path');

try {
    // Get all changed and untracked files
    const statusOutput = execSync('git status -s -uall').toString();
    const lines = statusOutput.split('\n').filter(line => line.trim() !== '');

    const filesToCommit = [];

    for (const line of lines) {
        // line format: " M path/to/file" or "?? path/to/file"
        const filePath = line.substring(3).trim();
        if (filePath) {
            filesToCommit.push(filePath);
        }
    }

    if (filesToCommit.length === 0) {
        console.log("No files to commit.");
        process.exit(0);
    }

    console.log(`Found ${filesToCommit.length} files to commit.`);

    for (const file of filesToCommit) {
        const ext = path.extname(file);
        const basename = path.basename(file, ext);
        let type = 'chore';
        let message = `add ${path.basename(file)}`;

        if (ext === '.jsx' || ext === '.tsx') {
            type = 'feat';
            message = `add ${basename} component UI`;
        } else if (ext === '.css' || ext === '.scss') {
            type = 'style';
            message = `update styles for ${basename}`;
        } else if (ext === '.js' || ext === '.ts') {
            if (file.includes('utils') || file.includes('services')) {
                type = 'feat';
                message = `add ${basename} utility/service`;
            } else if (file.includes('config')) {
                type = 'chore';
                message = `update ${basename} config`;
            } else {
                type = 'refactor';
                message = `update ${basename} script`;
            }
        } else if (file.includes('package.json') || file.includes('package-lock.json')) {
            type = 'chore';
            message = `update dependencies in ${basename}`;
        } else if (ext === '.md') {
            type = 'docs';
            message = `update documentation in ${basename}`;
        }

        const commitMessage = `${type}: ${message}`;

        console.log(`Committing ${file} with message: "${commitMessage}"`);
        try {
            execSync(`git add "${file}"`);
            execSync(`git commit -m "${commitMessage}"`);
            console.log(`✓ Committed ${file}`);
        } catch (err) {
            console.error(`✗ Failed to commit ${file}: ${err.message}`);
        }
    }

    console.log("All files committed successfully. Pushing to GitHub...");
    try {
        execSync('git push', { stdio: 'inherit' });
        console.log("✓ Pushed to GitHub.");
    } catch (err) {
        console.error(`✗ Failed to push to GitHub: ${err.message}`);
    }

} catch (err) {
    console.error("Error running git status:", err);
}
