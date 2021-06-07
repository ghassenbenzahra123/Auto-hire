

import { Entity, PrimaryGeneratedColumn, 
    ObjectID, ObjectIdColumn,Column, Unique,ManyToOne, JoinTable, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import {User } from "./User";
import { Entreprise } from "./Entreprise";
@Entity("Experience")

export class Experience {
        @ObjectIdColumn()
        id: ObjectID;
        @Column()
        @Length(4, 200)
        titre: string;
        @Column()
     
        dateDebut: string;;
        @Column() 
        dateFin : string;; 
        @Column() @Length(4, 255) 
        description : string; 
         
        @ManyToOne(() => User, user => user.experience)
        @JoinColumn({name:'user_id'})
        user : User;
       
       
        entreprise : Entreprise[];
        experience: () => number;
    
    
       
      
       
    }