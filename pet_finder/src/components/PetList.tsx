import { useState } from "react";
import { Pet } from "../models/Pet";
import { useEffect } from "react";
import { getPets } from "../services/petService";

export function PetList() {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    getPets().then((pets) => setPets(pets));
  }, []);

  return(
    <div></div>
  )
}
