import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ToggleButton from '@mui/material/ToggleButton';
import { addLikeToItem } from '@/components/tile/tileSlice';
import { useAppDispatch } from '@/app/hooks';

type Props = {
  id: string;
  name: string;
  author: string;
  image: string;
  album: string;
  genre: string;
  year: string;
  likesNumber: number;
  liked: boolean;
  file: {
    name: string;
    URL: string;
  };
  onDeleteClick: React.MouseEventHandler<HTMLAnchorElement>;
  onEditClick: React.MouseEventHandler<HTMLAnchorElement>;
};

export default function TileItem(props: Props) {
  const {
    id,
    name,
    author,
    image,
    album,
    genre,
    year,
    file,
    likesNumber,
    liked,
    onDeleteClick: handleDeleteClick,
    onEditClick: handleEditClick,
  } = props;
  const dispatch = useAppDispatch();
  const [selected, setSelected] = React.useState(liked);

  function handleToggleChange(id: string) {
    setSelected(!selected);

    dispatch(addLikeToItem({ id, liked: selected }));
  }

  const onDownload = () => {
    const link = document.createElement("a");
    link.download = file.name;
    link.href = file.URL;
    link.click();
  };

  return (
    <Grid className="TileItem" item id={id} xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflowX: 'auto', position: 'relative' }}>
        <CardMedia
          component="img"
          sx={{ maxHeight: '176px' }}
          image={image}
          alt="Random image"
        />
        <CardContent sx={{ flexGrow: 1, wordBreak: 'break-all' }}>
          <Typography gutterBottom variant="h5" component="h3">
            <b>Name</b>: <React.Fragment><br/></React.Fragment>{name}
          </Typography>
          <Typography>
            <b>Author</b>: {author}
          </Typography>
          <Typography>
            <b>Album / Category</b>: {album}
          </Typography>
          <Typography>
            <b>Genre</b>: {genre}
          </Typography>
          <Typography sx={{ mr: '10px' }}>
            <b>Release year</b>: {year}
          </Typography>
          <Typography sx={{ mr: '10px' }}>
            <b>Likes number</b>: {likesNumber}
          </Typography>
          {file.name && <Button onClick={onDownload} sx={{ marginTop: '20px' }} variant='contained' color="primary" startIcon={<DownloadIcon />}>Download</Button>}
        </CardContent>
        <CardActions sx={{  }}>
          <ToggleButton
            sx={{ position: 'absolute', bottom: '5px', right: '5px', color: '#cccccc' }}
            size="small"
            value="check"
            selected={selected}
            onChange={() => handleToggleChange(id)}
          >
            <FavoriteBorderIcon />
          </ToggleButton>
          <Button
            size="small"
            className="TileItem-control__edit"
            href="#0"
            onClick={handleEditClick}
          >
            Edit
          </Button>
          <Button
            size="small"
            className="TileItem-control__delete"
            href="#0"
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
