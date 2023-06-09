export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div
      id="nameError"
      role="alert"
      aria-live="assertive"
      className="border-2 rounded p-2 mt-1 self-center font-semibold bg-[#FF7F7F] text-sm"
    >
      {message}
    </div>
  )
}
