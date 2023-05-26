import { SPREADSHEET_STATUS } from "./spreadsheet-status.enum";

export interface ISpreadsheetResponse {
    id: string;
    name: string;
    status: SPREADSHEET_STATUS;
    created_at: Date;
    updated_at: Date;
}
