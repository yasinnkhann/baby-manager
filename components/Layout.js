import loadable from '@loadable/component';

const Header = loadable(() => import('./Header.js'));
const Footer = loadable(() => import('./Footer.js'));

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
