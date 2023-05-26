import Queue from 'bull';

import * as jobs from './index';

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, {
        redis: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
        } as any
    }),
  name: job.key,
  handle: job.handle,
  options: job.options,
}));

export default {
  queues,
  add(name: string, data: any) {
    const queue = this.queues.find(queue => queue.name === name);

    if (!queue) {
        throw new Error('Queue dont find.');
    }

    return queue.bull.add(data, queue.options);
  },
  process() {
    const queues = this.queues.forEach(queue => {
      queue.bull.process(queue.handle);

      queue.bull.on('failed', (job, err) => {
        console.log(err);
      });
    });

    return queues;
  }
};
