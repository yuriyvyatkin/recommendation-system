import { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  changeMenus,
  resetMenus
} from './FiltrationFormSlice';

export default function FiltrationForm() {
  type FiltrationForm = {
    name: string[];
    author: string[];
    genre: string[];
    liked: boolean;
  };

  type ListItem = {
    name: string;
    author: string;
    genre: string;
  };

  type State = {
    filtrationForm: FiltrationForm;
    list: Array<ListItem>;
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const form: FiltrationForm = useAppSelector((state: State) => state.filtrationForm);
  const dispatch = useAppDispatch();
  const [menus, setMenus] = useState(form);
  const items: Array<ListItem> = useAppSelector((state: State) => state.list);
  let names: string[] = [];
  const authors: string[] = [];
  const genres: string[] = [];
  items.forEach(({ name, author, genre }) => {
    names.push(name);
    authors.push(author);
    genres.push(genre);
  });

  function handleSelectChange(event: SelectChangeEvent<string[]>) {
    const {
      target: { name, value },
    } = event;

    setMenus((prevForm: FiltrationForm) => ({ ...prevForm, [name]: typeof value === 'string' ? value.split(',') : value }));
  }

  function handleToggleChange() {
    const name = 'liked';

    setMenus((prevForm: FiltrationForm) => ({ ...prevForm, [name]: typeof prevForm[name] === 'boolean' ? !prevForm[name] : !prevForm[name] }));
  }

  return (
    <Box
      component="form"
      sx={{ mb: '50px' }}
      onSubmit={(event) => {
        event.preventDefault();

        dispatch(changeMenus(menus));
      }}

      onReset={(event) => {
        event.preventDefault();

        setMenus({
          name: [],
          author: [],
          genre: [],
          liked: false,
        });

        dispatch(resetMenus());
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Typography
            component="h4"
            variant="h4"
            color="text.primary"
          >
            Filtration form
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="name">Name</InputLabel>
            <Select
              labelId="name"
              id="name"
              name="name"
              multiple
              value={menus.name}
              onChange={handleSelectChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {names.map((name, index) => (
                <MenuItem key={index} value={name}>
                  <Checkbox checked={menus.name.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="author">Author</InputLabel>
            <Select
              labelId="author"
              id="author"
              name="author"
              multiple
              value={menus.author}
              onChange={handleSelectChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {authors.map((author, index) => (
                <MenuItem key={index} value={author}>
                  <Checkbox checked={menus.author.indexOf(author) > -1} />
                  <ListItemText primary={author} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="genre">Genre</InputLabel>
            <Select
              labelId="genre"
              id="genre"
              name="genre"
              multiple
              value={menus.genre}
              onChange={handleSelectChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {genres.map((genre, index) => (
                <MenuItem key={index} value={genre}>
                  <Checkbox checked={menus.genre.indexOf(genre) > -1} />
                  <ListItemText primary={genre} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <ToggleButton
            sx={{ color: '#cccccc' }}
            size="small"
            value="check"
            name='liked'
            selected={menus.liked}
            onChange={handleToggleChange}
          >
            <FavoriteBorderIcon sx={{ mr: '10px' }} />
            Liked
          </ToggleButton>

        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="outlined" color="success" startIcon={<CheckIcon />}>Apply</Button>
          <Button sx={{ ml: '20px' }} type="reset" variant="outlined" color="error" startIcon={<ClearAllIcon />}>Reset</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
