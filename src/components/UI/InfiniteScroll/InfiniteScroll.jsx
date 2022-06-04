import React, { useEffect, useRef } from 'react';

export default function InfiniteScroll({ fetchMore, skeletonComponent }) {
  const containerRef = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.0001
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        fetchMore()
      }
    }, options);

    observer.observe(containerRef.current)

    return (() => {
      observer.disconnect();
    })
  }, [])


  return (
    <div ref={containerRef}>
      {skeletonComponent}
    </div>
  )
}