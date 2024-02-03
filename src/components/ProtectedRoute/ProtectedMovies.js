import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";

export default function ProtectedProfile({ ...props }) {
  return (
    <>
      <Header />
      <Main {...props} />
      <Footer />
    </>
  );
}