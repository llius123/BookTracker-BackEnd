import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class user {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("varchar")
	email: string;

	@Column("varchar")
	username: string;

	@Column({ type: "varchar", select: false })
	password: string;

	@Column({ type: "varchar", select: false })
	token: string;
}
