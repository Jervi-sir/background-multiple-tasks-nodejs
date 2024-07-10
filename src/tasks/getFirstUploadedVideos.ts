import { query } from '../database/db';
import { sleep } from '../utils/sleep';
import { AbortController } from 'node-abort-controller'; // Ensure you have node-abort-controller installed

export const getFirstUploadedVideos = async (abortSignal: AbortSignal) => {
    const taskName = 'getFirstUploadedVideos';
    // Simulate API Call
    const videos = [{ title: taskName + ' 1' }, { title: taskName + ' 2' }];
    
    await query('INSERT INTO test_jobs (task_name, status, last_run) VALUES ($1, $2, NOW())', [taskName, 'completed']);

    console.log('Trendy Videos Fetched and Stored:', videos);

    for (let i = 0; i < 100; i++) {
        if (abortSignal.aborted) {
            console.log('Task aborted:', taskName);
            return;
        }
        await query('INSERT INTO task_jobs (task_name) VALUES ($1)', [taskName + ' ' + i]);
        await sleep(1000); // Sleep for 1 second
    }
};