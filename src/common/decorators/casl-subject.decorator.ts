import { SetMetadata } from "@nestjs/common";

export const CASL_SUBJECT = "casl_subject";
export const CaslSubject = (subject: any) => SetMetadata(CASL_SUBJECT, subject);

export const CASL_ACTION = "casl_action";
export const CaslAction = (action: string) => SetMetadata(CASL_ACTION, action);
