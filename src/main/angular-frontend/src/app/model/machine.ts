import { Work } from "./work";


export class Machine {
    id: number;
    manufacturer: string;
    type: string;
    description_of_failure: string;
    reparation_price: number;
    status: string;
    works: Work[];
}
