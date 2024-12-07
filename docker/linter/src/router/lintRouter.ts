import * as express from 'express';
import {runLint} from "../runLint";
import {Output} from "../linters/iLinter";

export const lintRouter = express.Router({mergeParams: true});

lintRouter.post('/', async (req, res) => {
    const reqBody = req.body;

    if (!isRequestBody(reqBody)) return res.status(400).json({error: 'Invalid request body'});

    try {
        const out: Output = await runLint(reqBody.source_code, reqBody.language_id, reqBody.format ?? 'default');
        console.log(`Response: ${JSON.stringify(out)}`);
        return res.status(200).json(out);
    } catch (e) {
        return res.status(400).json({error: e});
    }
});

interface RequestBody {
    source_code: string;
    language_id: string;
    format?: string;
}

export function isRequestBody(body: unknown): body is RequestBody {
    const b = body as Partial<RequestBody>;
    return 'source_code' in b && typeof b.source_code === 'string'
        && 'language_id' in b && typeof b.language_id === 'string'
        && (!('format' in b) || typeof b.format === 'string')
}
