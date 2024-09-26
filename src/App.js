import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        const json = await response.json();
        setPost(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchPost();
  }, []);

  useEffect(() => {
    if (post.userId) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
          const json = await response.json();
          setUser(json);
        } catch (error) {
          console.log("error", error);
        }
      };

      fetchUser();
    }
  }, [post.userId]);

  return (
    <div className='App'>
      {user ? (
        <div className='Info'>
          <p><strong>{user.name}</strong></p>
          <p>{user.email}</p>
          <p>{user.company?.name}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}

export default App;
