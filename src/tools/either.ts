import { fold, type Either } from "@dibimo/core-lib";

export const eitherToBoolean = <L, R>(aEither: Either<L, R>) =>
  fold(aEither, () => false, () => true)
