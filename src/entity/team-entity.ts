import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ForceEnt } from "./force-entity";
import { UserEnt } from "./user-entity";
import { WarEnt } from "./war-entity";

@Entity("Team")
export class TeamEnt extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => ForceEnt, Force => Force.raletedTeam)
    forces: ForceEnt[];

    @ManyToMany(() => WarEnt)
    @JoinTable({
        name: "warResult",
        joinColumn: {
            name: 'Teamid',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: "Warid",
            referencedColumnName: "id",
        },
    })
    entryWar!: WarEnt[];

    @ManyToOne(() => UserEnt, user => user.madeTeams,)
    @JoinTable({
        name: "userFK"
    })
    creator: UserEnt;
}