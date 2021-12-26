import React from 'react';

/**
 * @typedef {object} Props
 * @property {React.ReactNode} children
 * @property {any} items
 * @property {() => void} fetchMore
 */

/** @type {React.VFC<Props>} */
const InfiniteScroll = ({ children, fetchMore }) => {
  const prevReachedRef = React.useRef(false);

  React.useEffect(() => {
    const handler = () => {
      const hasReached = window.innerHeight + Math.ceil(window.scrollY) >= document.body.offsetHeight;

      // 画面最下部にスクロールしたタイミングで、登録したハンドラを呼び出す
      if (hasReached && !prevReachedRef.current) {
        fetchMore();
      }

      prevReachedRef.current = hasReached;
    };

    // 最初は実行されないので手動で呼び出す
    prevReachedRef.current = false;
    handler();

    document.addEventListener('scroll', handler, { passive: false });
    return () => {
      document.removeEventListener('scroll', handler);
    };
  }, []);

  return <>{children}</>;
};

export { InfiniteScroll };
