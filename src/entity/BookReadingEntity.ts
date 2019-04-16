import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn} from "typeorm";
import { user } from "./UserEntity";
import { book } from "./BookEntity";

@Entity()
export class user_book_read {

    @PrimaryGeneratedColumn()
	id: number;

    @OneToOne(type => user, user => user.id)
    @JoinColumn({ name: 'id_user' })
    id_user: user;

    @OneToOne(type => book, id_book => id_book.id)
    @JoinColumn({ name: 'id_book' })
    id_book: book;
}