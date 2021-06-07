

import { Entity, PrimaryGeneratedColumn, 
    ObjectID, ObjectIdColumn,Column, Unique,OneToMany, JoinTable, CreateDateColumn, UpdateDateColumn, Double, JoinColumn, ManyToOne } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import {User } from "./User";
import { Entreprise } from "./Entreprise";
import { Candidature } from "./Candidature";
@Entity("Test")

export class Test {
        @ObjectIdColumn()
        id: ObjectID;
        @Column()
        @Length(4, 200)
        question: string;
        @Column()
        @Length(4, 500) 
        reponseA: string;
        @Column()
        @Length(4, 500) 
        reponseB: string;
        @Column()
        @Length(4, 500) 
        reponseC: string;
        @Column()
        @Length(4, 500) 
        reponseD: string;
        @Column()
        @Length(4, 500) 
        sujet: string;
        @OneToMany(() => Candidature, (candidature: Candidature) =>
        candidature.test)
       candidature: Array<Candidature>;
      
       
    }