"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxyQueue = void 0;
class ProxyQueue {
    constructor() {
        this.queue = [];
    }
    enqueue(item) {
        this.queue.push(item);
    }
    dequeue() {
        return this.queue.shift();
    }
    size() {
        return this.queue.length;
    }
}
exports.proxyQueue = new ProxyQueue();
