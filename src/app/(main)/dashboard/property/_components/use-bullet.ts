import { useState } from "react";

export function useBullet() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItem = (itemValue: string) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemValue) ? prevSelected.filter((i) => i !== itemValue) : [...prevSelected, itemValue],
    );
  };

  return { selectedItems, toggleItem };
}
