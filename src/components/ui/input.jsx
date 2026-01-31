export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${className}`}
      {...props}
    />
  );
}
