import { Like } from "typeorm";
import { TeamEnt } from "../entity/team-entity";
import { UserEnt } from "../entity/user-entity";

export class UserService {
    public async insert(data: UserEnt) {
        const user = UserEnt.create(data)
        await user.save();
        return user
    }
    public async find(id: number) {
        const user = await UserEnt.findOne(id);
        return user;
    }
    public async findAll(filterName: string, page: number, count: number) {
        const user = await UserEnt.find({
            skip: page * count,
            take: count,
            order: {
                id: 'ASC'
            },
            where: {
                last_name: Like(`%${filterName}`)
            },
            // relations: ["madeForces", "madeTeams"]
            join: {
                alias: "user",
                innerJoinAndSelect: {
                    force: "user.madeForces",
                    team: "user.madeTeams"
                }
            }
        })
        return user
    }
    public async addTeam(user: UserEnt, team: TeamEnt) {
        if (user.madeTeams != undefined) {
            user.madeTeams.push(team);
        } else {
            user.madeTeams = [team];
        }
        await user.save();
        return user;
    }
    public async delete(id: number) {
        return UserEnt.delete(id);
    }
}