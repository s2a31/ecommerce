import fs from 'fs';
import crypto from 'crypto';

// Base Repository class that defines common operations for JSON file storage
class Repository {
    constructor(filename) {
        if (!filename) {
            throw new Error('Creating a repository requires a filename');
        }

        this.filename = filename;
        // If the file doesn't exist, create it with an empty array
        try {
            fs.accessSync(this.filename);
        } catch (err) {
            fs.writeFileSync(this.filename, '[]');
        }
    }

    // Creates a new record in the repository
    async create(attrs) {
        attrs.id = this.randomId();

        const records = await this.getAll();
        records.push(attrs);

        await this.writeAll(records);
        return attrs;
    }

    // Retrieves all records from the repository
    async getAll() {
        return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf8' }));
    }

    // Saves all records to the repository
    async writeAll(records) {
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 4));
    }

    // Generates a random ID for new records
    randomId() {
        return crypto.randomBytes(4).toString('hex');
    }

    // Retrieves a single record by its ID
    async getOne(id) {
        const records = await this.getAll();
        return records.find((record) => record.id === id);
    }

    // Deletes a record by its ID
    async delete(id) {
        const records = await this.getAll();
        const filteredRecords = records.filter((record) => record.id !== id);
        await this.writeAll(filteredRecords);
    }

    // Updates a record by its ID
    async update(id, attrs) {
        const records = await this.getAll();
        const record = records.find((record) => record.id === id);

        if (!record) {
            throw new Error(`Record with id ${id} not found`);
        }

        Object.assign(record, attrs);
        await this.writeAll(records);
    }

    // Finds one record by matching a set of attributes
    async getOneBy(filters) {
        const records = await this.getAll();

        for (let record of records) {
            let found = true;

            for (let key in filters) {
                if (record[key] !== filters[key]) {
                    found = false;
                }
            }

            if (found) {
                return record;
            }
        }
    }
};


export default Repository;
