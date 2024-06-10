import { useParams } from 'react-router-dom';
import AlbumPreview from './AlbumPreview';
import AlbumChatBox from './AlbumChatBox';

const AlbumChat = () => {
  const { albumId } = useParams();

  return (
    <AlbumPreview albumId={albumId} wide>
      <AlbumChatBox albumId={albumId} />
    </AlbumPreview>
  );
};

export default AlbumChat;
