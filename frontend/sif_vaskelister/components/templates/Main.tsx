import React, {useState, FC} from 'react'
import Head from 'next/head'
import Nav from '../atoms/nav/nav'
import styles from "./main.module.css";


interface IProps {
    children: React.ReactNode;
}

const Main: FC<IProps> = ( {children} ) => {
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
