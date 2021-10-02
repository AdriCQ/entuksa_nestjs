import { AppPermission } from './casl.factory';

interface IPolicyHandler {
  handle(ability: AppPermission): boolean;
}

type PolicyHandlerCallback = (ability: AppPermission) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
