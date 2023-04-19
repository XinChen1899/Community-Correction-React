import Home from "./Home";
import IE from "./InvestigatorsEvaluated";

import CorrectionTeam from "@/pages/CorrectionTeam";
import CorrectionPlan from "@/pages/IndividualCorrection/CorrectionPlan";
import WaitPeople from "@/pages/WaitPeople";
import Announcement from "./Announcement";
import { AssessmentScore, Punishment, Reward } from "./Assessment";
import BusinessApproval from "./BusinessApproval/FunctionPane";
import CategoryManagement from "./Category";
import NoCheckIn from "./NoCheckIn";
import NoExit from "./NoExit";
import PlanRepository from "./PlanRepository";
import TerminationCorrection from "./TerminationCorrection";
import UnCorrected from "./UnCorrected/Handle";
import Worker from "./Woker";

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
	TerminationCorrection,
	UnCorrected,
	PlanRepository,
	Announcement,
	CheckIn,
	AssessmentScore,
	DailyReport,
	BanOrder,
	BusFunctionPane,
};
