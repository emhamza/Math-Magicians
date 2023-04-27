import { useState, useEffect } from 'react';

const MyKey = 'uGYFRjVL5vsECiupBQajgw==0vhILuXfS7oKmMHw';
const API = 'https://api.api-ninjas.com/v1/quotes?category=success';

function Quotes() {
  const [quotes, setQuotes] = useState(null);
  const [state, setState] = useState({ status: 'loading', error: null }); // required states

  useEffect(() => {
    let isMounted = true;

    async function fetchQuotes() {
      try {
        const response = await fetch(API, {
          method: 'GET',
          headers: {
            'X-Api-key': MyKey,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (isMounted) {
          setQuotes(data[0]);
          setState({ status: 'loaded', error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({ status: 'error', error });
        }
      }
    }

    if (state.status === 'loading') {
      fetchQuotes();
    }

    return () => {
      isMounted = false;
    };
  }, [state.status]);

  const isLoading = state.status === 'loading';

  return (
    <blockquote>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>{quotes?.quote}</p>
          <br />
          <b>{`-- ${quotes?.author}`}</b>
        </>
      )}
    </blockquote>
  );
}

export default Quotes;
