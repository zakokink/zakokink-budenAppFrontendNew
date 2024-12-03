export class Uebung {
  id : number | null = null;
  uebung : string | null = null;
  comment : string  | null = null;
  minWiederholungen : number | null = null;
  maxWiederholungen : number | null = null;
}

export class User {
  id : number | null = null;
  name : string | null = null;
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

export class Placeholder {
  uebungId: number | null = null;
  akutellsteLeistung : AkutellsteLeistung | null = null;
}
export class TrainingResponse {
  status : string | null = null;
  data : Training[] = [];
}

export class Training {
  id : number | null = null;
  user : User | null = null;
  uebung : Uebung | null = null;
  idTrainingeinheit : number | null = null;
  date : String | null = null;
  gewicht : string | null = null;
  wiederholungen : string | null = null;
  comment : string | null = null;
}


export class TrainingSaveObject {
  id : number | null = null;
  user : number | null = null;
  uebung : number | null = null;
  date : String | null = null;
  gewicht : string | null = null;
  wiederholungen : string | null = null;
  comment : string | null = null;
}





export class TrainingAlt {
  id : number | null = null;
  user : User | null = null;
  uebung : Uebung | null = null;
  idTrainingeinheit : number | null = null;
  date : Date | null = null;
  gewicht : string | null = null;
  wiederholungen : string | null = null;
  comment : string | null = null;
}

export class TrainingEinheit {
  id : number | null = null;
  date : String | null = null;
  trainings : Training[] = [];
}
