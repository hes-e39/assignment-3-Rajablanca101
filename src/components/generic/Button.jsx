const Button = ({ displayName, value, className, onClick }) => {
  return (
    <div>
      <button
        type="button"
        className={className}
        onClick={onClick}
        value={value}
      >
        {' '}
        {displayName}{' '}
      </button>
    </div>
  );
};


export default Button;
