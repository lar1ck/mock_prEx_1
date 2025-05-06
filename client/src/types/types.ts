export default interface TradeProps {
  Trade_Id: number;
  Trade_Name: string;
}

export default interface ModuleProps {
  Module_Id: number;
  ModName: string;
  ModCredits: number;
}

export default interface TraineeProps {
  Trainees_Id: number;
  FirstNames: string;
  LastName: string;
  Gender: string;
  Trade_Id: number;
}

export default interface MarkProps {
  Mark_Id: number;
  Trainee_Id: number;
  Trade_Id: number;
  Module_Id: number;
  User_Id: number;
  Formative_Ass: number;
  Summative_Ass: number;
  Comprehensive_Ass: number;
  Total_Marks_100: number;
}

export default interface UserProps {
  Users_Id: number;
  UserName: string;
}
