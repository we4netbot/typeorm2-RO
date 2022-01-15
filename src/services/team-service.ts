import { Like } from "typeorm";
import { ForceEnt } from "../entity/force-entity";
import { TeamEnt } from "../entity/team-entity";

export class TeamService {
    public async insert(data: TeamEnt) {
        const team = TeamEnt.create(data)
        await team.save();
        return team
    }
    public async find(id: number) {
        const team = await TeamEnt.findOne(id, { relations: ["forces"] });
        return team;
    }
    public async addForce(team: TeamEnt, force: ForceEnt) {
        if (team.forces != undefined) {
            team.forces.push(force);
        } else {
            team.forces = [force];
        }
        await team.save();
        return team;
    }
    public async findAll(filterName: string, page: number, count: number) {
        const team = await TeamEnt.find({
            skip: count * page,
            take: count,
            order: {
                id: 'ASC'
            },
            where: {
                name: Like(`%${filterName}%`),
            },
            // relations: ["forces", "entryWar", "creator"]
            join: {
                alias: "team",
                innerJoinAndSelect: {
                    force: "team.forces",
                }
            }
        })
        return team
    }
    public async delete(id: number) {
        return TeamEnt.delete(id);
    }
}