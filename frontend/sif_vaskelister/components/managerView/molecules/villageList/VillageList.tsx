import React, { FC, useEffect } from "react";
import VillageItem from "../villageItem/VillageItem";

interface Props {
  context: any;
}

const VillageList: FC<Props>  = ({context}) => {
    useEffect(() => {
        context.getVillages();
        context.getDorms();
    });

    return (
        <div>
            {context.villages ? context.villages.map((village: any, i: number) => (
                context.user.user.manager_villages.includes(village.id) ?
                <VillageItem
                    key={i}
                    village={village}
                    dorms={context.dorms}
                    getDormManager={context.getDormManager}
                /> : null
            )) : null}
        </div>
    );
};

export default VillageList;