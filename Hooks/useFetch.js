import React, { useEffect, useState, useRef } from "react";

export const useFetch = (url) => {
  const isMounted = useRef(true); //true as initial value
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    return () => {
      //This function is called when the component/effect is unmounted
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setState({ data: null, loading: true, error: null });

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if (isMounted.current) {
          //set the state if the component is mounted
          setState({
            loading: false,
            error: null,
            data,
          });
        }
      })
      .catch(() => {
        setState({
          data: null,
          loading: false,
          error: "It was not possible to get the data",
        });
      });
  }, [url]);
  return state;
};
