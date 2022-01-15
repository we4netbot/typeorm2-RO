import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TeamEnt } from "./team-entity";
import { UserEnt } from "./user-entity";

@Entity("Force")
export class ForceEnt extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => TeamEnt, Team => Team.forces, { onDelete: 'SET NULL' })
    @JoinColumn({
        name: "TeamFK",
    })
    raletedTeam: TeamEnt;

    @ManyToOne(() => UserEnt, user => user.madeForces)
    @JoinColumn({
        name: "userFK"
    })
    creator: UserEnt;
}