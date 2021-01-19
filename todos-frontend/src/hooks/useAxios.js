import axios from 'axios';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';

// Idea adapted from https://www.bitnative.com/2020/07/06/four-ways-to-fetch-data-in-react/
function useAxios(props, { successCb, errorCb, afterCb } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevProps = useRef();

  useEffect(() => {
    if (_.isEqual(props, prevProps.current)) {
      return;
    }
    prevProps.current = props;
    if (_.isEmpty(props)) {
      return;
    }

    axios({
      baseURL: 'http://localhost:7000/api/',
      ...props,
    })
      .then((response) => {
        setData(response.data);
        if (successCb) {
          successCb(response);
        }
      })
      .catch((error) => {
        setError(error);
        if (errorCb) {
          errorCb(error);
        }
      })
      .finally(() => {
        setLoading(false);
        if (afterCb) {
          afterCb();
        }
      });
  }, [props]);

  return { data, loading, error };
}

export default useAxios;
