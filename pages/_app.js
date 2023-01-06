import Layout from '../components/Layout/Layout';
import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <main>
        <Component {...pageProps} />
      </main>
    </Layout>
  );
};

export default MyApp;
