import { ProxyScoreRequest } from '../models/ProxyScoreRequest';
import { Response } from 'express';

interface QueueItem {
  request: ProxyScoreRequest;
  res: Response;
}

class ProxyQueue {
  private queue: QueueItem[] = [];

  enqueue(item: QueueItem) {
    this.queue.push(item);
  }

  dequeue(): QueueItem | undefined {
    return this.queue.shift();
  }

  size(): number {
    return this.queue.length;
  }
}

export const proxyQueue = new ProxyQueue();
