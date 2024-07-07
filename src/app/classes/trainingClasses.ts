export class Uebung {
  idUebung : number | null = null;
  name : string | null = null;
  comment : string  | null = null;
  minWiederholungen : number | null = null;
  maxWiederholungen : number | null = null;
}

export class User {
  userId : number | null = null;
  username : string | null = null;
}

export class TrainingsSet {
  id : number | null = null;
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

export class AkutellsteLeistung {
  id: number | null = null;
  gewicht: string | null = null;
  wiederholungen: string | null = null;
}



