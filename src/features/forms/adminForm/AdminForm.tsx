import { useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import Alert from '@mui/material/Alert';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Typography from '@mui/material/Typography';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  addItem,
  addItemChanges,
} from '../../tile/tileSlice';
import {
  completeOperation,
  changeItemField,
} from './adminFormSlice';

export default function AdminForm() {
  type State = {
    adminForm: {
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
      editingMode: {
        state: boolean;
        index: string;
      };
    };
  };

  const form = useAppSelector((state: State) => state.adminForm);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useAppDispatch();

  function checkLinkIsInvalid(url: string) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    try {
      xhr.send();
    } catch {
      return false;
    }

    return xhr.responseText.startsWith('<!');
  }

  function handleInputChange({ target: { name, value } }: { target: { name: string; value: string }}) {
    dispatch(changeItemField({ name, value }));
  }

  function handleInputFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.item(0);

    if (file) {
      const name = 'file';
      const value = {
        name: file?.name,
        URL: URL.createObjectURL(file),
      }

      dispatch(changeItemField({ name, value }));
    }
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ mb: '50px' }}
      onSubmit={(event) => {
        event.preventDefault();
        const { name, author, image, album, genre, year, file } = form;

        const emptyField = Object.entries(form).find((item) => item[1] === '');

        if (emptyField) {
          const emptyFieldName = emptyField[0].charAt(0).toUpperCase() + emptyField[0].slice(1);
          setErrorMessage(`Field "${emptyFieldName}" is required and cannot be empty!`);

          return;
        }

        if (checkLinkIsInvalid(image)) {
          setErrorMessage('Please check the URL image field validity!');

          return;
        }

        if (!/^20[0-2][0-9]$/.test(year)) {
          setErrorMessage('Please check the "Year" field for correctness! It should be between 2000 and 2019 inclusive.');

          return;
        }

        if (form.editingMode.state) {
          const { index } = form.editingMode;

          dispatch(addItemChanges({ index, name, author, image, album, genre, year, file }));
        } else {
          dispatch(addItem({ name, author, image, album, genre, year, file }))
        }

        dispatch(completeOperation());
        setErrorMessage('');
      }}

      onReset={(event) => {
        event.preventDefault();

        dispatch(completeOperation());
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Typography
            component="h4"
            variant="h4"
            color="text.primary"
          >
            Admin form
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl required>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="The Simpsons"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl required>
            <InputLabel htmlFor="author">Author</InputLabel>
            <Input
              id="author"
              name="author"
              value={form.author}
              onChange={handleInputChange}
              placeholder="Matt Groening"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl required>
            <InputLabel htmlFor="image">Image</InputLabel>
            <Input
              id="image"
              name="image"
              value={form.image}
              onChange={handleInputChange}
              placeholder="https://picsum.photos/"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl required>
            <InputLabel htmlFor="album">Album / Category</InputLabel>
            <Input
              id="album"
              name="album"
              value={form.album}
              onChange={handleInputChange}
              placeholder="Health"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl required>
            <InputLabel htmlFor="genre">Genre</InputLabel>
            <Input
              id="genre"
              name="genre"
              value={form.genre}
              onChange={handleInputChange}
              placeholder="Science fiction"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl required>
            <InputLabel htmlFor="year">Release year</InputLabel>
            <Input
              id="year"
              name="year"
              value={form.year}
              onChange={handleInputChange}
              placeholder="2000"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button variant="contained" component="label" color="secondary" startIcon={<UploadFileIcon />}>
            File upload
            <input
              hidden
              type="file"
              name="file"
              onChange={handleInputFileChange}
            />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="outlined" color="success" startIcon={<SendIcon />}>Submit</Button>
          {
            form.editingMode.state
            && <Button sx={{ ml: '20px' }} type="reset" variant="outlined" color="error" startIcon={<ClearAllIcon />}>Reset</Button>
          }
        </Grid>
        <Grid item xs={12}>
          {
            errorMessage
              ? <Alert severity="warning"> {errorMessage} </Alert>
              : <Alert severity="info">* — required fields</Alert>
          }
        </Grid>
      </Grid>
    </Box>
  );
}
