import { BaseModel } from "../../models/base-model.model";
import { User } from "../user/user.model";

export interface AgendaJob extends BaseModel {
    name?: string; // Tên job
    data?: any; // Dữ liệu kèm theo
    type?: string; // Loại job
    priority?: number; // Độ ưu tiên
    nextRunAt?: Date; // Lần chạy tiếp theo
    lastModifiedBy?: string; // Người câp nhật
    lockedAt?: Date; // Ngày khoá
    lastRunAt?: Date; // Ngày chạy lần cuối
    lastFinishedAt?: Date; // Kết thúc gần nhất
    disabled?: boolean; // Tắt job

    failCount?: number
    failReason?: string
    failedAt?: Date

    lastModifiedByUser?: User
}

export type UpdateAgendaJobInput = {
    priority?: number; // Độ ưu tiên
    disabled?: boolean; // Tắt job
}