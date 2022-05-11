import '../styles/globals.css';
import loadable from '@loadable/component';

const Layout = loadable(() => import('../components/Layout'));

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
