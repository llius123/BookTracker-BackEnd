import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";

@Entity()
export class book {

    @PrimaryGeneratedColumn()
	id: number;

	@Column("varchar")
	title: string;

}