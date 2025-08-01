import { Client } from 'pg';

export type dictionary<T> = {[column: string]: T};
export type dataframe = dictionary<dictionary<string>>;
export class Database {
    private df: dataframe
    constructor(df: dataframe, master: Client){
        this.df = df;
        let columns: string;
        let query_input: string;
        Object.entries(this.df).map(([name, fields]) => {
            columns = Object.entries(fields).map(
                ([name, type]) => `${name} ${type}`
            ).join(', ');
            query_input = `CREATE TABLE IF NOT EXISTS ${name} (${columns})`;
            master.query(query_input).catch(console.error);
        });
    }
}
