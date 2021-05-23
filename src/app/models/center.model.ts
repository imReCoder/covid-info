export interface Center {
    _id: string;
    name: string;
    address: string;
    blockName: string;
    districtName: string;
    feeType: FeeType;
    stateName: string;
    long: number;
    lat: number;
    openFrom: string;
    pincode: number;
    openTo: string;
    districtId: string;
    stateId: string;
  }
  export enum FeeType {
    FREE = 'Free',
    PAID = 'Paid',
    UNKNOWN = 'Unknown',
  }
  