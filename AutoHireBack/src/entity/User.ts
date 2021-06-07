import {
  Entity,
  PrimaryGeneratedColumn,
  ObjectID, ObjectIdColumn,

  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
import { Offre } from "./Offre";
import { ObjectID as ObjectIDType } from 'typeorm'

@Entity()
@Unique(["username"])
export class User {

  @ObjectIdColumn()
  _id: ObjectIDType;

  @Column()
  @Length(4, 20)
  username: string;

  @Column()
  @Length(4, 20)
  firstName: string;

  @Column()
  @Length(4, 20)
  lastName: string;

  @Column()
  @Length(4, 20)
  position: string;
  
  @Column()
  @Length(4, 20)
  entreprise: string;


  @Column()
  birthDate: string;

  @Column()
  phoneNumber: number;

  @Column()
  @Length(0, 40)
  email: string;


  @Column()
  @Length(0, 150)
  address: string;
 

  @Column()
  @Length(0, 255)
  picture: string;


  @Column()
  @Length(4, 100)
  password: string;

  @Column()
  @IsNotEmpty()
  role: string;

  @Column()
  @IsNotEmpty()
  resume: string;

  @Column()
  @IsNotEmpty()
  experience: string;

  @Column()
  @IsNotEmpty()
  skills: string;

  @Column()
  @IsNotEmpty()
  education: string;
  @Column()
  @Length(0, 255)
  token: string;


  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
  @Column()
  connections: ObjectIDType[];
  
  @Column()
  connectionsSent: ObjectIDType[];

  @Column()
  connectionsGet: ObjectIDType[];

  @Column()
  savedJobs: ObjectIDType[];

  @Column()
  offres: ObjectIDType[];

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}

