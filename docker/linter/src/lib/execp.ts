import {exec} from "child_process";

interface ProcessResult {
    stdout: string;
    stderr: string;
    exit_code: number;
}

export async function execp(command: string): Promise<ProcessResult> {
    return new Promise((resolve) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
            }
            resolve({stdout, stderr, exit_code: err?.code ?? 0});
        });
    });
}
