/// <reference types="react-scripts" />
declare const webkit: Webkit;

interface Window {
  webkit: Webkit;
  isRNView: boolean;
  ReactNativeWebView: {
    postMessage(msg: string): void;
  };
}

interface Webkit {
  messageHandlers: {
    ReactNativeWebView: {
      postMessage(message: string): void;
    };
    ReactNativeHistoryShim: {
      postMessage(message: string): void;
    };
  };
}
