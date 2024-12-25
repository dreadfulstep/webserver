import { IncomingMessage, ServerResponse } from 'http';

export default function jsonAddon(req: IncomingMessage, res: ServerResponse, next: Function): void {
    const start = process.hrtime.bigint();

    const originalWrite = res.write.bind(res);

    res.json = (body: any) => {
        const end = process.hrtime.bigint();
        const elapsedNs = end - start;

        let formattedTime: string;
        if (elapsedNs < 1_000n) {
            formattedTime = `${elapsedNs}ns`;
        } else if (elapsedNs < 1_000_000n) {
            formattedTime = `${Number(elapsedNs / 1_000n).toFixed(3)}µs`;
        } else if (elapsedNs < 1_000_000_000n) {
            formattedTime = `${Number(elapsedNs / 1_000_000n).toFixed(3)}ms`;
        } else {
            formattedTime = `${Number(elapsedNs / 1_000_000_000n).toFixed(3)}s`;
        }

        const success = res.statusCode >= 200 && res.statusCode < 300;

        let formattedResponse;
        if (typeof body === 'string') {
            formattedResponse = {
                success,
                data: body,
                passingTime: formattedTime,
            };
        } else if (typeof body === 'object' && body !== null) {
            const { error, code, ...rest } = body;
            formattedResponse = {
                success,
                ...(code && { code }),
                ...(error && { error }),
                data: rest,
                passingTime: formattedTime,
            };
        } else {
            formattedResponse = {
                success,
                data: body,
                passingTime: formattedTime,
            };
        }

        if (!res.headersSent) {
            try {
                res.setHeader('Content-Type', 'application/json');
                originalWrite(JSON.stringify(formattedResponse));
                res.end();
            } catch (error) {
                console.error('Error sending response:', error);
                if (!res.headersSent) {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({
                        success: false,
                        error: 'INTERNAL_SERVER_ERROR',
                        data: {},
                        passingTime: formattedTime,
                    }));
                }
            }
        }
    };

    next();
}
