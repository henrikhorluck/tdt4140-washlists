import React, {FC, useState} from 'react'
import Head from 'next/head'
import Nav from './nav/nav'
import styles from "./main.module.css";
import AppState from '../../context/AppState'



interface Props {
    children: React.ReactNode;
}

const Main: FC<Props> = ( {children} ) => {
    return( 
    <AppState>
        <Head>
            <title>SIF Vaskelister - Hjem</title>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <Nav/>

        <div className={styles.test}>
            {children}
        </div>
    </AppState>
  );
};

export default Main;
