import { BaseEntity, User } from './../../shared';

export class Event implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public date?: any,
        public place?: string,
        public users?: User[],
        public organiser?: User,
    ) {
    }
}
