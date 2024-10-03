// Todo.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column()
    completed!: boolean;

    @Column('datetime')
    createdAt!: Date;

    constructor(title: string, description: string) {
        this.title = title;
        this.description = description;
        this.completed = false;
        this.createdAt = new Date();
    }
}