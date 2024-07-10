import express from 'express';
import { scheduleTask, stopTask } from './utils/scheduler';

const app = express();
app.use(express.json());

app.post('/schedule', (req, res) => {
    const { taskName, cronTime } = req.body;

    if (!taskName || !cronTime) {
        return res.status(400).send('Task name and cron time are required');
    }

    scheduleTask(taskName, cronTime);
    res.send(`Task ${taskName} scheduled with cron time ${cronTime}`);
});

app.post('/stop', (req, res) => {
    const { taskName } = req.body;

    if (!taskName) {
        return res.status(400).send('Task name is required');
    }

    stopTask(taskName);
    res.send(`Task ${taskName} stopped`);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
