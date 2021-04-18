import { Work } from "./work";


export class Machine {
    id: number;
    manufacturer: string;
    type: string;
    description_of_failure: string;
    reparation_price: number;
    status: string;
    reparation_limit: number;
    single_work_limit: number;
    arriving_date: string;
    works: Work[];
}
