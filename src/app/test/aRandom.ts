import { User } from '../user';
import { ApiUser } from '../reqres.service';
const chance = require('chance').Chance();

class UserRandom {
    public user(): User {
        return {
            id: chance.natural(),
            name: chance.name(),
            avatar: chance.url(),
            date: chance.date()
        };
    }

    public apiUser(): ApiUser {
        return {
            id: chance.natural(),
            email: chance.email(),
            first_name: chance.first(),
            last_name: chance.last(),
            avatar: chance.url()
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
