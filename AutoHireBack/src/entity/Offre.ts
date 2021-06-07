
import { ObjectID as ObjectIDType} from 'typeorm'

import {
    Entity, PrimaryGeneratedColumn,
    ObjectID, ObjectIdColumn, Column, Unique, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { User } from "./User";
@Entity("Offre")
@Unique(["titre"])
export class Offre {
    @ObjectIdColumn()
    _id: ObjectIDType;
    @Column()
    @Length(4, 200)
    titre: string;
    @Column()
    @Length(4, 500)
    description: string;
    @Column() @Length(4, 100)
    poste: string;
    @Column()
    @Length(0, 150)
    company: string;
    @Column() @Length(5, 150)
    address: string;
    @Column() @Length(1, 255)
    creator: string;
    @Column() @Length(2, 30)
    industry: string;
    @Column() @Length(4, 100)
    type: string;
    @Column() @IsNotEmpty()
    jobTime: string;
    @Column() @IsNotEmpty()
    salary: number;
    @Column() @CreateDateColumn()
    createdAt: Date;
    @Column() @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: "float", precision: 10, scale: 6 })
    longitude: number;

    @Column({ type: "float", precision: 10, scale: 6 })
    latitude: number;
    @Column()
    saves: ObjectIDType[];
    @Column()
    users: ObjectIDType[];



}