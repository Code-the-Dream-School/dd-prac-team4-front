import AlbumPreview from './AlbumPreview';
import AlbumChatBox from './AlbumChatBox';
import { useParams } from 'react-router-dom';

const AlbumChat = () => {
  const { albumId } = useParams();
  <AlbumPreview albumId={albumId} wide>
    <AlbumChatBox albumId={albumId} />
  </AlbumPreview>
};

export default AlbumChat;
