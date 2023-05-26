import { Entity } from '@shared/domain/entities/entity';
import { validCPF, validRG } from '@shared/utils/fields-validations/document-validation';
import { validEmail } from '@shared/utils/fields-validations/emai-validation';
import { CIVIL_STATUS_OUTPUT } from '../models/student-civil-status-output.enum';
import { GENDER_TYPES_OUTPUT } from '../models/student-gender-types-output.enum';
import { CIVIL_STATUS } from '../models/students-civil-status.enum';
import { GENDER_TYPES } from '../models/students-gender-types.enum';

export interface IStudentProps {
    name: string;
    email: string;
    civil_status: CIVIL_STATUS;
    cpf: string;
    rg: string;
    birth_date: Date;
    gender: GENDER_TYPES;
    created_at?: Date;
    updated_at?: Date;
};

export class Student extends Entity<IStudentProps> {
    get student() {
        return {
            ...this.props,
            id: this.id
        }
    }

    private constructor(props: IStudentProps, id?: string) {
        super(props, id);
    }

    static getCivilStatusInput(civil_status: CIVIL_STATUS_OUTPUT): CIVIL_STATUS {
        return civil_status === CIVIL_STATUS_OUTPUT.SINGLE
        ? CIVIL_STATUS.SINGLE
        : CIVIL_STATUS.MARRIED;
    }

    static getCivilStatusOutput(civil_status: CIVIL_STATUS): CIVIL_STATUS_OUTPUT {
        return civil_status === CIVIL_STATUS.SINGLE
        ? CIVIL_STATUS_OUTPUT.SINGLE
        : CIVIL_STATUS_OUTPUT.MARRIED;
    }

    static getGenderInput(gender: GENDER_TYPES_OUTPUT): GENDER_TYPES {
        return gender === GENDER_TYPES_OUTPUT.MALE
        ? GENDER_TYPES.MALE
        : GENDER_TYPES.FEMALE;
    }

    static getGenderOutput(gender: GENDER_TYPES): GENDER_TYPES_OUTPUT {
        return gender === GENDER_TYPES.MALE
        ? GENDER_TYPES_OUTPUT.MALE
        : GENDER_TYPES_OUTPUT.FEMALE;
    }

    static create(props: IStudentProps, id?: string) {
        const { email, cpf, rg } = props;

        props.email = validEmail(email);
        props.cpf = validCPF(cpf);
        props.rg = validRG(rg);

        return new Student(props, id);
    }
}
