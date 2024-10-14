import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ImageSection from "../components/ImageSection";
import SearchBar from "../components/SearchBar";
interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <ImageSection>
        <div className="container mx-auto flex justify-center items-center">
          <SearchBar />
        </div>
        <div className="container mx-auto py-10 flex-1 justify-center items-center">{children}</div>
      </ImageSection>
      <Footer />
    </div>
  );
};

export default Layout;
