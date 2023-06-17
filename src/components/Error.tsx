import { FC, ReactNode } from 'react';

interface ErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Error: FC<ErrorProps> = ({ children, ...props }) => {
  return (
    <div
      style={{ color: '#f23838', textAlign: 'center', margin: '0.5rem 0' }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Error;
