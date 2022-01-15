import { LessThan, Like } from "typeorm";
import { ForceEnt } from "../entity/force-entity";

export class ForceService {
    public async insert(data: ForceEnt) {
        const force = ForceEnt.create(data);
        await force.save();
        return force;
    }
    public async find(id: number) {
        const force = await ForceEnt.findOne(id);
        return force;
    }
    //chera related team ro asan mifresti ? related team ya creator tushun y meghdare number hast k inja clid kharejie
    public async findAll(id: number, filterName: string, count: number, page: number) {
        const force = await ForceEnt.find({
            skip: page * count,
            take: count,
            order: {
                id: 'ASC'
            },
            where: [{
                id: LessThan(id)
            }, {

                name: Like(`%${filterName}%`)
            }],
            relations: ['raletedTeam', 'creator'],
        })
        return force
    }
    public async Update(force: ForceEnt, name: string) {
        force.name = name;
        await force.save();
        return force;
    }
    public async delete(id: number) {
        return ForceEnt.delete(id);
    }
}