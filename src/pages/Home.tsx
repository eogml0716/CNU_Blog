import { useEffect, useState } from 'react';
import { getPostList } from '../api';
import PostListItem from '../components/PostListItem';
import { IPost } from '../api/types';
import NoPostList from '../components/NoPostList';

const Home = () => {
  const [postList, setPostList] = useState<IPost[]>([]);

  const fetchPostList = async () => {
    const {data} = await getPostList();
    setPostList(data.posts); // Assuming data is structured as { posts: IPost[] }
  };

  useEffect(() => {
    fetchPostList();
  }, []);

  if (postList.length == 0) {
    return <NoPostList />;
  }

  return (
    <div>
      {postList.map((item, index) => (
        <PostListItem key={index} id={item.id} title={item.title} contents={item.contents} tag={item.tag} />
      ))}
    </div>
  );
};

export default Home;
