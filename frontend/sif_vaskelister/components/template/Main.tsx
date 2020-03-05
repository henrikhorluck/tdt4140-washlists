import React, {FC} from 'react'
import Head from 'next/head'
import Nav from './nav/nav'
import styles from "./main.module.css";


interface Props {
    children: React.ReactNode;
}

const Main: FC<Props> = ( {children} ) => {
    return( <div>
        <Head>
            <title>SIF Vaskelister - Hjem</title>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <Nav/>

        <div className={styles.test}>
            {children}
        </div>
    </div>
  );
};

export default Main;
