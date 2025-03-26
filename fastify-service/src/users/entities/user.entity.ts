import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string; // UUID, unique identifier for the user

  @Column()
  chat_id: string; // comes from telegram

  @Column()
  username: string; // comes from telegram

  @Column()
  fullname: string; // cmoes from telegram
}
