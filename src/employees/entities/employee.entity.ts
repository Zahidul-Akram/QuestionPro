import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('employee')
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    positionId: number;

    @Column()
    positionName: string;

    @ManyToOne(() => Employee, (employee) => employee.id, { nullable: true })
    parentId: Employee | null;
}
