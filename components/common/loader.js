export default function LoaderRelative({
  show = true,
  size = 8,
  border = "border-gray-700",
}) {
  return (
    <div className=" flex items-center justify-center">
      <div
        className={`h-${size} w-${size} animate-spin rounded-full border-b-2 ${border}`}
      ></div>
    </div>
  );
}
