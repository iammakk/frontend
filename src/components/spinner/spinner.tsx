type SpinnerProps = {
  size?: number; // Allows you to customize the size of the spinner
  color?: string; // Allows you to customize the color of the spinner
};

const Spinner: React.FC<SpinnerProps> = ({ size = 40, color = "#000" }) => {
  const spinnerStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    border: `2px solid ${color}`,
    borderColor: `${color} ${color} transparent transparent`,
  };

  return <div className="spinner" style={spinnerStyle}></div>;
};

export default Spinner;
