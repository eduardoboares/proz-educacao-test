import { ApplicationInjectionTokens } from '@application/constants/application-injection-tokens.constant';
import { CreateStudentsBySpreadsheetService } from '@application/students/create-students-by-spreadsheet.service';
import { DeleteStudentService } from '@application/students/delete-student.service';
import { GetStudentsSpreadsheetStatusService } from '@application/students/get-students-spreadsheet-status.service';
import { GetStudentsService } from '@application/students/get-students.service';
import { UpdateStudentService } from '@application/students/update-student.service';
import { ApiController } from '@configurations/decorators/controller.decorator';
import { Inject } from '@configurations/ioc';
import { Request, Response } from 'express';
import multer from 'multer';
import { ControllersInjectionTokens } from '../constants/controllers-injection-tokens.constant';
import { BaseController } from './base.controller';
const multerConfig = require('../libs/multer-config');

@ApiController(ControllersInjectionTokens.controllers.v1.studentsController)
export class StudentsController extends BaseController {
    constructor(
        @Inject(ApplicationInjectionTokens.students.getStudentsService)
        private readonly getStudentsService: GetStudentsService,
        @Inject(ApplicationInjectionTokens.students.getStudentsSpreadsheetStatusService)
        private readonly getStudentsSpreadsheetStatusService: GetStudentsSpreadsheetStatusService,
        @Inject(ApplicationInjectionTokens.students.createStudentsBySpreadsheetService)
        private readonly createStudentsBySpreadsheetService: CreateStudentsBySpreadsheetService,
        @Inject(ApplicationInjectionTokens.students.updateStudentService)
        private readonly updateStudentService: UpdateStudentService,
        @Inject(ApplicationInjectionTokens.students.deleteStudentService)
        private readonly deleteStudentService: DeleteStudentService
    ) {
        super();
    }

    public get controllerReadOrder(): number {
        return 0;
    }

    public get version(): string {
        return 'v1';
    }

    public get baseUrl(): string {
        return 'students';
    }

    private async getStudents(req: Request, res: Response): Promise<void> {
        try {
            let students = await this.getStudentsService.handle();

            res.status(200).send({ students });
        } catch(error) {
            throw error;
        }
    }

    private async getStudentsSpreadsheetStatus(req: Request, res: Response): Promise<void> {
        try {
            const spreadsheet = await this.getStudentsSpreadsheetStatusService.handle(req.params.id);

            res.status(200).send({ spreadsheet });
        } catch(error) {
            throw error;
        }
    }

    private async createStudentsBySpreadsheet(req: Request, res: Response): Promise<void> {
        try {
            const upload = multer(multerConfig).single('spreadsheet');

            upload(req, res, async function (this: any,error: any) {
                if (error) {
                    if (error === 'MulterError: File too large') {
                        return res.status(400).send({
                            statusCode: 400,
                            message: 'Planilha com tamanho máximo excedido, tente novamente.'
                        });
                    }

                    return res.status(400).send({
                        statusCode: 400,
                        message: 'Erro ao processar planilha, tente novamente.'
                    });
                }

                if (!req.file) {
                    return res.status(400).send({
                        statusCode: 400,
                        message: 'É obrigatório enviar a planilha, tente novamente.'
                    });
                }

                const spreadsheet = await this.createStudentsBySpreadsheetService.handle(req.file);

                return res.status(200).send({ spreadsheet });
            }.bind(this));
        } catch(error) {
            throw error;
        }
    }

    private async updateStudent(req: Request, res: Response): Promise<void> {
        try {
            const student = await this.updateStudentService.handle(
                req.params.id as unknown as string,
                req.body
            );

            res.status(200).send({ student });
        } catch(error) {
            throw error;
        }
    }

    private async deleteStudent(req: Request, res: Response): Promise<void> {
        try {
            await this.deleteStudentService.handle(req.params.id);

            res.status(200).send();
        } catch(error) {
            throw error;
        }
    }

    protected setGetsRoutes(): void {
        this.router.get('/', (req: Request, res: Response) => this.getStudents(req, res));
        this.router.get('/spreadsheets/:id', (req: Request, res: Response) => this.getStudentsSpreadsheetStatus(req, res));
    }

    protected setPostsRoutes(): void {
        this.router.post('/spreadsheet', (req: Request, res: Response) => this.createStudentsBySpreadsheet(req, res));
    }

    protected setPutsRoutes(): void {
        this.router.put('/:id', (req: Request, res: Response) => this.updateStudent(req, res));
    }

    protected setDeletesRoutes(): void {
        this.router.delete('/:id', (req: Request, res: Response) => this.deleteStudent(req, res));
    }
}
