import type {
  WatchArgsType,
  ScriptOptsType,
  InitArgsType,
  TriggerPhaseKeys,
} from './types';

export abstract class Script<
  RTg,
  RSt,
  Bitename extends keyof RTg,
  PhK extends TriggerPhaseKeys<RTg, Bitename>,
  Inj = unknown,
> {
  updatable: Record<string, string>;

  abstract opts: ScriptOptsType<RTg, RSt, Bitename, Inj>;

  abstract watch(args: WatchArgsType<RTg, Bitename>): void;

  abstract init(args: InitArgsType<RTg, Bitename, PhK>): void;
}
