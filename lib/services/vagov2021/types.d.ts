
type absenteeData = {
  ageRange: string;
  congressionalDistrict: number;
  gender: string;
  locality: string;
  reason: string;
  receiptType: string;
  count: number;
}

type absenteeKey = keyof absenteeData;

interface VoteData {
  parties: {
    [key: string]: number
  },
  total: number,
  precinctsTotal?: number,
  precinctsReported?: number,
  timestamp: number
}

export {
  absenteeData,
  absenteeKey,
  VoteData
}
