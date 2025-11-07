import style from './LoadSpinner.module.css';

type LoadSpinnerProps = {
  width?: number;
  height?: number;
};

export function LoadSpinner(props: LoadSpinnerProps) {
  const { width = 32, height = 32 } = props;

  return (
    <div
      className={ style['spinner'] }
      style={{
        width: `${ width }px`,
        height: `${ height }px`
      }}
    ></div>
  );
};