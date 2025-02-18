import { TelepartyClient, SocketEventHandler } from "teleparty-websocket-lib";

let isConnected = false;
let connectionHandler: ((status: boolean) => void) | null = null;
let messageHandler: ((message: any) => void) | null = null;

const eventHandler: SocketEventHandler = {
  onConnectionReady: () => {
    isConnected = true;
    connectionHandler?.(true);
  },
  onClose: () => {
    isConnected = false;
    connectionHandler?.(false);
    alert("WebSocket disconnected! Refresh.");
  },
  onMessage: (message) => {
    messageHandler?.(message);
  }
};

export const socket = new TelepartyClient(eventHandler);

export const setMessageHandler = (handler: (message: any) => void) => {
  messageHandler = handler;
};

export const setConnectionHandler = (handler: (status: boolean) => void) => {
  connectionHandler = handler;
};

export const getConnectionStatus = () => isConnected;
