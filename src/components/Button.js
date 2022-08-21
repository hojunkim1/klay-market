const Button = ({ text }) => {
  return (
    <button className="px-5 py-2 rounded-sm border-blue-500 border-2 hover:text-blue-100 hover:bg-blue-500">
      {text}
    </button>
  );
};

export default Button;
