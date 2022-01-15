import { BaseEntity, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { TeamEnt } from "./team-entity";

@Entity("War")
export class WarEnt extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    sWar() {
        console.log("Start war...")
    }

    @ManyToMany(() => TeamEnt)
    @JoinTable({
        name: "warResultt",
        joinColumn: {
            name: 'Teamid',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: "Warid",
            referencedColumnName: "id",
        },
    })
    inwar: TeamEnt[];

}