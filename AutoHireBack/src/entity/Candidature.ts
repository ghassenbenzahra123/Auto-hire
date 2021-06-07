

import { Entity, PrimaryGeneratedColumn,
    ObjectID, ObjectIdColumn,Column, Unique,OneToMany, JoinTable, CreateDateColumn, UpdateDateColumn, Double, JoinColumn, ManyToOne } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import {User } from "./User";
import { Entreprise } from "./Entreprise";
import { Test } from "./Test";
@Entity("Candidature")
@Unique(["ref"])
export class Candidature {
        @ObjectIdColumn()
        id: ObjectID;
        @Column()
        @Length(4, 200)
        ref: string;
        @Column()
        @Length(4, 500)
        date: string;
        @Column({ type: "float", precision: 10, scale: 6 })
        etat: number;

        @Column()
        user : User;
        @Column()
        test : Test;



    }