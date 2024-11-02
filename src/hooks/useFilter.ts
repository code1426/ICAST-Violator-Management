import React, { SetStateAction, useEffect, useState } from "react";
import { Violation, Violator } from "../types/violator";

export const useFilter = (
  itemArray: SetStateAction<Violation[] | Violator[] | undefined>,
  searchValue: string,
  isPaid: boolean
) => {
  
  const [filteredItems, setFilteredItems] = useState<
    Violation[] | Violator[]
  >();

  useEffect(() => {
    setFilteredItems(itemArray);
  });


};
