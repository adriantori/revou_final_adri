import { Divider } from '@mui/material';

const CustomDivider = ({ ...props }) => {
  const defaultValues = {
    height: 5,
    color: 'none',
    margin: '32px 550px',
    ...props,
  };

  return (
    <Divider
      sx={{
        height: defaultValues.height,
        backgroundColor: defaultValues.color,
        margin: defaultValues.margin,
      }}
      {...props}
    />
  );
};

export default CustomDivider;
