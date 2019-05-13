import { User } from '../user';
const chance = require('chance').Chance();

class UserRandom {
    public user(): User {
        return {
            id: chance.natural(),
            first_name: chance.first(),
            last_name: chance.last(),
            avatar: chance.url(),
            date: chance.date()
        };
    }

    public users(): User[] {
        return chance.n(this.user, 12);
    }

    public name(): string {
        return chance.first() + ' ' + chance.last();
    }

    public id(): number {
        return chance.natural();
    }

    public date(): Date {
        return chance.date();
    }
}

export const aRandom: UserRandom = new UserRandom();
