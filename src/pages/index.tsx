import Home from "./Home";

import IE from "./InvestigatorsEvaluated";

import CorrectionPlan from "@/pages/IndividualCorrection/CorrectionPlan";

import { AssessmentScore, Punishment, Reward } from "./Assessment";

import BusinessApproval from "./BusinessApproval/FunctionPane";
import CategoryManagement from "./Category";
import NoExit from "./NoExit";
import PlanRepository from "./PlanRepository";
import UnCorrection from "./TerminationCorrection";
import UnCorrected from "./UnCorrected/Handle";
import Worker from "./Woker";

import {
	Announcement,
	CorrectionTeam,
	NoCheckIn,
	WaitPeople,
} from "./RecvCorrection";

import {
	CheckIn,
	FunctionPane as DailyFunctionPane,
	DailyReport,
} from "./DailyManagement";

import {
	BanOrder,
	FunctionPane as BusFunctionPane,
} from "./BusinessApproval";

export {
	Reward,
	Punishment,
	Home,
	NoCheckIn,
	IE,
	WaitPeople,
	CorrectionTeam,
	CorrectionPlan,
	Worker,
	NoExit,
	CategoryManagement,
	DailyFunctionPane,
	BusinessApproval,
	UnCorrection as TerminationCorrection,
	UnCorrected,
	PlanRepository,
	Announcement,
	CheckIn,
	AssessmentScore,
	DailyReport,
	BanOrder,
	BusFunctionPane,
};
