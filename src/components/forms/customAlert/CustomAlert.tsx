import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import getCapitalizedWord from "@/utils/getCapitalizedWord";

export default function CustomAlert({ name, type }: { name: string | undefined, type: string }) {
  let alertName = type;
  let capitalizedName = getCapitalizedWord(name);

  switch (type) {
    case 'required':
      alertName = `Required field "${capitalizedName}" is missing!`;
      break;
    case 'maxLength':
      alertName = `${capitalizedName} is too long!`;
      break;
    case 'minLength':
      alertName = `${capitalizedName} is too short!`;
      break;
    case 'max':
      alertName = `${capitalizedName} exceeds the maximum limit!`;
      break;
    case 'min':
      alertName = `${capitalizedName} below the minimum limit!`;
      break;
    case 'pattern':
      alertName = `${capitalizedName} format is incorrect!`;
      break;
    default:
      alertName = 'Unknown error!';
      break;
  }

  return (
    <Grid item xs={12}>
      <Alert role="alert" severity="warning">
        {alertName}
      </Alert>
    </Grid>
  );
}
