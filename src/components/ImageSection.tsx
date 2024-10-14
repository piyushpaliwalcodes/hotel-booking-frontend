type Props = {
  children: React.ReactNode;
};
const ImageSection = ({ children }: Props) => {
  return (
    <div className={`bg-[url("/667.jpg")] bg-cover bg-no-repeat`}>
      {children}
    </div>
  );
};

export default ImageSection;
