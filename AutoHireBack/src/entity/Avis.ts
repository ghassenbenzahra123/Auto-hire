

import { Entity, PrimaryGeneratedColumn, 
    ObjectID, ObjectIdColumn,Column, Unique,
     JoinTable, CreateDateColumn, UpdateDateColumn, Double, OneToOne } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import {User } from "./User";
import { Entreprise } from "./Entreprise";
@Entity("Avis")
export class Avis {
        @ObjectIdColumn()
        id: ObjectID;
        @Column()
        @Length(4, 200)
       niveau: string;
        @Column()
        @Length(4, 500) 
        commentaire: string;
        @Column()
        @Length(4, 500) 
        entreprise: Entreprise;
        @Column()
        @Length(4, 500) 
       personne: User;
       
      
       
    }