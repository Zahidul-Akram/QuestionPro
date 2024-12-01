import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateEmployeesTable1616161616161 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'employee',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'position_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'position_name',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'parent_id',
                    type: 'int',
                    isNullable: true,
                },
            ],
        }));
        await queryRunner.createForeignKey('employee', new TableForeignKey({
            columnNames: ['parent_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'employee',
            onDelete: 'CASCADE',
        }));

        await queryRunner.query(`
            INSERT INTO employee (id, name, position_id, position_name, parent_id) VALUES
            (1, 'CTO', 1, 'Chief Technology Officer', NULL),
            (2, 'Name 2', 2, 'Senior software eng', 1),
            (3, 'Name 3', 3, 'Software eng', 2),
            (4, 'Name 4', 4, 'Junior software eng', 3),
            (5, 'Name 5', 2, 'Senior software eng', 1),
            (6, 'Name 6', 3, 'Software eng', 5);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('employee');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('parent_id') !== -1);
        await queryRunner.dropForeignKey('employee', foreignKey);
        await queryRunner.dropTable('employee');
    }
}