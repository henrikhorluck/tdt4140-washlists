import React, { FC, useEffect } from "react";
import VillageItem from "../villageItem/VillageItem";
import { State } from "../../../../context/AppState";
import { Village } from "../../../../types/village-types";

interface Props {
  context: State;
}

const VillageList: FC<Props> = ({ context: { dorms, getDorms, getResidents, getTemplate, getVillages, user, villages } }) => {
  useEffect(() => {
    getVillages && getVillages();
    getDorms && getDorms();
  }, []);

  return (
    <div>
      {villages
        ? villages.map((village: Village, i: number) =>
          user?.user?.manager_villages.includes(village.id) ? (
            <VillageItem
              key={i}
              village={village}
              dorms={dorms}
              getTemplate={getTemplate}
              getResidents={getResidents}
            />
          ) : null
        )
        : null}
    </div>
  );
};

export default VillageList;
