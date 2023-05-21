import { CrudRepository } from "../../repo/crud.repo";
import { Student } from "./student.model";
import { StudentFields } from "./student.field";

export class StudentRepository extends CrudRepository<Student> {

  apiName = "Student";

  shortFragment = this.parseFragment(`
    ${StudentFields}
  `);

  fullFragment = this.parseFragment(`
    ${StudentFields}
  `);

}

export const StudentService = new StudentRepository();