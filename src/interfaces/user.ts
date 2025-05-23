import { Optional } from 'sequelize';
import { DateTime } from 'luxon';

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt?: DateTime;
    updatedAt?: DateTime;
}

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'>;

export { UserAttributes, UserCreationAttributes };