import { BaseModel } from "../../models/base-model.model";

export enum CampaignStatus {
  DRAFT = "DRAFT", // mới tạo, chưa publish
  OPENED = "OPENED", //đã publish, đang chờ tới thời điểm startDate
  PENDING = "PENDING", //đang diễn ra có thể mua token
  DONE = "DONE", //kết thúc chiến dịch
}

export const campaignStatusData = [
  {
    name: "Draft",
    value: CampaignStatus.DRAFT,
  },
  {
    name: "Pending",
    value: CampaignStatus.PENDING,
  },
  {
    name: "Opened",
    value: CampaignStatus.OPENED,
  },
  {
    name: "Done",
    value: CampaignStatus.DONE,
  },
];

export type CreateCampaignInput = {
  name?: string;
  startDate?: Date;
  endDate?: Date;
  ratioBNB?: number;
  maxTokenLimit?: number;
  minimumPurchaseTokenAmount?: number;
  maximumPurchaseTokenAmount?: number;
  totalTokenAmount?: number;
  is100PercentProgress?: boolean;
  priority?: number;
  status?: CampaignStatus;
};

export type UpdateCampaignInput = {
  name?: string;
  startDate?: Date;
  endDate?: Date;
  ratioBNB?: number;
  maxTokenLimit?: number;
  minimumPurchaseTokenAmount?: number;
  maximumPurchaseTokenAmount?: number;
  totalTokenAmount?: number;
  is100PercentProgress?: boolean;
  priority?: number;
  status?: CampaignStatus;
};

export enum CampaignArgNames {
  name = "name",
  startDate = "startDate",
  endDate = "endDate",
  ratioBNB = "ratioBNB",
  maxTokenLimit = "maxTokenLimit",
  minimumPurchaseTokenAmount = "minimumPurchaseTokenAmount",
  maximumPurchaseTokenAmount = "maximumPurchaseTokenAmount",
  totalTokenAmount = "totalTokenAmount",
  is100PercentProgress = "is100PercentProgress",
  priority = "priority",
  status = "status",
}

export enum CampaignArgs {
  name = "name",
  startDate = "startDate",
  endDate = "endDate",
  ratioBNB = "ratioBNB",
  maxTokenLimit = "maxTokenLimit",
  minimumPurchaseTokenAmount = "minimumPurchaseTokenAmount",
  maximumPurchaseTokenAmount = "maximumPurchaseTokenAmount",
  totalTokenAmount = "totalTokenAmount",
  is100PercentProgress = "is100PercentProgress",
  priority = "priority",
  status = "status",
}

export interface Campaign extends BaseModel {
  name?: string;
  startDate?: Date;
  endDate?: Date;
  ratioBNB?: number;
  maxTokenLimit?: number;
  minimumPurchaseTokenAmount?: number;
  maximumPurchaseTokenAmount?: number;
  totalTokenAmount?: number;
  is100PercentProgress?: boolean;
  priority?: number;
  status?: CampaignStatus;
}

export const CampaignInitialValues: CreateCampaignInput = {
  name: "",
  startDate: new Date(),
  endDate: new Date(),
  ratioBNB: 0,
  maxTokenLimit: 0,
  minimumPurchaseTokenAmount: 0,
  maximumPurchaseTokenAmount: 0,
  priority: 0,
};
