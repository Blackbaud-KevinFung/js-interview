import { User } from '../user';
const chance = require('chance').Chance();

class UserRandom {
    public user(): User {
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
        return chance.first() + ' ' + chance.last()
    }
}

export const aRandom: UserRandom = new UserRandom();
