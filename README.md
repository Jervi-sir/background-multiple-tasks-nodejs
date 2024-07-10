this repo is an alternative to Laravel, 
issue with Laravel is its structure not meant for task scheduling for long tasks and configuring them on the fly, and running them at same time
even Horizon claims to solve this, but it quickly became annoying to manage. on top of that i needed a dashboard to control the tasks

so overall this repo nodejs is a demonstration to what m looking for 
an endpoint to directly start a schedule 
`curl -X POST http://localhost:3000/schedule -H "Content-Type: application/json" -d '{"taskName":"getTrendyVideos","cronTime":"*/30 * * * *"}'`

and an endpoint to directly kill the task

`curl -X POST http://localhost:3000/stop -H "Content-Type: application/json" -d '{"taskName":"getTrendyVideos"}'`

the tasks are running in parallel so there is no issue in the delay


### tables

```
CREATE TABLE test_jobs (
    id SERIAL PRIMARY KEY,
    task_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    last_run TIMESTAMP
);
```
```
CREATE TABLE task_jobs (
    id SERIAL PRIMARY KEY,
    task_name VARCHAR(255) NOT NULL,
    last_run TIMESTAMP
);
```

