import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import getCapitalizedWord from '@/utils/getCapitalizedWord';

export default function CustomAlert({
  type,
  children,
}: {
  type?: string;
  children?: string;
}) {
  let alertName = children;

  switch (type) {
    case 'required':
      alertName = 'Не заполнено!';
      break;
    case 'maxLength':
      alertName = 'Превышена длина значения!';
      break;
    case 'minLength':
      alertName = 'Недостаточная длина значения!';
      break;
    case 'max':
      alertName = 'Вне диапазона!';
      break;
    case 'min':
      alertName = 'Вне диапазона!';
      break;
    case 'pattern':
      alertName = 'Неверный формат!';
      break;
  }

  return (
    <Grid item xs={12}>
      <Alert role="alert" severity="warning" sx={{ display: 'flex' }}>
        {alertName}
      </Alert>
    </Grid>
  );
}
