import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  changeRecommendationsField,
  resetRecommendations
} from './RecommendationsSlice';
import Box from '@mui/material/Box';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function Recommendations() {
  type State = {
    recommendations: {
      recommendation: string;
    };
  };

  const recommendations = useAppSelector((state: State) => state.recommendations);
  const dispatch = useAppDispatch();

  const [toggle, setToggle] = useState(false);

  const [recommendation, setRecommendation] = useState<string>(recommendations.recommendation);

  function handleSelectChange(event: SelectChangeEvent<typeof recommendation>) {
    setRecommendation(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{ mb: '50px' }}
      onSubmit={(event) => {
        event.preventDefault();

        dispatch(changeRecommendationsField({ recommendation }));
      }}

      onReset={(event) => {
        event.preventDefault();

        setRecommendation('');

        dispatch(resetRecommendations());
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Typography
            component="h4"
            variant="h4"
            color="text.primary"
          >
            Sorting form
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ minWidth: 300 }}>
            <InputLabel id="recommendations">Recommendations</InputLabel>
            <Select
              labelId="recommendations"
              id="recommendations"
              name="recommendations"
              open={toggle}
              onClose={() => setToggle(!toggle)}
              onOpen={() => setToggle(!toggle)}
              value={recommendation}
              label="Recommendations"
              onChange={handleSelectChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'popular'}>Popular</MenuItem>
              <MenuItem value={'new'}>New</MenuItem>
              <MenuItem value={'preferences'}>According to your preferences</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="outlined" color="success" startIcon={<CheckIcon />}>Apply</Button>
          <Button sx={{ ml: '20px' }} type="reset" variant="outlined" color="error" startIcon={<ClearAllIcon />}>Reset</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
