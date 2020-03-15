import React, { FC } from "react";
import ResidentsList from '../../molecules/residentsList/ResidentsList'

import styles from "./ResidentsPage.module.css";


interface Props {
  context: any;
}

const ResidentsPage: FC<Props> = ({ context }) => {
  return (
    <>
      <ResidentsList context={context} />
    </>
  );
};

export default ResidentsPage;
