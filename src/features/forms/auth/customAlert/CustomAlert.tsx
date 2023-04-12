import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import getCapitalizedWord from "../../../helpers/getCapitalizedWord";

export default function CustomAlert({ name, type }: { name: string | undefined, type: string }) {
  let alertName = type;
  let capitalizedName = getCapitalizedWord(name);

  switch (type) {
    case 'required':
      alertName = `The field "${capitalizedName}" is required!`;
      break;
    case 'maxLength':
      alertName = `Exceeded the maximum length of the "${capitalizedName}" field!`;
      break;
    case 'minLength':
      alertName = `Not enough characters in the "${capitalizedName}" field!`;
      break;
    case 'max':
      alertName = `Exceeded the maximum number in the "${capitalizedName}" field!`;
      break;
    case 'min':
      alertName = `The number in the "${capitalizedName}" field is below the allowed value!`;
      break;
    case 'pattern':
      alertName = `Check the correctness of the value in the "${capitalizedName}" field!`;
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
