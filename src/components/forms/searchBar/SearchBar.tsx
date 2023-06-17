import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { changeSearchField } from './searchBarSlice';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';

export default function SearchBar() {
  type State = {
    search: {
      query: string;
    };
  };

  const search = useAppSelector((state: State) => state.search);
  const dispatch = useAppDispatch();

  function handleSearchChange({ target }: { target: { name: string; value: string } }) {
    const { name, value } = target;

    dispatch(changeSearchField({ name, value }));
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
    >
      <FormControl sx={{ minWidth: '100%', mb: '50px' }}>
        <InputLabel htmlFor="query">Live search</InputLabel>
        <Input
          type="text"
          id="query"
          name="query"
          value={search.query}
          onChange={handleSearchChange}
          placeholder="Start entering the name of the item"
        />
      </FormControl>
    </Box>
  );
}
