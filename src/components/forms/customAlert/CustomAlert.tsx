import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import getCapitalizedWord from "@/utils/getCapitalizedWord";

export default function CustomAlert({ fieldName, type, children }: { fieldName?: string, type?: string, children?: string }) {
  let alertName = children;
  let capFieldName = getCapitalizedWord(fieldName);

  switch (type) {
    case 'required':
      alertName = `Required field "${capFieldName}" is missing!`;
      break;
    case 'maxLength':
      alertName = `${capFieldName} is too long!`;
      break;
    case 'minLength':
      alertName = `${capFieldName} is too short!`;
      break;
    case 'max':
      alertName = `${capFieldName} exceeds the maximum limit!`;
      break;
    case 'min':
      alertName = `${capFieldName} below the minimum limit!`;
      break;
    case 'pattern':
      alertName = `${capFieldName} format is incorrect!`;
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
