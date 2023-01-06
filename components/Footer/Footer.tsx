import { FC } from 'react';
import styles from './Footer.module.scss';

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      Project Birdnest. Created at Nestjs. 2022
    </footer>
  );
};

export default Footer;
