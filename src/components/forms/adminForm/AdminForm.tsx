import { useEffect, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Typography from '@mui/material/Typography';
import CustomAlert from '@/components/forms/customAlert/CustomAlert';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  addItem,
  addItemChanges,
} from '@/components/tile/tileSlice';
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
  useEffect(() => {
    reset(form);
  }, [form]);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormValues>();

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

  const submitForm: SubmitHandler<FormValues> = (data) => {
    if (form.editingMode.state) {
      const { index } = form.editingMode;

      dispatch(addItemChanges({ index, ...data }));
    } else {
      dispatch(addItem(data))
    }

    dispatch(completeOperation());
  };

  const errorMessages = {
    name: null,
    author: null,
    image: null,
    album: null,
    genre: null,
    year: null,
  };

  if (errors) {
    for (const fieldName in errors) {
      Object.defineProperty(errorMessages, fieldName, {
        value: (<CustomAlert name={fieldName} type={errors[fieldName as keyof typeof errors]?.type as string} />),
      });
    }
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ mb: '50px' }}
      onSubmit={handleSubmit(submitForm)}

      onReset={() => {
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
              {...register("name", { required: true, onChange: handleInputChange })}
              id="name"
              value={form.name}
              placeholder="The Simpsons"
            />
            {errorMessages.name}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl required>
            <InputLabel htmlFor="author">Author</InputLabel>
            <Input
              {...register("author", { required: true, onChange: handleInputChange })}
              id="author"
              value={form.author}
              placeholder="Matt Groening"
            />
            {errorMessages.author}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl required>
            <InputLabel htmlFor="image">Image</InputLabel>
            <Input
              {...register("image", { required: true, pattern: /https?:\/\/(www.)?[a-zA-Z]+(\.[a-zA-Z]+)+(\/(\w|[-_%.#?=&+])+)+/, onChange: handleInputChange })}
              id="image"
              value={form.image}
              placeholder="https://picsum.photos/"
            />
            {errorMessages.image}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl required>
            <InputLabel htmlFor="album">Album / Category</InputLabel>
            <Input
              {...register("album", { required: true, onChange: handleInputChange })}
              id="album"
              value={form.album}
              placeholder="Health"
            />
            {errorMessages.album}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl required>
            <InputLabel htmlFor="genre">Genre</InputLabel>
            <Input
              {...register("genre", { required: true, onChange: handleInputChange })}
              id="genre"
              value={form.genre}
              placeholder="Science fiction"
            />
            {errorMessages.genre}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl required>
            <InputLabel htmlFor="year">Release year</InputLabel>
            <Input
              {...register("year", { required: true, pattern: /^19\d{2}$|^20[01][0-9]$|^202[0-3]$/, onChange: handleInputChange })}
              id="year"
              value={form.year}
              placeholder="2000"
            />
            {errorMessages.year}
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
      </Grid>
    </Box>
  );
}
