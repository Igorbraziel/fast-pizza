import { Link } from "react-router-dom";

function Button({ disabled = false, to, type, onClick, children }) {
  const base = `inline-block text-sm
    rounded-full border border-solid border-stone-900 
    bg-yellow-400  uppercase text-stone-800 
    transition-colors duration-300 hover:bg-yellow-300 
    focus:bg-yellow-400 focus:outline-none focus:ring 
    focus:ring-yellow-400 focus:ring-offset-1 disabled:cursor-not-allowed`;

  const styles = {
    primary: base + " px-3 py-3 md:px-5 md:py-3",
    small: base + " px-2 text-xs py-1 md:px-3 md:py-2",
    secondary: `inline-block bg-stone-100 text-sm
    rounded-full border-2 border-stone-400 hover:border-stone-500
    uppercase text-stone-500 px-3 py-2.5 md:px-5 md:py-3
    transition-colors duration-300 hover:bg-stone-400 focus:text-stone-800
    focus:bg-stone-400 focus:outline-none focus:ring hover:text-stone-800
    focus:ring-stone-200 focus:ring-offset-1 disabled:cursor-not-allowed`,
    round: base + " px-2 py-1.5 md:px-3 py-2.5 text-sm",
  };

  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }

  return onClick ? (
    <button disabled={disabled} className={styles[type]} onClick={onClick}>
      {children}
    </button>
  ) : (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
