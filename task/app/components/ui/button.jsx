export function Button({ children, className, ...props }) {
    return (
      <button
        className={`px-4 py-2 rounded-md hover:bg-blue-700 transition-all ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  