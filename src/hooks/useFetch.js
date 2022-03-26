import {useEffect, useState} from 'react';

export const useFetch = url => {
  const [state, setState] = useState({data: null, loading: true});
  useEffect(() => {
    setState(prevState => ({data: prevState.data, loading: true}));
    fetch(url)
      .then(x => x.text())
      .then(y => {
        setState({data: y, loading: false});
      });
    // dependency array, we can pass  function as dependency array
  }, [url]);
  return state;
};
