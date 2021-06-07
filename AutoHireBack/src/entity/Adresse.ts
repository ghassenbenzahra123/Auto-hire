

import { Entity, PrimaryGeneratedColumn, 
    ObjectID, ObjectIdColumn,Column, Unique,OneToMany, JoinTable, CreateDateColumn, UpdateDateColumn, Double } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import {User } from "./User";
import { Entreprise } from "./Entreprise";
@Entity("Adresse")
@Unique(["ville"])
export class Adresse {
        @ObjectIdColumn()
        id: ObjectID;
        @Column()
        @Length(4, 200)
       ville: string;
        @Column()
        @Length(4, 500) 
        rue: string;
        @Column({ type: "float", precision: 10, scale: 6 })
    longitude: number;

    @Column({ type: "float", precision: 10, scale: 6 })
    latitude: number;
        @OneToMany(() => Entreprise, (entreprise: Entreprise) =>
         entreprise.adresse)
        entreprise: Array<Entreprise>;
        
       
      
       
    }