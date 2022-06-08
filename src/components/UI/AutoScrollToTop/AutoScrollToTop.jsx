import React, { useEffect } from "react";
import { useLocation } from "react-router";

const AutoScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }, 200)

  }, [location]);

  return <>{props.children}</>
};

export default AutoScrollToTop;