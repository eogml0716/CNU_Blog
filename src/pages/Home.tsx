import { useEffect, useState } from 'react';
import { getPostList } from '../api';
import PostListItem from '../components/PostListItem';
import { IResponsePostList, TAG } from '../api/types';
import NoPostList from '../components/NoPostList';

const Home = () => {
  const [postList, setPostList] = useState<IResponsePostList[]>([]);

  const fetchPostList = async () => {
    const {data} = await getPostList();
    setPostList(data);
  };

  useEffect(() => {
    fetchPostList();
  }, []);

  if (postList.length == 0) {
    return <NoPostList />;
  }

  return (
    <div>
      {postList.length === 0 ? (
        <NoPostList />
      ) : (
        postList.map((item, index) => (
          <PostListItem key={index} id={item.post.id} title={item.post.title} contents={item.post.contents} tag={item.post.tag} />
        ))
      )}
    </div>
  );
};

export default Home;
