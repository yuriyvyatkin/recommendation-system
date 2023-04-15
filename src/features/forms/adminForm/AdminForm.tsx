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
import { useForm, SubmitHandler } from 'react-hook-form';
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
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();

  type FormValues = {
    name: string;
    author: string;
    image: string;
    album: string;
    genre: string;
    year: string;
    file: {
      name: string;
      URL: string;
    }
  }

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

  // function handleInputChange({ target: { name, value } }: { target: { name: string; value: string }}) {
  //   dispatch(changeItemField({ name, value }));
  // }

  function handleInputFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.item(0);

    if (file) {
      const name = 'file';
      const value = {
        name: file?.name,
        URL: URL.createObjectURL(file),
      }

      return { name, value };

      // dispatch(changeItemField({ name, value }));
    }
  }

  const submitForm: SubmitHandler<FormValues> = (data) => {
    console.log(data);

    // reset();
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ mb: '50px' }}
      onSubmit={handleSubmit(submitForm)}
      // onSubmit={(event) => {
      //   event.preventDefault();
      //   const { name, author, image, album, genre, year, file } = form;

      //   const emptyField = Object.entries(form).find((item) => item[1] === '');

      //   if (emptyField) {
      //     const emptyFieldName = emptyField[0].charAt(0).toUpperCase() + emptyField[0].slice(1);
      //     setErrorMessage(`Field "${emptyFieldName}" is required and cannot be empty!`);

      //     return;
      //   }

      //   if (checkLinkIsInvalid(image)) {
      //     setErrorMessage('Please check the URL image field validity!');

      //     return;
      //   }

      //   if (!/^20[0-2][0-9]$/.test(year)) {
      //     setErrorMessage('Please check the "Year" field for correctness! It should be between 2000 and 2019 inclusive.');

      //     return;
      //   }

      //   if (form.editingMode.state) {
      //     const { index } = form.editingMode;

      //     dispatch(addItemChanges({ index, name, author, image, album, genre, year, file }));
      //   } else {
      //     dispatch(addItem({ name, author, image, album, genre, year, file }))
      //   }

      //   dispatch(completeOperation());
      // }}

      onReset={(event) => {
        reset();

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
              {...register("name", { required: true })}
              id="name"
              value={form.name}
              placeholder="The Simpsons"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl required>
            <InputLabel htmlFor="author">Author</InputLabel>
            <Input
              {...register("author", { required: true })}
              id="author"
              value={form.author}
              placeholder="Matt Groening"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl required>
            <InputLabel htmlFor="image">Image</InputLabel>
            <Input
              {...register("image", { required: true, pattern: /^(https?:\/\/)?[0-9a-z-_]*(\.[0-9a-z-_]+)*(\.[a-z]+)+(\/[0-9a-z-_]*)*?\/?$/i })}
              id="image"
              value={form.image}
              placeholder="https://picsum.photos/"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl required>
            <InputLabel htmlFor="album">Album / Category</InputLabel>
            <Input
              {...register("album", { required: true })}
              id="album"
              value={form.album}
              placeholder="Health"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl required>
            <InputLabel htmlFor="genre">Genre</InputLabel>
            <Input
              {...register("genre", { required: true })}
              id="genre"
              value={form.genre}
              placeholder="Science fiction"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl required>
            <InputLabel htmlFor="year">Release year</InputLabel>
            <Input
              {...register("year", { required: true, pattern: /^19\d{2}$|^20[01][0-9]$|^202[0-3]$/ })}
              id="year"
              value={form.year}
              placeholder="2000"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button variant="contained" component="label" color="secondary" startIcon={<UploadFileIcon />}>
            File upload
            <input
              hidden
              {...register("file", { onChange: handleInputFileChange })}
              type="file"
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
