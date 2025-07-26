import { Client } from 'pg';
import { dataframe } from '../../shared/src/index';

export class Database {
    private df: typeof dataframe;
    constructor(df: typeof dataframe, master: typeof Client){
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
/*
    async get_entries(client: typeof Client, query: query): promise<>{

    }*/
}
