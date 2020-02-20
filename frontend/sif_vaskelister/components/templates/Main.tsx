import React, {useState} from 'react'
import Head from 'next/head'
import Nav from '../atoms/nav/nav'
import styles from "./main.module.css";



const Main = ( props: any ) => {
    return( <div>
        <Head>
            <title>SIF Vaskelister - Hjem</title>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <Nav/>

        <div className={styles.test}>
            {props.children}
        </div>
    </div>
  );
};

export default Main;
