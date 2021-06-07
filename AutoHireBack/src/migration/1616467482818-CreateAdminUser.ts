import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User } from "../entity/User";


export class CreateAdminUser1616467482818 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let user = new User();
        user.username = "admin";
        user.password = "admin";
        user.hashPassword();
        user.role = "ADMIN";
        user.address = "test";
        user.picture = "picture";
        user.email = "email";
        user.phoneNumber = 23298765;
        user.birthDate = "birthDate";
        user.resume = "NORESUME";
        user.experience = "NORESUME"
        user.skills = "NORESUME";
        user.education = "NORESUME";
        user.offres = [];
        const userRepository = getRepository(User);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> { }
}
