export const isIos = /iphone|ipad|ipod|macintosh/i.test(
  navigator.userAgent.toLowerCase()
);

export const isApp = () => {
  return window.isRNView || false;
};
