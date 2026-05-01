export default function PhotoBreak() {
  return (
    <div className="w-full overflow-hidden aspect-[375/565] md:aspect-[1440/900]">
      <img
        src="/photographer.jpg"
        alt=""
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
}
