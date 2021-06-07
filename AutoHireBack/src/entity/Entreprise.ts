import {
  Entity,
  PrimaryGeneratedColumn,
  ObjectID,
  ObjectIdColumn,
  Column,
  Unique,
  OneToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { User } from "./User";

import { Adresse } from "./Adresse";
@Entity("Entreprise")
@Unique(["nom"])
export class Entreprise {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  @Length(4, 200)
  nom: string;
  @Column()
  @Length(4, 500)
  industry: string;
  @Column()
  @Length(4, 255)
  about: string;

  @Column()
  @Length(4, 255)
  adresse: string;

  @Column()
  @Length(4, 255)
  website: string;
  @Column()
  @Length(4, 255)
  size: string;
  @Column()
  @Length(4, 255)
  type: string;
  @Column()
  @Length(4, 255)
  founded: string;
  @Column()
  @Length(4, 255)
  logo: string;
  @Column()
  @Length(4, 255)
  specialities: string;
  employees: Array<User>;
}
