import Grid from '@mui/material/Grid';
import TileItem from './tileItem/TileItem';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { removeItem } from './tileSlice';
import { editItem } from '@/components/forms/adminForm/adminFormSlice';
import Alert from '@mui/material/Alert';

export default function Tile() {
  type ListItem = {
    id: string;
    name: string;
    author: string;
    image: string;
    album: string;
    genre: string;
    year: string;
    file: {
      name: string;
      URL: string;
    },
    likesNumber: number;
  };

  type State = {
    list: Array<ListItem>;
    search: {
      query: string;
    };
    filtrationForm: {
      name: string[];
      author: string[];
      genre: string[];
      liked: boolean;
    };
    recommendations: {
      recommendation: string;
    };
  };

  const items: Array<ListItem> = useAppSelector((state: State) => state.list.slice());
  const search = useAppSelector((state: State) => state.search);
  const filtrationForm = useAppSelector((state: State) => state.filtrationForm);
  const { recommendation } = useAppSelector((state: State) => state.recommendations);
  const dispatch = useAppDispatch();

  function handleDeleteClick(id: string) {
    dispatch(removeItem({ id }));
  }

  function handleEditClick(id: string) {
    const index = items.findIndex((item) => item.id === id);
    const { name, author, image, album, genre, year, file } = items[index];

    dispatch(
      editItem({ name, author, image, album, genre, year, file, editingMode: { state: true, index } }),
    );
  }

  let list: Array<JSX.Element | null>;

  const isSearchQuery: boolean = !!search.query;
  const isFiltrationRules: boolean = Object.values(filtrationForm).some((item: string[] | boolean) => typeof item !== 'boolean' && item.length);

  if (isSearchQuery || isFiltrationRules) {
    list = items.map(({ id, name, author, image, album, genre, year, file, likesNumber }) => {

      if (isSearchQuery && !name.startsWith(search.query)) {
        return null;
      }

      if (
        isFiltrationRules &&
        !filtrationForm.name.includes(name) &&
        !filtrationForm.author.includes(author) &&
        !filtrationForm.genre.includes(genre)
      ) {
        return null;
      }

      if (filtrationForm.liked) {
        // userProfile.likedItems.includes(id)
      }

      let liked = false;

      return (
        <TileItem
          key={id}
          id={id}
          name={name}
          author={author}
          image={image}
          album={album}
          genre={genre}
          year={year}
          file={file}
          likesNumber={likesNumber}
          liked={liked}
          onDeleteClick={() => handleDeleteClick(id)}
          onEditClick={() => handleEditClick(id)}
        />
      );
    });

    if (!list?.filter(Boolean).length) {
      list = (
        [<Grid item>
          <Alert severity="success">Nothing was found for your query</Alert>
        </Grid>]
      );
    }
  } else {
    list = items.map(({ id, name, author, image, album, genre, year, file, likesNumber }) => {
      let liked = false;

      return (
        <TileItem
          key={id}
          id={id}
          name={name}
          author={author}
          image={image}
          album={album}
          genre={genre}
          year={year}
          file={file}
          likesNumber={likesNumber}
          liked={liked}
          onDeleteClick={() => handleDeleteClick(id)}
          onEditClick={() => handleEditClick(id)}
        />
      );
    });
  }

  if (recommendation === 'new') {
    list.sort((a: JSX.Element | null, b: JSX.Element | null): number => {
      return +b?.props.year - +a?.props.year;
    });
  } else if (recommendation === 'popular') {
    list.sort((a: JSX.Element | null, b: JSX.Element | null): number => {
      return +b?.props.likesNumber - +a?.props.likesNumber;
    });
  }

  return (
    <Grid className="Tile" container spacing={4}>{list}</Grid>
  );
}
