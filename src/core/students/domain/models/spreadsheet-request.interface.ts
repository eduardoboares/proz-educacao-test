import { SPREADSHEET_STATUS } from "./spreadsheet-status.enum";

export interface ISpreadsheetRequest {
    name: string;
    status?: SPREADSHEET_STATUS;
}
