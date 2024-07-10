import { CronJob } from 'cron';
import { getTrendyVideos } from '../tasks/getTrendyVideos';
import { updateVideos } from '../tasks/updateVideos';
import { searchVideos } from '../tasks/searchVideos';
import { getFirstUploadedVideos } from '../tasks/getFirstUploadedVideos';
import { collectKeywords } from '../tasks/collectKeywords';

type TaskFunction = (abortSignal: AbortSignal) => Promise<void>;

const tasks: { [key: string]: TaskFunction } = {
    getTrendyVideos,
    updateVideos,
    searchVideos,
    getFirstUploadedVideos,
    collectKeywords,
};

const jobSchedules: { [key: string]: { job: CronJob, abortController: AbortController } } = {};

export const scheduleTask = async (taskName: string, cronTime: string) => {
    if (jobSchedules[taskName]) {
        jobSchedules[taskName].job.stop();
    }

    const abortController = new AbortController();
    
    // Run the task immediately
    await tasks[taskName](abortController.signal);

    // Schedule the task to run according to the cron schedule
    jobSchedules[taskName] = {
        job: new CronJob(cronTime, () => tasks[taskName](abortController.signal)),
        abortController,
    };
    jobSchedules[taskName].job.start();
};

export const stopTask = (taskName: string) => {
    if (jobSchedules[taskName]) {
        jobSchedules[taskName].abortController.abort();
        jobSchedules[taskName].job.stop();
    }
};
