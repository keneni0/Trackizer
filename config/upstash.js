// import {client as WorkflowClient } from '@upstash/workflow';

import { QSTASH_URL, QSTASH_TOKEN } from './env.js';

export const workflowClient = new WorkflowClient({
    baseURL: QSTASH_URL,
    token: QSTASH_TOKEN,
});

