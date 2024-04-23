import fs from 'fs';
import crypto from 'crypto';
import util from 'util';
import Repository from './repository.js';

// Convert the scrypt method to return Promises
const scrypt = util.promisify(crypto.scrypt);

// Repository for user data, including password hashing and comparison logic
class UsersRepository extends Repository {
    // Creates a new user record with a hashed and salted password
    async create(attrs) {
        attrs.id = this.randomId();

        const salt = crypto.randomBytes(8).toString('hex');
        const buf = await scrypt(attrs.password, salt, 64);

        const records = await this.getAll();
        const record = {
            ...attrs,
            password: `${buf.toString('hex')}.${salt}`,
        };
        records.push(record);

        await this.writeAll(records);

        return record;
    }

    // Compares a supplied password with a saved hashed password
    async comparePasswords(saved, supplied) {
        const [hashed, salt] = saved.split('.');
        const hashedSuppliedBuf = await scrypt(supplied, salt, 64);

        return hashed === hashedSuppliedBuf.toString('hex');
    }
}

// Exporting an instance of UsersRepository for the 'users.json' file
export default new UsersRepository('users.json');