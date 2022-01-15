import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ForceEnt } from "./force-entity";
import { TeamEnt } from "./team-entity";

@Entity("User")
export class UserEnt extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @OneToMany(() => ForceEnt, force => force.creator)
    madeForces: ForceEnt[];

    @OneToMany(() => TeamEnt, team => team.creator)
    madeTeams: TeamEnt[];
}