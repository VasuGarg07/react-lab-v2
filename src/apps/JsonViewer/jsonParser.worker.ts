// jsonParser.worker.ts
self.onmessage = (event) => {
    const input = event.data;
    console.time("worker-parse-time");

    try {
        const parsed = JSON.parse(input);
        console.timeEnd("worker-parse-time");

        postMessage({ success: true, data: parsed });
    } catch (error) {
        console.timeEnd("worker-parse-time");
        postMessage({ success: false, error: 'Invalid JSON format' });
    }
};
