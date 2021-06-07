

import { Entity, PrimaryGeneratedColumn, 
    ObjectID, ObjectIdColumn,Column, Unique,ManyToOne, JoinTable, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { User } from "./User";

@Entity("Formation")

export class Formation {
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
        ecole : string; 
    
     
        @ManyToOne(() => User, user => user.education)
        @JoinColumn({name:'user_id'})
        user : User;
       
       
      
       
    }