

import { Entity, PrimaryGeneratedColumn,
    ObjectID, ObjectIdColumn,Column, Unique,ManyToOne, JoinTable, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { Entreprise } from "./Entreprise";
import { User } from "./User";

@Entity("Position")

export class Position {
        @ObjectIdColumn()
        id: ObjectID;
        @Column()
        @Length(4, 200)
        poste: string;
        @Column()

        entreprise: Entreprise;
        @Column()
        dateDebut : string;
        @Column()
        user : User;





    }