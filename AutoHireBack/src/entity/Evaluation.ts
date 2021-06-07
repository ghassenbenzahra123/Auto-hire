import { Entity, PrimaryGeneratedColumn, 
    ObjectID, ObjectIdColumn,Column, Unique,
     JoinTable, CreateDateColumn, UpdateDateColumn, Double, OneToOne } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import {User } from "./User";
import { Entreprise } from "./Entreprise";

@Entity("Evaluation")
export class Evaluation {
        @ObjectIdColumn()
        id: ObjectID;
        @Column()
        @Length(4, 200)
       integrity: string;
       @Column()
       @Length(4, 200)
      planification: string;
      @Column()
      @Length(4, 200)
     ponctuality: string;
     @Column()
     @Length(4, 200)
    innovation: string;
    @Column()
    @Length(4, 200)
   motivation: string;
   @Column()
    @Length(4, 200)
   amelioration: string;
   
        @Column()
        @Length(4, 500) 
        commentaire: string;
        @Column()
        @Length(4, 200)
       employee: User;
       @OneToOne(() => User)
       evaluator: User;
       @Column() @CreateDateColumn() 
       evaluatedAt: Date;
       @Column()
       @Length(4, 200)
       entreprise: Entreprise;
       
    }