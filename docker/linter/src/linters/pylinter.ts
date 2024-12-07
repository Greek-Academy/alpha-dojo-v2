import {ILinter, Output} from "./iLinter";
import {execp} from "../lib/execp";

export class Pylinter implements ILinter {
    async runDefault(): Promise<Output> {
        const output = await execp("pylint input --rcfile .pylintrc");
        return {
            ...output,
            stdout: output.stdout.replace(/\r\n/g, '\n')
        }
    }

    async runJson(): Promise<Output> {
        return await execp("pylint input --rcfile .pylintrc --output-format=json");
    }
}
