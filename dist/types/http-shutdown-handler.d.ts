/// <reference types="node" resolution-mode="require"/>
import { Server } from 'http';
export declare class HttpServerShutdownHandler {
    private tcpSockets;
    private tcpSocketId;
    private server;
    private stopping;
    constructor(server: Server);
    stop(callback: any): void;
}
