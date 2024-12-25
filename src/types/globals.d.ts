import { StatusCodes as StatusCodesType } from "../utils/StatusCodes";

declare global {
  var StatusCodes: typeof StatusCodesType;
  interface Global {
    StatusCodes: typeof StatusCodesType;
  }
}

export {};