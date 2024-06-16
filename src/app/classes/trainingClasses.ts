export class Uebung {
  idUebung : number | null = null;
  name : string  | null = null;
  comment : string  | null = null;
  minWiederholungen : string  | null = null;
  maxWiederholungen : string  | null = null;
}

export class User {
  userId : number | null = null;
  username : string | null = null;
}

export class TrainingsSet {
  idTrainingeinheit : number | null = null;
  uebung : Uebung | null = null;
  gewicht : string | null = null;
  wiederholungen : string | null = null;
  comment : string | null = null;
}

export class TrainingsEinheit {
  idTrainingeinheit : number | null = null;
  datum : Date | null = null;
  user : User | null = null ;
  trainingsSets : TrainingsSet[] | null = null;
}